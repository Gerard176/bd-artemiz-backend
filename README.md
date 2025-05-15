# Documentacion de la api

## Url base

http://localhost:5000/api

# Endpoints

## Usuarios

## Obras
### `GET /api/obras`
- **Descripción:** Obtiene todas las obras registradas.
- **Respuesta Exitosa (200):**
```json
{
  "data": [ /* Array de obras */ ]
}
```
### `GET /api/obras/id`
- **Descripción:** Obtiene una sola de las obras.
- **Parámetro:** id de la obra (en la URL).
- **Respuesta Exitosa (200):**
```json
{
    "obra": {
        "_id": "67fc00283f1d31ac90e1144e",
        "nombre": "atardecer oleo",
        "img": "",
        "precio": 100,
        "descripcion": "asdddddasdasdasdasdasd"
    }
}
```
