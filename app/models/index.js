require('dotenv').config();
const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
const petReservationModel = require('./petReservation.model');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // This is important for self-signed certificates
        }
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model')(sequelize, Sequelize);
db.pets = require('./pet.model')(sequelize, Sequelize);
db.reserves = require('./reserve.model')(sequelize, Sequelize);
db.employees = require('./employee.model')(sequelize, Sequelize);
db.petReservation = require('./petReservation.model')(sequelize, Sequelize);
db.rooms = require('./room.model')(sequelize, Sequelize);
db.customers = require('./customer.model')(sequelize, Sequelize);
db.services = require('./service.model')(sequelize, Sequelize);
db.serviceReservation = require('./serviceReservation.model')(sequelize, Sequelize);


//Relaciones de Autenticación
// User -> Employee (1:1)
db.users.belongsTo(db.employees, {
    foreignKey: 'employee_id',
    as: 'employee'
});
db.employees.hasOne(db.users, {
    foreignKey: 'employee_id',
    as: 'user'
});

// User -> Customer (1:1)
db.users.belongsTo(db.customers, {
    foreignKey: 'customer_id',
    as: 'customer'
});
db.customers.hasOne(db.users, {
    foreignKey: 'customer_id',
    as: 'user'
});

//Relaciones de Negocio
// Cliente -> Mascotas (1:N)
db.customers.hasMany(db.pets, {
    foreignKey: 'customer_id',
    as: 'pets'
});
db.pets.belongsTo(db.customers, {
    foreignKey: 'customer_id',
    as: 'customer'
});

// Cliente -> Reservas (1:N)
db.customers.hasMany(db.reserves, {
    foreignKey: 'customer_id',
    as: 'reserves'
});
db.reserves.belongsTo(db.customers, {
    foreignKey: 'customer_id',
    as: 'customer'
});

// Habitacion -> Reservas (1:N)
db.rooms.hasMany(db.reserves, {
    foreignKey: 'room_id',
    as: 'reserves'
});
db.reserves.belongsTo(db.rooms, {
    foreignKey: 'room_id',
    as: 'room'
});

// Empleado -> Reservas (1:N)
db.employees.hasMany(db.reserves, {
    foreignKey: 'employee_id',
    as: 'reserves'
});
db.reserves.belongsTo(db.employees, {
    foreignKey: 'employee_id',
    as: 'employee'
});

// Reserva -> Mascotas (N:M)
db.reserves.belongsToMany(db.pets, {
    through: db.petReservation,
    foreignKey: 'reserve_id',
    otherKey: 'pet_id'
});
db.pets.belongsToMany(db.reserves, {
    through: db.petReservation,
    foreignKey: 'pet_id',
    otherKey: 'reserve_id'
});

// Reserva -> Servicios (N:M)
db.reserves.belongsToMany(db.services, {
    through: db.serviceReservation,
    foreignKey: 'reserve_id',
    otherKey: 'service_id'
});
db.services.belongsToMany(db.reserves, {
    through: db.serviceReservation,
    foreignKey: 'service_id',
    otherKey: 'reserve_id'
});

module.exports = db;