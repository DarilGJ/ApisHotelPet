const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }
    // Create a User
    const user = {
        email: req.body.email,
        password: req.body.password,
        usertype: req.body.usertype,
        employeeId: req.body.employeeId,
        customerId: req.body.customerId,
        isActive: req.body.isActive,
        lastLogin: req.body.lastLogin
    };
    // Save User in the database
    User.create(user)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the User.',
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
    User.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving users.',
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving User with id=' + id,
            });
        });
};

// Update a User by the id in the request
    exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'User was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating User with id=' + id,
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'User was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete User with id=' + id,
            });
        });
};

// Register a new user
exports.register = async (req, res) => {
    try {
        const { email, password, usertype, employeeId, customerId } = req.body;

        // Validate required fields
        if (!email || !password || !usertype) {
            return res.status(400).json({
                message: 'Email, password and usertype are required'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email'
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const user = {
            email: email,
            password: hashedPassword,
            usertype: usertype,
            employeeId: employeeId || null,
            customerId: customerId || null,
            isActive: true
        };

        const newUser = await User.create(user);
        
        // Remove password from response
        const userResponse = {
            id: newUser.id,
            email: newUser.email,
            usertype: newUser.usertype,
            employeeId: newUser.employeeId,
            customerId: newUser.customerId,
            isActive: newUser.isActive,
            createdAt: newUser.createdAt
        };

        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Error registering user',
            error: error.message
        });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        // Find user by email
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(401).json({
                message: 'Account is deactivated'
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Update last login
        await user.update({ lastLogin: new Date() });

        //Generate JWT token
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                usertype: user.usertype 
            },
            process.env.JWT_SECRET || 'your-secret-key', // Use environment variable
            { expiresIn: '24h' }
        );

        // Remove password from response
        const userResponse = {
            id: user.id,
            email: user.email,
            usertype: user.usertype,
            employeeId: user.employeeId,
            customerId: user.customerId,
            isActive: user.isActive,
            lastLogin: user.lastLogin
        };

        res.json({
            message: 'Login successful',
            token: token,
            user: userResponse
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Error during login',
            error: error.message
        });
    }
};

// Get current user profile
// exports.getProfile = async (req, res) => {
//     try {
//         const userId = req.user.id; // From JWT middleware
        
//         const user = await User.findByPk(userId, {
//             attributes: { exclude: ['password'] }
//         });

//         if (!user) {
//             return res.status(404).json({
//                 message: 'User not found'
//             });
//         }

//         res.json({
//             user: user
//         });

//     } catch (error) {
//         console.error('Get profile error:', error);
//         res.status(500).json({
//             message: 'Error getting user profile',
//             error: error.message
//         });
//     }
// };