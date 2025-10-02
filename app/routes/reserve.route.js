module.exports = app => {
    const reserves = require('../controllers/reserve.controller');
    var router = require('express').Router();
    //Create a new Reserve
    router.post('', reserves.create);

    app.use('/api/reserves', router);
};