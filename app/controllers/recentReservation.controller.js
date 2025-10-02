const { where } = require('sequelize');
const db = require('../models');
const RecentReservation = db.reserves;

exports.getRecentReservation = async(req, res) => {
    try {
        const getRecentReservations = await RecentReservation.findAll({
            limit: 5,
            order: [['checkInDate', 'DESC']],
            include:[
                { model: db.customers, attributes: ['name'] },
                { model: db.rooms, attributes: ['number'] }
            ]
        });
        
        const mapReces = getRecentReservations.map((reservation) => {
            return {
                id: reservation.id,
                customer: {
                    name: reservation.customer.name,
                },
                romm: {
                    number: reservation.room.number
                },
                checkIn: reservation.checkInDate,
                checkOut: reservation.checkOutDate,
                status: reservation.status
            }
        })

        res.json(mapReces);

    } catch (error) {
        console.error('Error al obtener los datos del dashboard:', error);
        res.status(500).json({ error: 'Error al obtener los datos del dashboard' });
    }
};