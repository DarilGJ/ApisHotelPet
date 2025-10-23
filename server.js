const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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