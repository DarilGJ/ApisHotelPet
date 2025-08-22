const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

var corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//const db = require('./modelos');
//db.sequelize.sync();

app.get('/', (req, res) => {
    res.send('Proyecto Final Desarrollo Web HOTEL PETS!');
});

//require('./rutas')(app);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});