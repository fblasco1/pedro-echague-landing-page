#!/usr/bin/env bash
# Staging UAT (Opción B): Frappe local + túnel + Preview Vercel para testers.
#
# Requisitos (una vez):
#   - Docker Desktop encendido (WSL)
#   - cloudflared en ~/.local/bin
#   - vercel login (ya vinculado al proyecto landing)
#
# Uso (dejar esta terminal abierta mientras duren las pruebas):
#   cd pedro-echague-landing-page
#   ./scripts/uat/start-staging-uat.sh
#
# Stop:
#   ./scripts/uat/stop-staging-uat.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

export PATH="${HOME}/.local/bin:${HOME}/.nvm/versions/node/v24.16.0/bin:${PATH}"

FRAPPE_PORT="${FRAPPE_PORT:-8000}"
SITE_HOST="${FRAPPE_SITE_HOST:-dev.localhost}"
APP_BRANCH="${APP_BRANCH:-feat/portal-alta-grupo-familiar}"
FRAPPE_CTR="${FRAPPE_CTR:-devcontainer-frappe-1}"
PG_CTR="${PG_CTR:-devcontainer-postgresql-1}"
REDIS_CACHE_CTR="${REDIS_CACHE_CTR:-devcontainer-redis-cache-1}"
REDIS_QUEUE_CTR="${REDIS_QUEUE_CTR:-devcontainer-redis-queue-1}"
BENCH_DIR="${BENCH_DIR:-/workspace/development/frappe-bench}"
PREVIEW_ALIAS="${PREVIEW_ALIAS:-https://pedro-echague-landing-page-git-feat-w-b1bb74-fblasco1s-projects.vercel.app}"
LOG_DIR="${LOG_DIR:-${ROOT}/.uat}"
TUNNEL_LOG="${LOG_DIR}/cloudflared.log"
PID_FILE="${LOG_DIR}/cloudflared.pid"
SESSION_FILE="${LOG_DIR}/last-session.txt"

mkdir -p "$LOG_DIR"

need() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "ERROR: falta comando '$1'"
    exit 1
  }
}

ensure_cloudflared() {
  if command -v cloudflared >/dev/null 2>&1; then
    return
  fi
  echo "==> Instalando cloudflared en ~/.local/bin"
  mkdir -p "${HOME}/.local/bin"
  curl -fsSL -o "${HOME}/.local/bin/cloudflared" \
    "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64"
  chmod +x "${HOME}/.local/bin/cloudflared"
}

frappe_ping() {
  curl -sf -m 4 -H "Host: ${SITE_HOST}" \
    "http://127.0.0.1:${FRAPPE_PORT}/api/method/frappe.ping" | grep -q pong
}

frappe_catalogo_ok() {
  curl -sf -m 8 -H "Host: ${SITE_HOST}" \
    "http://127.0.0.1:${FRAPPE_PORT}/api/method/club_management.members.api.alta_grupo_publica.get_catalogo_alta" \
    | grep -q actividades
}

echo "==> 1/6 Docker + Frappe (${APP_BRANCH})"
need docker
need curl
ensure_cloudflared
need vercel

if ! docker info >/dev/null 2>&1; then
  echo "ERROR: Docker no responde. Encendé Docker Desktop e integración WSL."
  exit 1
fi

docker start "$PG_CTR" "$REDIS_CACHE_CTR" "$REDIS_QUEUE_CTR" "$FRAPPE_CTR" >/dev/null

echo "    Esperando Postgres…"
for _ in $(seq 1 20); do
  st="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$PG_CTR" 2>/dev/null || echo missing)"
  if [[ "$st" == "healthy" || "$st" == "running" ]]; then
    break
  fi
  sleep 2
done

docker exec -u frappe "$FRAPPE_CTR" bash -lc "
  cd ${BENCH_DIR}/apps/club_management
  git checkout ${APP_BRANCH} >/dev/null
  echo -n ${SITE_HOST} > ${BENCH_DIR}/sites/currentsite.txt
"

if ! docker exec -u frappe "$FRAPPE_CTR" bash -lc 'pgrep -f "bench_helper.*serve" >/dev/null'; then
  docker exec -u frappe -d "$FRAPPE_CTR" bash -lc \
    "cd ${BENCH_DIR} && bench serve --port ${FRAPPE_PORT} >> logs/web.out 2>&1"
fi

echo "    Esperando bench :${FRAPPE_PORT}…"
ok=0
for _ in $(seq 1 20); do
  if frappe_ping; then ok=1; break; fi
  sleep 2
done
if [[ "$ok" != "1" ]]; then
  echo "ERROR: Frappe no responde en http://127.0.0.1:${FRAPPE_PORT}"
  echo "  docker logs $FRAPPE_CTR | tail"
  exit 1
fi
if ! frappe_catalogo_ok; then
  echo "ERROR: falta API portal. ¿Está $FRAPPE_CTR en ${APP_BRANCH}?"
  echo "  docker exec -u frappe $FRAPPE_CTR bash -lc 'cd ${BENCH_DIR} && bench --site ${SITE_HOST} migrate'"
  exit 1
fi
echo "    Frappe OK (pong + catálogo)"

echo "==> 2/6 Túnel cloudflared"
if [[ -f "$PID_FILE" ]] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  kill "$(cat "$PID_FILE")" 2>/dev/null || true
  sleep 1
fi
pkill -f "cloudflared tunnel --url" 2>/dev/null || true
: >"$TUNNEL_LOG"
nohup cloudflared tunnel --url "http://127.0.0.1:${FRAPPE_PORT}" >"$TUNNEL_LOG" 2>&1 &
echo $! >"$PID_FILE"

TUN=""
for _ in $(seq 1 30); do
  TUN="$(grep -oE 'https://[a-zA-Z0-9-]+\.trycloudflare\.com' "$TUNNEL_LOG" | head -1 || true)"
  if [[ -n "$TUN" ]]; then
    break
  fi
  sleep 1
done
if [[ -z "$TUN" ]]; then
  echo "ERROR: no salió URL de cloudflared. Ver $TUNNEL_LOG"
  exit 1
fi
echo "    Túnel: $TUN"

if ! curl -sf -m 15 -H "X-Frappe-Site-Name: ${SITE_HOST}" "$TUN/api/method/frappe.ping" | grep -q pong; then
  echo "ERROR: el túnel no llega a Frappe ($TUN)"
  exit 1
fi

echo "==> 3/6 Vercel Preview env + SSO off"
vercel project protection disable --sso >/dev/null || true
vercel env rm FRAPPE_BASE_URL preview --yes >/dev/null 2>&1 || true
vercel env rm FRAPPE_SITE_HOST preview --yes >/dev/null 2>&1 || true
printf '%s' "$TUN" | vercel env add FRAPPE_BASE_URL preview >/dev/null
printf '%s' "$SITE_HOST" | vercel env add FRAPPE_SITE_HOST preview >/dev/null
echo "    FRAPPE_BASE_URL=$TUN"
echo "    FRAPPE_SITE_HOST=$SITE_HOST"

echo "==> 4/6 Redeploy Preview (espera ~1–2 min)"
DEPLOY_URL="$(vercel deploy --yes 2>/dev/null | tee "${LOG_DIR}/vercel-deploy.log" | grep -oE 'https://pedro-echague-landing-page-[a-z0-9-]+\.vercel\.app' | tail -1 || true)"
if [[ -z "$DEPLOY_URL" ]]; then
  # fallback: parse json-ish last lines
  DEPLOY_URL="$(grep -oE 'https://pedro-echague-landing-page-[a-z0-9-]+\.vercel\.app' "${LOG_DIR}/vercel-deploy.log" | tail -1 || true)"
fi
if [[ -z "$DEPLOY_URL" ]]; then
  echo "WARN: no pude leer la URL del deploy. Usá el alias de rama."
  DEPLOY_URL="$PREVIEW_ALIAS"
fi

echo "==> 5/6 Smoke catálogo Preview"
CAT_HTTP="$(curl -sS -m 25 -o /tmp/uat-catalogo.json -w '%{http_code}' "${DEPLOY_URL}/api/inscripcion/catalogo" || echo 000)"
if [[ "$CAT_HTTP" != "200" ]]; then
  echo "WARN: catálogo Preview HTTP $CAT_HTTP (si es 302, SSO; si 417, env vieja)."
  echo "      Probá el alias de rama o esperá 30s y recargá."
else
  echo "    Catálogo Preview OK (HTTP 200)"
fi

TESTER_WIZARD="${DEPLOY_URL}/asociate/inscripcion"
{
  echo "UAT staging listo — $(date -Iseconds)"
  echo ""
  echo "Link testers (inscripción):"
  echo "  ${TESTER_WIZARD}"
  echo ""
  echo "Alias de rama (mismo preview):"
  echo "  ${PREVIEW_ALIAS}/asociate/inscripcion"
  echo ""
  echo "Túnel Frappe (no hace falta pasárselo a testers):"
  echo "  ${TUN}"
  echo ""
  echo "Guion de casos: docs/uat-opcion-b.md"
  echo ""
  echo "Dejá corriendo la terminal del script. Para bajar:"
  echo "  ./scripts/uat/stop-staging-uat.sh"
} | tee "$SESSION_FILE"

echo ""
echo "==> 6/6 Túnel en primer plano (Ctrl+C corta el UAT)"
echo "    PID cloudflared: $(cat "$PID_FILE")"
echo ""

cleanup() {
  echo ""
  echo "==> Cortando túnel…"
  if [[ -f "$PID_FILE" ]]; then
    kill "$(cat "$PID_FILE")" 2>/dev/null || true
    rm -f "$PID_FILE"
  fi
  pkill -f "cloudflared tunnel --url http://127.0.0.1:${FRAPPE_PORT}" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

# Mantener vivo el túnel mientras dure la sesión
if [[ -f "$PID_FILE" ]] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  wait "$(cat "$PID_FILE")" || true
else
  tail -f "$TUNNEL_LOG"
fi
