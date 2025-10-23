const { secretKey, publicKey } = require('../config/stripe.config');
const Stripe = require('stripe');
const stripe = new Stripe(secretKey);

exports.createPaymentIntent = async (req, res) => {
    try {
        const { amount, currency = 'usd', description, metadata } = req.body;
        
        // Validar que el amount sea válido
        if (!amount || amount <= 0) {
            return res.status(400).json({
                error: 'Amount is required and must be greater than 0'
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convertir a centavos
            currency: currency,
            description: description || 'Payment for Hotel Pets service',
            metadata: metadata || {},
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({
            error: error.message,
        });
    }
};

// Endpoint para obtener la clave pública
exports.getPublicKey = (req, res) => {
    res.json({
        publicKey: publicKey
    });
};