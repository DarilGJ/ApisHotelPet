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

// Map backend status to frontend status format
const mapStatusToFrontend = (status) => {
    const statusMap = {
        'pending': 'PENDING',
        'confirmed': 'CONFIRMED',
        'inProgress': 'IN_PROGRESS',
        'completed': 'COMPLETED',
        'canceled': 'CANCELED'
    };
    return statusMap[status] || status;
};

// Map frontend status to backend status format
const mapStatusToBackend = (status) => {
    const statusMap = {
        'PENDING': 'pending',
        'CONFIRMED': 'confirmed',
        'IN_PROGRESS': 'inProgress',
        'COMPLETED': 'completed',
        'CANCELED': 'canceled'
    };
    return statusMap[status] || status;
};

// Get month key from date (YYYY-MM format)
const getMonthKey = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
};

// Reports endpoint for reservations
exports.getReports = async (req, res) => {
    try {
        const {
            status,
            startDate,
            endDate,
            customerName,
            roomType
        } = req.query;

        // Build where conditions
        const whereConditions = {};

        // Filter by status - handle 'all', undefined, empty string, or actual status
        if (status && status !== 'all' && status !== '' && status !== 'undefined') {
            const backendStatus = mapStatusToBackend(status);
            if (backendStatus) {
                whereConditions.status = backendStatus;
            }
        }

        // Filter by date range - handle empty strings and undefined
        if (startDate && startDate !== '' && startDate !== 'undefined') {
            whereConditions.startDate = {
                [Op.gte]: new Date(startDate)
            };
        }

        if (endDate && endDate !== '' && endDate !== 'undefined') {
            const endDateTime = new Date(endDate);
            endDateTime.setHours(23, 59, 59, 999);
            whereConditions.endDate = {
                [Op.lte]: endDateTime
            };
        }

        // Build include conditions
        const includeConditions = [
            {
                model: db.customers,
                as: 'customer',
                attributes: ['id', 'name', 'lastName', 'email', 'phone'],
                required: false
            },
            {
                model: db.rooms,
                as: 'room',
                attributes: ['id', 'number', 'type', 'capacity', 'price'],
                required: false
            }
        ];

        // Filter by customer name (if provided) - handle empty strings and undefined
        if (customerName && customerName !== '' && customerName !== 'undefined') {
            includeConditions[0].where = {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${customerName}%` } },
                    { lastName: { [Op.iLike]: `%${customerName}%` } }
                ]
            };
            includeConditions[0].required = true;
        }

        // Filter by room type (if provided) - handle 'all', empty strings and undefined
        if (roomType && roomType !== 'all' && roomType !== '' && roomType !== 'undefined') {
            includeConditions[1].where = { type: roomType };
            includeConditions[1].required = true;
        }

        // Fetch all reservations with filters
        const reservations = await Reserve.findAll({
            where: whereConditions,
            include: includeConditions,
            order: [['startDate', 'DESC']]
        });

        // Transform reservations to match frontend format
        const transformedReservations = reservations.map(reservation => {
            const reservationData = reservation.toJSON();
            return {
                id: reservationData.id,
                startDate: reservationData.startDate,
                endDate: reservationData.endDate,
                checkInDate: reservationData.checkInDate,
                checkOutDate: reservationData.checkOutDate,
                status: mapStatusToFrontend(reservationData.status),
                observation: reservationData.observation,
                subTotal: parseFloat(reservationData.subTotal) || 0,
                iva: parseFloat(reservationData.iva) || 0,
                total: parseFloat(reservationData.total) || 0,
                customer: reservationData.customer || null,
                room: reservationData.room || null,
                customerId: reservationData.customerId,
                roomId: reservationData.roomId,
                employeeId: reservationData.employeeId
            };
        });

        // Calculate statistics with proper numeric formatting
        const totalReservations = transformedReservations.length;
        const totalRevenue = transformedReservations.reduce((sum, res) => {
            return sum + (parseFloat(res.total) || 0);
        }, 0);
        const averageReservationValue = totalReservations > 0 
            ? parseFloat((totalRevenue / totalReservations).toFixed(2)) 
            : 0;

        // Reservations by status - ensure all status types are included
        const reservationsByStatus = {
            'PENDING': 0,
            'CONFIRMED': 0,
            'IN_PROGRESS': 0,
            'COMPLETED': 0,
            'CANCELED': 0
        };
        transformedReservations.forEach(res => {
            const status = res.status;
            if (reservationsByStatus.hasOwnProperty(status)) {
                reservationsByStatus[status] = (reservationsByStatus[status] || 0) + 1;
            }
        });

        // Reservations and revenue by month
        const reservationsByMonth = {};
        const revenueByMonth = {};
        transformedReservations.forEach(res => {
            const monthKey = getMonthKey(res.startDate);
            reservationsByMonth[monthKey] = (reservationsByMonth[monthKey] || 0) + 1;
            const revenue = parseFloat(res.total) || 0;
            revenueByMonth[monthKey] = parseFloat(((revenueByMonth[monthKey] || 0) + revenue).toFixed(2));
        });

        // Get unique room types for filter options
        const roomTypes = [...new Set(
            transformedReservations
                .map(res => res.room?.type)
                .filter(type => type)
        )];

        // Prepare response - return array directly for compatibility with frontend service
        // But also include statistics in the response for easy access
        const response = {
            reservations: transformedReservations,
            statistics: {
                totalReservations,
                totalRevenue: parseFloat(totalRevenue.toFixed(2)),
                averageReservationValue,
                reservationsByStatus,
                reservationsByMonth,
                revenueByMonth
            },
            filterOptions: {
                roomTypes
            }
        };

        res.json(response);
    } catch (error) {
        console.error('Error generating reports:', error);
        res.status(500).send({
            message: 'Error generating reservation reports: ' + error.message
        });
    }
};