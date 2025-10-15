module.exports = app => {
    const reserves = require('../controllers/reserve.controller');
    var router = require('express').Router();
    //Create a new Reserve
    router.post('', reserves.create);
    //Retrieve all Reserves
    router.get('', reserves.findAll);
    //Retrieve a single Reserve with id
    router.get('/:id', reserves.findOne);
    //Update a Reserve with id
    router.put('/:id', reserves.update);
    //Delete a Reserve with id
    router.delete('/:id', reserves.delete);

    app.use('/api/reserves', router);
};