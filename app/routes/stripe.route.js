module.exports = app => {
    const stripe = require('../controllers/stripe.controller');
    var router = require('express').Router();
    
    // Create a new Payment Intent
    router.post('/create-payment-intent', stripe.createPaymentIntent);
    
    // Get Stripe public key
    //router.get('/public-key', stripe.getPublicKey);
    
    app.use('/api/stripe', router);
};