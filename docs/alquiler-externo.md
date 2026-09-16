# Alquiler externo (UI pública)

Ruta: `/alquiler` · BFF: `/api/alquiler`

Canal guest de Frappe (`espacios_reserva_externa_habilitada`). Sin login de socio.

## Flujo

1. GET `/api/alquiler?fecha=YYYY-MM-DD` abre/reusa cookie `alquiler_sesion` y devuelve disponibilidad (tarifa externo).
2. POST `{ action: "solicitar", espacio, fecha, hora_*, arrendatario_nombre, arrendatario_contacto }` → `token_acceso`.
3. GET `/api/alquiler?token=…` → estado de la reserva.
4. POST `{ action: "upload_comprobante", token_acceso, filename, content_b64 }` (o multipart) → PDF vía `upload_y_adjuntar_comprobante_externo`.

Si el canal está apagado, las APIs responden 403 con mensaje claro en la UI.

Spec backend: `club_management/specs/reservas_espacio_externo.md`.
