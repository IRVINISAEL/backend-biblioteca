#📘 README — Backend Biblioteca
##📚 Backend Biblioteca

#API REST creada con Node.js + Express y Supabase como base de datos, diseñada para gestionar usuarios, libros y préstamos dentro de un sistema de biblioteca.

*🚀 Características principales

**CRUD de usuarios (crear, listar, obtener por id, actualizar, eliminar).

**Arquitectura profesional con separación de capas:
`routes → controllers → services → config`

*Validación de datos con Zod (opcional).

**Manejo de errores centralizado.

*Respuestas estandarizadas (successResponse, errorResponse).

#Logger para depuración.

##Conexión directa a Supabase con SDK oficial.
```
📁 Estructura del proyecto
backend/
│── .gitignore
│── package.json
│── package-lock.json
│── README.md
│
└── src/
    ├── index.js
    │
    ├── config/
    │   ├── supabase.js
    │   └── logger.js
    │
    ├── controllers/
    │   └── usuarios.controller.js
    │
    ├── routes/
    │   └── usuarios.routes.js
    │
    ├── services/
    │   └── usuarios.service.js
    │
    ├── middlewares/
    │   └── validator.middleware.js
    │
    └── libs/
        └── responseHandler.js
```

🔧 Instalación
1️⃣ Clona el repositorio
git clone https://github.com/IRVINISAEL/backend-biblioteca.git

2️⃣ Entra al proyecto
cd backend-biblioteca

3️⃣ Instala dependencias
npm install

🔐 Configurar .env

Crea un archivo .env en la raíz:

PORT=3000
SUPABASE_URL=https://TU-PROYECTO.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI...


IMPORTANTE: La Service Key debe ser la anon key o service key generada por Supabase.

▶️ Iniciar el servidor
npm start


El servidor iniciará en:

http://localhost:3000

📡 Endpoints (Usuarios)
GET /api/usuarios

Obtiene todos los usuarios.

Respuesta:
{
  "ok": true,
  "data": [ ... ]
}

GET /api/usuarios/:id

Obtiene un usuario por su ID.

POST /api/usuarios

Crea un nuevo usuario.

Body (ejemplo):
{
  "nombre": "Irvin",
  "correo": "example@gmail.com",
  "telefono": "5551234567"
}

PUT /api/usuarios/:id

Actualiza un usuario.

DELETE /api/usuarios/:id

Elimina un usuario por su ID.

🛠 Middlewares incluídos
✔ validator.middleware.js

Permite validar req.body con esquemas Zod.

schema.parse(req.body)

📦 Helpers incluidos
✔ responseHandler.js

Estandariza respuestas:

successResponse(res, data)
errorResponse(res, "Mensaje de error", 400)

🗄 Conexión a Supabase
src/config/supabase.js


Este archivo genera un cliente oficial de Supabase listo para consultas.

📝 Scripts disponibles

En package.json:

"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}


Ejecutar modo desarrollo:

npm run dev
