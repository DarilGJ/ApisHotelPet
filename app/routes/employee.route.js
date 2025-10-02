module.exports = app => {
    const employees = require('../controllers/employee.controller');
    var router = require('express').Router();
    //Create a new Employee
    router.post('/create', employees.create);
    //Retrieve all Employees
    router.get('/', employees.findAll);
    //Retrieve a single Employee with id
    router.get('/:id/employee', employees.findOne);
    //Update an Employee with id
    router.put('/:id/update', employees.update);
    //Delete an Employee with id
    router.delete('/:id/delete', employees.delete);

    app.use('/api/employees', router);
}