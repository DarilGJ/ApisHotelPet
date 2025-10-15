const { where } = require('sequelize');
const db = require('../models');
const Reserve = db.reserves
const Op = db.Sequelize.Op;

//create and Save a new Reserve
exports.create = (req, res) => {
    if (!req.body.startDate) {
        res.status(400).send({
            message: 'content invalid',
        });
        return;
    }
    //Create a Reserve
    const reserve = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        status: req.body.status,
        observation: req.body.observation,
        subTotal: req.body.subTotal,
        iva: req.body.iva,
        total: req.body.total,
        customerId: req.body.customerId,
        roomId: req.body.roomId,
        employeeId: req.body.employeeId
    };
    //Save Reserve in the database
    Reserve.create(reserve)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Reserve.',
            });
        });
};

exports.findAll = (req, res) => {
    const number = req.query.number;
    var condition = number ? { number: { [Op.like]: `%${number}%` } } : null;
    Reserve.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving reserves.',
            });
        });
};

exports.findOne = (req, res) =>{
    const id = req.params.id;
    Reserve.findByPk(id)
    .then((data) => {
        if(data) {
            res.send(data);
        }else{
            res.status(404).send({
                message: `Can't find Reserve with id = ${id}.`,
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: 'Error retrieving Reserve with id = '+id,
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Reserve.update(req.body, {
        where: {id: id},
    })
    .then((num)=>{
        if(num == 1){
            res.send({
                message: "Reserve was updated succesfully",
            });
        }else{
            res.send({
                message: `Can't update Reserve with id = ${id}. Maybe Reserve was not found or req.body is empty!`,
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: "Error updating Reserve with id = "+id,
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Reserve.destroy({
        where: {id: id},
    })
    .then((num) =>{
        if(num==1){
            res.send({
                message: "Reserve was deleted succesfully",
            });
        }else{
            res.send({
                message: `Can't delete Reserve with id = ${id}. Maybe Reserve was not found`,
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: 'Error deleting Reserve with id = '+id,
        });
    });
}