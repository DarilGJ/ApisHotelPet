module.exports = app => {
	const users = require('../controllers/user.controller');
	//const { authenticateToken } = require('../middleware/auth');
	var router = require('express').Router();
	
	// Authentication routes
	router.post('/register', users.register);
	router.post('/login', users.login);
	
	// Protected routes
	//router.get('/profile', authenticateToken, users.getProfile);
	
	// Admin routes (existing CRUD operations)
	router.post('/create', users.create);
	router.get('/', users.findAll);
	router.get('/:id/user', users.findOne);
	router.put('/:id/update', users.update);
	router.delete('/:id/delete', users.delete);

    app.use('/api/users', router);
};