module.exports = app => {
    const rooms = require('../controllers/room.controller');
    var router = require('express').Router();
    //Create a new Room
    router.post('/create', rooms.create);
    //Retrieve all Rooms
    router.get('/', rooms.findAll);
    //Retrieve a single Room with id
    router.get('/:id/room', rooms.findOne);
    //Update a Room with id
    router.put('/:id/update', rooms.update);
    //Delete a Room with id
    router.delete('/:id/delete', rooms.delete);

    app.use('/api/rooms', router);
};