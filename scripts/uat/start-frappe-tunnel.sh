#!/usr/bin/env bash
# Opción B UAT: expone Frappe local (puerto 8000) con túnel HTTPS (cloudflared)
# y muestra las variables a cargar en Vercel Preview.
#
# Requisitos:
#   1. Docker Desktop encendido (WSL integration)
#   2. Contenedor frappe con rama feat/portal-alta-grupo-familiar
#   3. bench serve en :8000
#   4. cloudflared en PATH (~/.local/bin)
#
# Uso:
#   ./scripts/uat/start-frappe-tunnel.sh

set -euo pipefail

export PATH="${HOME}/.local/bin:${PATH}"
FRAPPE_PORT="${FRAPPE_PORT:-8000}"
SITE_HOST="${FRAPPE_SITE_HOST:-dev.localhost}"

if ! command -v cloudflared >/dev/null 2>&1; then
  echo "Falta cloudflared. Instalalo con:"
  echo "  curl -fsSL -o ~/.local/bin/cloudflared \\"
  echo "    https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64"
  echo "  chmod +x ~/.local/bin/cloudflared"
  exit 1
fi

if ! curl -sf -m 3 -H "Host: ${SITE_HOST}" \
  "http://127.0.0.1:${FRAPPE_PORT}/api/method/frappe.ping" >/dev/null; then
  echo "ERROR: Frappe no responde en http://127.0.0.1:${FRAPPE_PORT}"
  echo "  - Abrí Docker Desktop"
  echo "  - docker start devcontainer-frappe-1 (y postgres/redis)"
  echo "  - docker exec -u frappe -d devcontainer-frappe-1 bash -lc \\"
  echo "      'cd /workspace/development/frappe-bench && bench serve --port 8000'"
  echo "  - Confirmá rama: feat/portal-alta-grupo-familiar"
  exit 1
fi

if ! curl -sf -m 5 -H "Host: ${SITE_HOST}" \
  "http://127.0.0.1:${FRAPPE_PORT}/api/method/club_management.members.api.alta_grupo_publica.get_catalogo_alta" \
  | grep -q actividades; then
  echo "ERROR: falta API portal (get_catalogo_alta)."
  echo "  checkout feat/portal-alta-grupo-familiar + bench migrate"
  exit 1
fi

echo "==> Frappe OK (site ${SITE_HOST})"
echo "==> Levantando túnel cloudflared → http://127.0.0.1:${FRAPPE_PORT}"
echo "    Dejá esta terminal abierta mientras dure el UAT."
echo ""
echo "Cuando aparezca la URL https://….trycloudflare.com, cargá en Vercel →"
echo "Project → Settings → Environment Variables (Preview):"
echo ""
echo "  FRAPPE_BASE_URL=<esa URL sin barra final>"
echo "  FRAPPE_SITE_HOST=${SITE_HOST}"
echo ""
echo "Luego Redeploy del preview de feat/wizard-alta-asociacion."
echo "Desactivá Deployment Protection (SSO) del preview o compartí acceso."
echo ""

exec cloudflared tunnel --url "http://127.0.0.1:${FRAPPE_PORT}"
