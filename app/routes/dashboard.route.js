module.exports = app => {
    const dashboard = require('../controllers/dashboard.controller');
    const recentReservation = require('../controllers/recentReservation.controller')
    var router = require('express').Router();
    //Get Dashboard Data
    router.get('/stats', dashboard.getDashboardData);
    //Get Recent Reserves
    router.get('/recent-reservations',recentReservation.getRecentReservation);
    
    app.use('/api/dashboard', router);
};