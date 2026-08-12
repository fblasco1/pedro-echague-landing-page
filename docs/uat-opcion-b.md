# UAT Opción B — Portal de alta familiar

Entorno de prueba para testers humanos **sin tocar producción** (`gestion.icdpedroechague.com.ar`).

## Un comando (sesión de mañana)

1. Encender **Docker Desktop**.
2. En una terminal:

```bash
cd ~/ERSport/pedro-echague-landing-page
./scripts/uat/start-staging-uat.sh
```

El script:

- levanta Docker + `bench serve` en rama `feat/portal-alta-grupo-familiar`
- abre túnel HTTPS (cloudflared)
- carga `FRAPPE_BASE_URL` / `FRAPPE_SITE_HOST` en Vercel **Preview**
- apaga el SSO de Preview
- hace redeploy
- imprime el **link para testers**

3. Copiá el link `…/asociate/inscripcion` y mandáselo a testers + este guion.
4. **Dejá esa terminal abierta** mientras prueben. Al terminar: `./scripts/uat/stop-staging-uat.sh`

Última sesión: `.uat/last-session.txt` (no se commitea).

## Piezas

| Pieza | Qué |
|--------|-----|
| Frontend | Preview Vercel de `feat/wizard-alta-asociacion` |
| Backend | Frappe local, rama `feat/portal-alta-grupo-familiar`, site `dev.localhost` |
| Puente | Túnel HTTPS (`cloudflared`) |

> Cada vez que se reinicia el túnel cambia la URL → el script actualiza Vercel y redeploya. `FRAPPE_SITE_HOST=dev.localhost` es obligatorio.

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
- [ ] Login Secretaría en el Frappe de prueba (`http://dev.localhost:8000/desk`)
- [ ] Ver trámites A/B/C
- [ ] Validar titular → se crea Socio / Grupo Familiar
- [ ] Flujo offline claro (contacto WhatsApp / Activar u Omitir pago) — sin cobro online

## Fuera de alcance de este UAT

- Pago online (Cobros Plus)
- Inscripción a actividades desde el portal
- Producción Hetzner

## Reporte de bugs

Incluir: caso (A/B/C/D), paso, captura, DNI de prueba, hora aproximada, URL del preview.
