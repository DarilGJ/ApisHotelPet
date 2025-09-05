module.exports = app => {
    const services = require('../controllers/service.controller');
    var router = require('express').Router();
    //Create a new Service
    router.post('/create', services.create);
    //Retrieve all Services
    router.get('/', services.findAll);
    //Retrieve a single Service with id
    router.get('/:id/service', services.findOne);
    //Update a Service with id
    router.put('/:id/update', services.update);
    //Delete a Service with id
    router.delete('/:id/delete', services.delete);

    app.use('/api/services', router);
};