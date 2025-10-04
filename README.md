# Hotel Pets - Backend API

Backend API para el sistema de gestión de Hotel Pets, desarrollado como proyecto final de Desarrollo Web.

## 🚀 Características

- API RESTful para gestión de hotel de mascotas
- Base de datos PostgreSQL con Sequelize ORM
- Sistema de reservas completas para mascotas
- Dashboard con estadísticas en tiempo real
- Gestión de habitaciones, empleados, servicios y clientes
- Relaciones complejas entre entidades (N:M, 1:N)
- Base de datos en la nube (Neon.tech)

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **PostgreSQL** - Base de datos relacional (Neon.tech)
- **Sequelize** - ORM para Node.js
- **CORS** - Middleware para manejo de CORS
- **Nodemon** - Herramienta de desarrollo
- **pg** - Driver de PostgreSQL para Node.js

## 📋 Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
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

3. **Configuración de Base de Datos**
   - El proyecto utiliza Neon.tech como base de datos en la nube
   - La configuración ya está establecida en `app/config/db.config.js`
   - No se requiere configuración adicional para desarrollo

4. **Sincronización de Base de Datos**
   - Las tablas se crean automáticamente al iniciar el servidor
   - Sequelize sincroniza los modelos con la base de datos

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

### Dashboard
- `GET /api/dashboard/stats` - Obtener estadísticas del dashboard
- `GET /api/dashboard/recent-reservations` - Obtener reservas recientes

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

### Reservas
- `POST /api/reserves` - Crear nueva reserva

## 🗂️ Estructura del Proyecto

```
backend/
├── app/
│   ├── config/
│   │   └── db.config.js          # Configuración de base de datos (Neon.tech)
│   ├── controllers/              # Controladores de la API
│   │   ├── customer.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── employee.controller.js
│   │   ├── recentReservation.controller.js
│   │   ├── reserve.controller.js
│   │   ├── room.controller.js
│   │   ├── service.controller.js
│   │   └── user.controller.js
│   ├── models/                   # Modelos de Sequelize con relaciones
│   │   ├── customer.model.js
│   │   ├── employee.model.js
│   │   ├── pet.model.js
│   │   ├── petReservation.model.js
│   │   ├── reserve.model.js
│   │   ├── room.model.js
│   │   ├── service.model.js
│   │   ├── serviceReservation.model.js
│   │   ├── user.model.js
│   │   └── index.js              # Configuración de relaciones
│   └── routes/                   # Rutas de la API
│       ├── customer.route.js
│       ├── dashboard.route.js
│       ├── employee.route.js
│       ├── reserve.route.js
│       ├── room.route.js
│       ├── service.route.js
│       └── user.route.js
├── server.js                     # Archivo principal del servidor
├── package.json                  # Dependencias y scripts
└── README.md                     # Este archivo
```

## 🗃️ Modelo de Base de Datos

### Entidades Principales
- **Users** - Usuarios del sistema
- **Customers** - Clientes del hotel
- **Pets** - Mascotas de los clientes
- **Employees** - Empleados del hotel
- **Rooms** - Habitaciones disponibles
- **Services** - Servicios adicionales
- **Reserves** - Reservas de mascotas

### Relaciones
- **Customer → Pets** (1:N) - Un cliente puede tener múltiples mascotas
- **Customer → Reserves** (1:N) - Un cliente puede hacer múltiples reservas
- **Room → Reserves** (1:N) - Una habitación puede tener múltiples reservas
- **Employee → Reserves** (1:N) - Un empleado puede manejar múltiples reservas
- **Reserve ↔ Pets** (N:M) - Una reserva puede incluir múltiples mascotas
- **Reserve ↔ Services** (N:M) - Una reserva puede incluir múltiples servicios

## 📊 Dashboard

El sistema incluye un dashboard con estadísticas en tiempo real:

- **Total de Clientes** - Número total de clientes registrados
- **Total de Empleados** - Número total de empleados
- **Total de Habitaciones** - Número total de habitaciones disponibles
- **Total de Reservas** - Número total de reservas realizadas
- **Reservas Activas** - Reservas con estado "confirmed"
- **Habitaciones Disponibles** - Habitaciones con estado "available"

## 📝 Scripts Disponibles

- `npm start` - Ejecuta el servidor en modo producción
- `npm run dev` - Ejecuta el servidor en modo desarrollo con nodemon

## 🔧 Configuración de Desarrollo

### Variables de Entorno
El proyecto utiliza Neon.tech como base de datos en la nube. La configuración está en `app/config/db.config.js`:

```javascript
module.exports = {
    HOST: "ep-green-waterfall-ad36l30b-pooler.c-2.us-east-1.aws.neon.tech",
    USER: "neondb_owner",
    PASSWORD: "npg_b6oZM7jBkUhz",
    DB: "neondb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
```

### Sincronización de Base de Datos
- Las tablas se crean automáticamente al iniciar el servidor
- Sequelize maneja la sincronización de modelos
- No se requieren migraciones manuales

## 🚀 Funcionalidades Implementadas

### Sistema de Reservas
- Creación de reservas con fechas de inicio y fin
- Asignación de habitaciones y empleados
- Cálculo automático de subtotal, IVA y total
- Estados de reserva (pending, confirmed, cancelled)

### Gestión de Entidades
- CRUD completo para todas las entidades principales
- Relaciones complejas entre entidades
- Validaciones de datos

### Dashboard en Tiempo Real
- Estadísticas actualizadas automáticamente
- Vista de reservas recientes
- Métricas de ocupación y disponibilidad

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
