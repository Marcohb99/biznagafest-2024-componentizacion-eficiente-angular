# Backend

## Instalación

```bash
pnpm install
```

## Ejecución

```bash
pnpm start
```

## API

### GET /todos

Devuelve todas las tareas.

Ejemplo de respuesta:

```json
{
  "status": true,
  "data": [
    {
      "id": 1,
      "text": "Buy milk",
      "user": "Manu",
      "completed": false
    }
  ]
}
```

### POST /todos

Crea una nueva tarea.

Ejemplo de respuesta:

```json
{
  "status": true,
  "id": 1
}
```

### PATCH /todos/:id

Actualiza una tarea por su ID, puede actualizar el texto, el usuario y el estado de completado.

Ejemplo de petición:

```json
body
{
  "id": 1,
  "text": "Buy milk and bread",
}
```

Ejemplo de respuesta:

```json
{
  "status": true,
  "message": "Todo updated successfully"
}
```

### DELETE /todos/:id

Elimina una tarea por su ID.

Ejemplo de respuesta:

```json
{
  "status": true,
  "message": "Todo deleted successfully"
}
```

## Notas

Este proyecto está generado como ejemplo para la charla sobre componentización eficiente en https://www.biznagafest.com/ por lo que no tiene implementaciones de seguridad, validaciones, etc. No se recomienda usarlo en producción.