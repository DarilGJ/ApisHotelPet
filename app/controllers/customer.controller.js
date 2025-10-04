const db = require('../models');
const Customer = db.customers;
const Op = db.Sequelize.Op;

//create and Save a new Customer
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: 'content invalid',
        });
        return;
    }
    //Create a Customer
    const customer = {
        name: req.body.name,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        dpi: req.body.dpi,
        registrationDate: req.body.registrationDate,
        status: req.body.status
    };
    //Save Customer in the database
    Customer.create(customer)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Room.',
            });
        });
};

    //Retrieve all Customers from the database
    exports.findAll = (req, res) => {
        const number = req.query.number;
        var condition = number ? { number: { [Op.like]: `%${number}%`}}: null;
        Customer.findAll({ where: condition })
        .then( (data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error ocurred while retrieving Customers',
            });
        });
    };

    //Find a single Customer with an id
    exports.findOne = (req, res) =>{
        const id = req.params.id;
        Customer.findByPk(id)
        .then((data) => {
            if(data) {
                res.send(data);
                }else{
                    res.status(404).send({
                        message: `Can't find Customer with id = ${id}.`,
                    });
                }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving Customer with id = '+id,
            });
        });
    };

    //Update a Customer with an id
    exports.update = (req, res) => {
        const id = req.params.id;
        Customer.update(req.body, {
            where: {id: id},
        })
        .then((num)=> {
            if(num == 1){
                res.send({
                    message: "Customer was updated successfully",
                });
            } else {
                res.send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Customer with id = " + id,
            });
        });
    };

    //Delete a Customer with an id
    exports.delete = (req, res) => {
        const id = req.params.id;
        Customer.destroy({
            where: {id: id},
        })
        .then((num) => {
            if(num == 1){
                res.send({
                    message: "Customer was deleted successfully!",
                });
            }else{
                res.send({
                    message: `Can't delete Customer with id = ${id}. Maybe Customer was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error deleting Customer with id = '+ id,
            });
        });
    }