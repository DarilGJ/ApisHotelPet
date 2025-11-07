require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const corsOrigins = process.env.CORS_ORIGIN || process.env.FRONTEND_URL;
const allowedOrigins = corsOrigins
    ? corsOrigins.split(',').map((origin) => origin.trim()).filter(Boolean)
    : undefined;

const corsOptions = {
    origin: allowedOrigins && allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize.sync();

app.get('/', (req, res) => {
    res.send('Proyecto Final Desarrollo Web HOTEL PETS!');
});

require('./app/routes/user.route')(app);
require('./app/routes/room.route')(app);
require('./app/routes/employee.route')(app);
require('./app/routes/service.route')(app);
require('./app/routes/dashboard.route')(app);
require('./app/routes/customer.route')(app);
require('./app/routes/reserve.route')(app);
require('./app/routes/stripe.route')(app);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});