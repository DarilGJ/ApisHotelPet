const db = require('../models');
const Employee = db.employees;
const Op = db.Sequelize.Op;

//Create and Save a new Employee
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: 'content invalid',
        });
        return;
    }
    //Create a Employee
    const employee = {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        salary: req.body.salary,
        hiringDate: req.body.hiringDate,
        status: req.body.status
    };
    //Save Employee in the database
    Employee.create(employee)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Employee.',
            });
        });
};

//Retrieve all Employees from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Employee.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving employees.',
            });
        });
};

//Find a single Employee with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Employee.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Employee with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving Employee with id=' + id,
            });
        });
};

//Update an Employee with an id
exports.update = (req, res) => {
    const id = req.params.id;
    Employee.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Employee was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Employee with id=' + id,
            });
        });
};

//Delete an Employee with an id
exports.delete = (req, res) => {
    const id = req.params.id;
    Employee.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Employee was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error deleting Employee with id=' + id,
            });
        });
};