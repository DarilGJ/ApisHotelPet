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
            console.log('error', err);
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Reserve.',
            });
        });
};