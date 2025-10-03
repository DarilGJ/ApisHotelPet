module.exports = app => {
    const employees = require('../controllers/employee.controller');
    var router = require('express').Router();
    //Create a new Employee
    router.post('', employees.create);
    //Retrieve all Employees
    router.get('', employees.findAll);
    //Retrieve a single Employee with id
    router.get('/:id', employees.findOne);
    //Update an Employee with id
    router.put('/:id', employees.update);
    //Delete an Employee with id
    router.delete('/:id', employees.delete);

    app.use('/api/employees', router);
}