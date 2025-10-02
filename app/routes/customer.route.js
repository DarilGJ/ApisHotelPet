module.exports = app => {
    const customers = require('../controllers/customer.controller');
    var router = require('express').Router();
    //Create a new Customer
    router.post('/create', customers.create);
    //Retrieve all Customers
    router.get('/', customers.findAll);
    //Retrieve a single Customer with id
    router.get('/:id/customer', customers.findOne);
    //Update a Customer with id
    router.put('/:id/update', customers.update);
    //Delete a Customer with id
    router.delete('/:id/delete', customers.delete);

    app.use('/api/customers', router);
}