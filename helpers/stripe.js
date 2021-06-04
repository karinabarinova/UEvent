const Stripe = require('stripe')

const stripeConfig = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: "2020-08-27",
});

module.exports = stripeConfig;

