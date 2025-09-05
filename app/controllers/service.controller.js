const db = require('../models');
const Service = db.services;
const Op = db.Sequelize.Op;

//Create and Save a new Service
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: 'content invalid',
        });
        return;
    }
    //Create a Service
    const service = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        duration: req.body.duration,
        category: req.body.category,
        status: req.body.status
    };
    //Save Service in the database
    Service.create(service)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Service.',
            });
        });
};

//Retrieve all Services from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Service.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving services.',
            });
        });
};

//Find a single Service with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Service.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Service with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving Service with id=' + id,
            });
        });
};

//Update a Service with an id
exports.update = (req, res) => {
    const id = req.params.id;
    Service.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Service was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Service with id=${id}. Maybe Service was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Service with id=' + id,
            });
        });
};

//Delete a Service with an id
exports.delete = (req, res) => {
    const id = req.params.id;
    Service.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Service was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Service with id=${id}. Maybe Service was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error deleting Service with id=' + id,
            });
        });
};