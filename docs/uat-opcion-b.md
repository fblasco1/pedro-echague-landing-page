# UAT Opción B — Portal de alta familiar

Entorno de prueba para testers humanos **sin tocar producción** (`gestion.icdpedroechague.com.ar`).

## Piezas

| Pieza | Qué |
|--------|-----|
| Frontend | Preview Vercel de `feat/wizard-alta-asociacion` |
| Backend | Frappe local, rama `feat/portal-alta-grupo-familiar`, site `dev.localhost` |
| Puente | Túnel HTTPS con `cloudflared` (`scripts/uat/start-frappe-tunnel.sh`) |

## Setup (desarrollador, una vez por sesión UAT)

1. Encender **Docker Desktop** (integración WSL).
2. Contenedores + bench:

```bash
docker start devcontainer-postgresql-1 devcontainer-redis-cache-1 \
  devcontainer-redis-queue-1 devcontainer-frappe-1

docker exec -u frappe devcontainer-frappe-1 bash -lc \
  'cd /workspace/development/frappe-bench/apps/club_management && \
   git checkout feat/portal-alta-grupo-familiar'

docker exec -u frappe -d devcontainer-frappe-1 bash -lc \
  'cd /workspace/development/frappe-bench && bench serve --port 8000'
```

3. Túnel (dejar la terminal abierta):

```bash
cd pedro-echague-landing-page
chmod +x scripts/uat/start-frappe-tunnel.sh
./scripts/uat/start-frappe-tunnel.sh
```

4. Copiar la URL `https://….trycloudflare.com` que imprime cloudflared.
5. En Vercel → proyecto landing → **Settings → Environment Variables** (entorno **Preview**):

```
FRAPPE_BASE_URL=https://….trycloudflare.com
FRAPPE_SITE_HOST=dev.localhost
```

6. **Redeploy** del deployment de `feat/wizard-alta-asociacion`.
7. En Vercel → Deployment Protection: permitir acceso a testers (desactivar SSO estricto del preview o usar password/share).
8. Pasar a testers la URL del preview + este guion.

> Si cambia la URL del túnel (reinicio de cloudflared), hay que actualizar `FRAPPE_BASE_URL` y redeploy.

## URLs útiles (completar en cada sesión)

- Preview landing: `______________________________`
- Túnel Frappe: `______________________________`
- Desk staging (local vía túnel): `https://….trycloudflare.com/desk` (Host/site `dev.localhost`; puede requerir cookie/login)

## Checklist de casos

Usar DNI/emails inventados (`tester.001@example.com`, etc.). No datos reales de socios.

### Caso A — Adulto simple
- [ ] Titular > 18, sin familiares, «Socio sin actividad»
- [ ] Adjuntos: DNI frente/dorso, foto, ficha/apto
- [ ] Submit OK → código de seguimiento
- [ ] En Desk: aparece `Solicitud Grupo Familiar` / solicitudes en Pendiente

### Caso B — Menor + tutor
- [ ] Titular < 18 → se muestra bloque tutor obligatorio
- [ ] Sin tutor no deja avanzar
- [ ] Con tutor completo → submit OK
- [ ] Desk: solicitud Menor con campos `*_tutor` cargados

### Caso C — Grupo familiar
- [ ] Titular adulto + Cónyuge + Hijo (menor)
- [ ] Hijo menor: aviso de responsable = titular (sin re-cargar tutor)
- [ ] Submit OK, N personas correctas
- [ ] Tras validar titular en Desk: cónyuge como **cotitular** (`es_principal=0`)

### Caso D — Secretaría (Desk)
- [ ] Login Secretaría en el Frappe de prueba
- [ ] Ver trámites A/B/C
- [ ] Validar titular → se crea Socio / Grupo Familiar
- [ ] Flujo offline claro (contacto WhatsApp / Activar u Omitir pago) — sin cobro online

## Fuera de alcance de este UAT

- Pago online (Cobros Plus)
- Inscripción a actividades desde el portal
- Producción Hetzner

## Reporte de bugs

Incluir: caso (A/B/C/D), paso, captura, DNI de prueba, hora aproximada, URL del preview.
