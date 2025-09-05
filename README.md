# Hotel Pets - Backend API

Backend API para el sistema de gestión de Hotel Pets, desarrollado como proyecto final de Desarrollo Web.

## 🚀 Características

- API RESTful para gestión de hotel de mascotas
- Base de datos PostgreSQL con Sequelize ORM
- Autenticación y autorización de usuarios
- Gestión de habitaciones, empleados, servicios y clientes
- Sistema de reservas para mascotas

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **PostgreSQL** - Base de datos relacional
- **Sequelize** - ORM para Node.js
- **CORS** - Middleware para manejo de CORS
- **Nodemon** - Herramienta de desarrollo

## 📋 Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [PostgreSQL](https://www.postgresql.org/) (versión 12 o superior)
- npm o yarn

## 🔧 Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd backend
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura la base de datos**
   - Crea una base de datos PostgreSQL
   - Configura las variables de entorno en un archivo `.env`:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=hotel_pets
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   ```

4. **Ejecuta las migraciones**
   ```bash
   npm run migrate
   ```

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```
El servidor se ejecutará en `http://localhost:3000`

### Producción
```bash
npm start
```

## 📚 API Endpoints

### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `POST /api/users` - Crear nuevo usuario
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Habitaciones
- `GET /api/rooms` - Obtener todas las habitaciones
- `POST /api/rooms` - Crear nueva habitación
- `GET /api/rooms/:id` - Obtener habitación por ID
- `PUT /api/rooms/:id` - Actualizar habitación
- `DELETE /api/rooms/:id` - Eliminar habitación

### Empleados
- `GET /api/employees` - Obtener todos los empleados
- `POST /api/employees` - Crear nuevo empleado
- `GET /api/employees/:id` - Obtener empleado por ID
- `PUT /api/employees/:id` - Actualizar empleado
- `DELETE /api/employees/:id` - Eliminar empleado

### Servicios
- `GET /api/services` - Obtener todos los servicios
- `POST /api/services` - Crear nuevo servicio
- `GET /api/services/:id` - Obtener servicio por ID
- `PUT /api/services/:id` - Actualizar servicio
- `DELETE /api/services/:id` - Eliminar servicio

### Clientes
- `GET /api/customers` - Obtener todos los clientes
- `POST /api/customers` - Crear nuevo cliente
- `GET /api/customers/:id` - Obtener cliente por ID
- `PUT /api/customers/:id` - Actualizar cliente
- `DELETE /api/customers/:id` - Eliminar cliente

## 🗂️ Estructura del Proyecto

```
backend/
├── app/
│   ├── config/
│   │   └── db.config.js          # Configuración de base de datos
│   ├── controllers/              # Controladores de la API
│   │   ├── customer.controller.js
│   │   ├── employee.controller.js
│   │   ├── room.controller.js
│   │   ├── service.controller.js
│   │   └── user.controller.js
│   ├── models/                   # Modelos de Sequelize
│   │   ├── customer.model.js
│   │   ├── employee.model.js
│   │   ├── pet.model.js
│   │   ├── petReservation.model.js
│   │   ├── reserve.model.js
│   │   ├── room.model.js
│   │   ├── service.model.js
│   │   ├── serviceReservation.model.js
│   │   ├── user.model.js
│   │   └── index.js
│   └── routes/                   # Rutas de la API
│       ├── customer.route.js
│       ├── employee.route.js
│       ├── room.route.js
│       ├── service.route.js
│       └── user.route.js
├── server.js                     # Archivo principal del servidor
├── package.json                  # Dependencias y scripts
└── README.md                     # Este archivo
```

## 🧪 Testing

```bash
npm test
```

## 📝 Scripts Disponibles

- `npm start` - Ejecuta el servidor en modo producción
- `npm run dev` - Ejecuta el servidor en modo desarrollo con nodemon
- `npm test` - Ejecuta las pruebas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👥 Autores

- Daril Garcia - *Desarrollo inicial*



---

**Proyecto Final - Desarrollo Web**
