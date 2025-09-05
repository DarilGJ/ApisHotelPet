const db = require('../models');
const Room = db.rooms;
const Op = db.Sequelize.Op;

//create and Save a new Room
exports.create = (req, res) => {
    if (!req.body.number) {
        res.status(400).send({
            message: 'content invalid',
        });
        return;
    }
    //Create a Room
    const room = {
        number: req.body.number,
        type: req.body.type,
        capacity: req.body.capacity,
        price: req.body.price,
        description: req.body.description,
        availability: req.body.availability
    };
    //Save Room in the database
    Room.create(room)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Room.',
            });
        });
};

//Retrieve all Rooms from the database.
exports.findAll = (req, res) => {
    const number = req.query.number;
    var condition = number ? { number: { [Op.like]: `%${number}` } } : null;
    Room.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving rooms.'
            });
        });
};

//Find a singles Room with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Room.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Room with id =${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving Room with id = ' + id,
            });
        });
};

//Update a Room by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Room.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Room was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Room with id=${id}. Maybe Room was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Room with id=' + id,
            });
        });
};

//Delete a Room with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Room.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Room was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Room with id=${id}. Maybe Room was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Room with id=' + id,
            });
        });
};


