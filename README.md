# Documentacion de la api

## Url base

http://localhost:5000/api

# Endpoints

## Usuarios

## Obras
### `GET /api/obras?categoria=pintura&tamaño=50x40&autor=Wendy%20Becerra&sortField=precio&sortOrder=desc&skip=0&limit=10`
- **Descripción:** Obtiene todas las obras registradas.
- **Parametros:** 
Campos que tienen que ser fijos:
tamaño, categoria y autor
limit: limita la cantidad de documentos a mostrar
Skip: se salta los documentos que le digas para hacer paginacion
Editar todos los campos del link segun que se quiera buscar. 

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
## Carrito

### `GET /api/carrito/:idUsuario`
- **Descripción:** Obtiene todas las obras agregadas al carrito.
- **Parametros:** id del usuario en la url para traer todos los items agregados al carrito.

- **Respuesta Exitosa (200):**
```json
{
  "data": [ /* Array de ítems en el carrito formateado con subtotales y total*/ ]
}
```

### `POST /api/carrito/add`
- **Descripción:** Agrega una obra al carrito.
- **Body esperado (JSON):**
```json
{
    "idUsuario": "id del usuario dada por mongo",
    "idItem": "id del item dada por mongo"
}
```
- **Respuesta Exitosa (200):**
```json
{
  "message": "Obra agregada al carrito",
  "data": { /* Objeto de la obra agregada */ }
}
```
### `DELETE /api/carrito/delete/id`
- **Descripción:** Elimina una obra del carrito por su ID.
- **Parámetro:** id de la obra (en la URL).
- **Respuesta Exitosa (200):**
```json
{
  "message": "Obra eliminada del carrito",
  "data": { /* Obra eliminada */ }
}
```

## Reseñas


### `GET /api/resenas/:id`
- **Descripción:** Obtiene todas las reseñas relacionadas a una obra.
- **Parametros:** id de la obra en la url para traer todos los items.

- **Respuesta Exitosa (200):**
```json
{
  "data": [ /* Array de reseñas */ ]
}
```

### `POST /api/resenas/postear`
- **Descripción:** Agrega una reseña a una obra.
- **Body esperado (JSON):**
```json
{
  "idUsuario": "67e862c7bbacf94f5ad5ba08",
  "idObra": "68308f711a5b62844ead8f30",
  "contenido": "asdasdasd",
  "valoracion": 4, //maximo 4
  "likes": 3
}
```
- **Respuesta Exitosa (200):**
```json
{
  "message": "Reseña posteada",
  "data": { /* Info de la reseña*/ }
}
```
### `DELETE /api/resenas/eliminar`
- **Descripción:** Elimina una reseña de una obra revisando la id del usuario.
- **Parámetro:** id de la obra (en la URL).
- **Body esperado (JSON):**
```json
{
    "idResena":"6830e07f453d4c7885a3301f",
    "idUsuario":"67e862c7bbacf94f5ad5ba08"
}
```
- **Respuesta Exitosa (200):**
```json
{
  "message": "Reseña eliminada",
  "data": { /* Reseña eliminada */ }
}
```
## Favoritos

### `GET /api/favoritos/:idUsuario`
- **Descripción:** Obtiene todas las obras agregadas a favoritos.
- **Parametros:** id del usuario en la url para traer todos los items agregados a favoritos.

- **Respuesta Exitosa (200):**
```json
{
  "data": [ /* Array de ítems en favoritos*/ ]
}
```

### `POST /api/favoritos/add`
- **Descripción:** Agrega una obra a favoritos.
- **Body esperado (JSON):**
```json
{
    "idUsuario": "id del usuario dada por mongo",
    "idItem": "id del item dada por mongo"
}
```
- **Respuesta Exitosa (200):**
```json
{
  "message": "Obra agregada a favoritos",
  "data": { /* Objeto de la obra agregada */ }
}
```
### `DELETE /api/favoritos/delete/id`
- **Descripción:** Elimina una obra de favoritos por su ID.
- **Parámetro:** id de la obra (en la URL).
- **Respuesta Exitosa (200):**
```json
{
  "message": "Obra eliminada de favoritos",
  "data": { /* Obra eliminada */ }
}
```

# Direcciones de imagenes

## Imagenes de obras
http://localhost:5000/obras/laimagen.jpg

## Imagenes de usuario
http://localhost:5000/uploads/laimagen.jpg
