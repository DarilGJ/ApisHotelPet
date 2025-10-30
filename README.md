# Hotel Pets - Backend API

Backend API para el sistema de gestión de Hotel Pets, desarrollado como proyecto final de Desarrollo Web.

##  Características

- API RESTful para gestión de hotel de mascotas
- Base de datos PostgreSQL con Sequelize ORM
- Sistema de reservas completas para mascotas
- Dashboard con estadísticas en tiempo real
- Gestión de habitaciones, empleados, servicios y clientes
- Relaciones complejas entre entidades (N:M, 1:N)
- Base de datos en la nube (Neon.tech)
- **Integración de pagos con Stripe** - Procesamiento seguro de pagos
- **Variables de entorno** - Configuración segura con dotenv

##  Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **PostgreSQL** - Base de datos relacional (Neon.tech)
- **Sequelize** - ORM para Node.js
- **CORS** - Middleware para manejo de CORS
- **Nodemon** - Herramienta de desarrollo
- **pg** - Driver de PostgreSQL para Node.js
- **Stripe** - Plataforma de pagos en línea
- **dotenv** - Gestión de variables de entorno

##  Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- npm o yarn

##  Instalación

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

4. **Configuración de Variables de Entorno**
   - Crea un archivo `.env` en la raíz del proyecto
   - Configura las siguientes variables:
   ```env
   STRIPE_SECRET_KEY=tu_stripe_secret_key
   STRIPE_PUBLIC_KEY=tu_stripe_public_key
   JWT_SECRET=una_clave_secreta_segura
   ```

5. **Sincronización de Base de Datos**
   - Las tablas se crean automáticamente al iniciar el servidor
   - Sequelize sincroniza los modelos con la base de datos

##  Uso

### Desarrollo
```bash
npm run dev
```
El servidor se ejecutará en `http://localhost:3000`

### Producción
```bash
npm start
```

##  API Endpoints

### Dashboard
- `GET /api/dashboard/stats` - Obtener estadísticas del dashboard
- `GET /api/dashboard/recent-reservations` - Obtener reservas recientes

### Usuarios
- `POST /api/users/register` - Registrar nuevo usuario
- `POST /api/users/login` - Iniciar sesión y obtener JWT
- `POST /api/users/create` - Crear usuario (admin)
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id/user` - Obtener usuario por ID
- `PUT /api/users/:id/update` - Actualizar usuario
- `DELETE /api/users/:id/delete` - Eliminar usuario

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
- `GET /api/reserves` - Obtener todas las reservas
- `POST /api/reserves` - Crear nueva reserva
- `GET /api/reserves/:id` - Obtener reserva por ID
- `PUT /api/reserves/:id` - Actualizar reserva
- `DELETE /api/reserves/:id` - Eliminar reserva

### Pagos (Stripe)
- `POST /api/stripe/create-payment-intent` - Crear intención de pago
- `GET /api/stripe/public-key` - Obtener la clave pública de Stripe

### Ejemplos de Uso - Reservas

#### Crear una nueva reserva
```bash
POST /api/reserves
Content-Type: application/json

{
  "startDate": "2024-01-15",
  "endDate": "2024-01-20",
  "checkInDate": "2024-01-15T14:00:00Z",
  "checkOutDate": "2024-01-20T12:00:00Z",
  "status": "confirmed",
  "observation": "Mascota requiere dieta especial",
  "subTotal": 150.00,
  "iva": 24.00,
  "total": 174.00,
  "customerId": 1,
  "roomId": 2,
  "employeeId": 1
}
```

#### Buscar reservas por número
```bash
GET /api/reserves?number=123
```

#### Actualizar estado de reserva
```bash
PUT /api/reserves/1
Content-Type: application/json

{
  "status": "inProgress",
  "checkInDate": "2024-01-15T15:30:00Z"
}
```

### Ejemplos de Uso - Pagos

#### Crear una intención de pago
```bash
POST /api/stripe/create-payment-intent
Content-Type: application/json

{
  "amount": 174.00,
  "currency": "usd",
  "description": "Pago por reserva de mascota",
  "metadata": {
    "reservationId": "123",
    "customerId": "1"
  }
}
```

**Respuesta:**
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

### Ejemplos de Uso - Usuarios

#### Registrar usuario
```bash
POST /api/users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "StrongPass123",
  "usertype": "customer",
  "customerId": 1
}
```

**Respuesta:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 10,
    "email": "user@example.com",
    "usertype": "customer",
    "customerId": 1,
    "isActive": true,
    "createdAt": "2025-10-30T12:00:00.000Z"
  }
}
```

#### Login
```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "StrongPass123"
}
```

**Respuesta:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 10,
    "email": "user@example.com",
    "usertype": "customer",
    "customerId": 1,
    "isActive": true,
    "lastLogin": "2025-10-30T12:05:00.000Z"
  }
}
```

##  Estructura del Proyecto

```
backend/
├── app/
│   ├── config/
│   │   ├── db.config.js          # Configuración de base de datos (Neon.tech)
│   │   └── stripe.config.js      # Configuración de Stripe
│   ├── controllers/              # Controladores de la API
│   │   ├── customer.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── employee.controller.js
│   │   ├── recentReservation.controller.js
│   │   ├── reserve.controller.js
│   │   ├── room.controller.js
│   │   ├── service.controller.js
│   │   ├── stripe.controller.js  # Controlador de pagos Stripe
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
│       ├── stripe.route.js        # Rutas de pagos Stripe
│       └── user.route.js
├── server.js                     # Archivo principal del servidor
├── package.json                  # Dependencias y scripts
└── README.md                     # Este archivo
```

##  Modelo de Base de Datos

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

##  Dashboard

El sistema incluye un dashboard con estadísticas en tiempo real:

- **Total de Clientes** - Número total de clientes registrados
- **Total de Empleados** - Número total de empleados
- **Total de Habitaciones** - Número total de habitaciones disponibles
- **Total de Reservas** - Número total de reservas realizadas
- **Reservas Activas** - Reservas con estado "confirmed"
- **Habitaciones Disponibles** - Habitaciones con estado "available"

##  Scripts Disponibles

- `npm start` - Ejecuta el servidor en modo producción
- `npm run dev` - Ejecuta el servidor en modo desarrollo con nodemon

##  Configuración de Desarrollo

### Variables de Entorno
El proyecto utiliza Neon.tech como base de datos en la nube y Stripe para pagos. La configuración está en los archivos de configuración:

**Base de datos (`app/config/db.config.js`):**
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

**Stripe (`app/config/stripe.config.js`):**
```javascript
require('dotenv').config();

module.exports = {
    secretKey: process.env.STRIPE_SECRET_KEY,
    publicKey: process.env.STRIPE_PUBLIC_KEY
};
```

**Archivo `.env` requerido:**
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
```

### Sincronización de Base de Datos
- Las tablas se crean automáticamente al iniciar el servidor
- Sequelize maneja la sincronización de modelos
- No se requieren migraciones manuales

##  Funcionalidades Implementadas

### Sistema de Reservas
- Creación de reservas con fechas de inicio y fin
- Asignación de habitaciones y empleados
- Cálculo automático de subtotal, IVA y total
- Estados de reserva (pending, confirmed, inProgress, completed, canceled)
- Fechas de check-in y check-out opcionales
- Observaciones detalladas para cada reserva
- Búsqueda de reservas por número
- CRUD completo para gestión de reservas

### Gestión de Entidades
- CRUD completo para todas las entidades principales
- Relaciones complejas entre entidades
- Validaciones de datos

### Dashboard en Tiempo Real
- Estadísticas actualizadas automáticamente
- Vista de reservas recientes
- Métricas de ocupación y disponibilidad

### Sistema de Pagos
- Integración completa con Stripe
- Creación de intenciones de pago seguras
- Soporte para múltiples monedas
- Metadatos personalizados para cada pago
- Validación de montos y datos de pago
- Configuración mediante variables de entorno

##  Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

##  Licencia

Este proyecto está bajo la Licencia ISC.

##  Autores

- Daril Garcia - *Desarrollo inicial*

---

**Proyecto Final - Desarrollo Web**
