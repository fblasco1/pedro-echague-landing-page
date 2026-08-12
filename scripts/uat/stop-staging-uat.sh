#!/usr/bin/env bash
# Baja el túnel UAT (Frappe/Docker quedan arriba).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PID_FILE="${ROOT}/.uat/cloudflared.pid"

if [[ -f "$PID_FILE" ]]; then
  kill "$(cat "$PID_FILE")" 2>/dev/null || true
  rm -f "$PID_FILE"
  echo "Túnel cloudflared detenido."
else
  echo "No había PID de túnel."
fi
pkill -f "cloudflared tunnel --url http://127.0.0.1:8000" 2>/dev/null || true
echo "Frappe/Docker siguen corriendo (no se apagan)."
