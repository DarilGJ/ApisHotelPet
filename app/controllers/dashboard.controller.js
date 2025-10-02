const db = require('../models');

exports.getDashboardData = async(req, res) => {
    try {
        const [totalCustomers, totalEmployees, totalRooms, totalReservations, activeReservations, availableRooms] = await Promise.all([
            db.customers.count(),
            db.employees.count(),
            db.rooms.count(),
            db.reserves.count(),
            db.reserves.count({ where: { status: 'confirmed' } }),
            db.rooms.count({ where: { availability: 'available' } })
        ]);
        
        res.json({
            totalCustomers,
            totalEmployees,
            totalRooms,
            totalReservations,
            activeReservations,
            availableRooms
        });

    } catch (error) {
        console.error('Error al obtener los datos del dashboard:', error);
        res.status(500).json({ error: 'Error al obtener los datos del dashboard' });
    }
};
