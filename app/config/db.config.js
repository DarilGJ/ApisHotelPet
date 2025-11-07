require('dotenv').config();

const toNumber = (value, fallback) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
};

const toBoolean = (value, fallback) => {
    if (value === undefined || value === null) {
        return fallback;
    }

    if (typeof value === 'boolean') {
        return value;
    }

    const normalized = value.toString().trim().toLowerCase();

    if (['true', '1', 'yes', 'on', 'require', 'required'].includes(normalized)) {
        return true;
    }

    if (['false', '0', 'no', 'off'].includes(normalized)) {
        return false;
    }

    return fallback;
};

module.exports = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'postgres',
    PASSWORD: process.env.DB_PASSWORD || '',
    DB: process.env.DB_NAME || 'postgres',
    PORT: toNumber(process.env.DB_PORT, 5432),
    dialect: process.env.DB_DIALECT || 'postgres',
    ssl: toBoolean(process.env.DB_SSL, process.env.DB_HOST?.includes('render.com') || false),
    sslMode: process.env.DB_SSL_MODE || 'require',
    pool: {
        max: toNumber(process.env.DB_POOL_MAX, 5),
        min: toNumber(process.env.DB_POOL_MIN, 0),
        acquire: toNumber(process.env.DB_POOL_ACQUIRE, 30000),
        idle: toNumber(process.env.DB_POOL_IDLE, 10000)
    }
};