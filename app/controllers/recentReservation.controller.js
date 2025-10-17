const { where } = require('sequelize');
const db = require('../models');
const RecentReservation = db.reserves;

exports.getRecentReservation = async(req, res) => {
    try {
        const getRecentReservations = await RecentReservation.findAll({
            limit: 5,
            order: [['startDate', 'DESC']],
            include:[
                { model: db.customers, attributes: ['name'] },
                { model: db.rooms, attributes: ['number', 'type'] },
                { model: db.employees, attributes: ['name'] }
            ]
        });
        
        const mapReces = getRecentReservations.map((reservation) => {
            return {
                id: reservation.id,
                customer: {
                    name: reservation.customer?.name || 'Cliente no disponible'
                },
                room: {
                    number: reservation.room?.number || 'N/A',
                    type: reservation.room?.type || 'Tipo no disponible'
                },
                startDate: reservation.startDate,
                endDate: reservation.endDate,
                employee: {
                    name: reservation.employee?.name || 'N/A'
                },
                total: reservation.total,
                status: reservation.status
            }
        })

        res.json(mapReces);

    } catch (error) {
        console.error('Error al obtener los datos del dashboard:', error);
        res.status(500).json({ error: 'Error al obtener los datos del dashboard' });
    }
};