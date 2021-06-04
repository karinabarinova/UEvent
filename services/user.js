const {User, Event, Subscription} = require('../sequelize/models');
const sendEmail = require('../helpers/sendMail');
const makeANiceEmail = require('../helpers/makeANiceEmail');
const stripeConfig = require('../helpers/stripe');
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// const stripe = require('stripe')(stripeSecretKey);

module.exports = {
    getUserInfo,
    purchase
}

//TODO: edit subscription - change send_notification status

async function getUserInfo(userId) {
    const user = await User.findByPk(userId);
    return {
        user,
        companies: await user.getCompanies(),
        events: await user.getEvents(),
        notifications: await user.getSubscriptions({
            where: {
                send_notification: true
            }
        })
    };
}

//TODO: allow company to create promocode with some discount, store the discount in database
//TODO: add promocode to the req.body
async function purchase(userId, items, token) {

    if (!userId) {
        throw new Error('Sorry! You must be signed in to create an order!');
    }

    const user = await User.findOne(
        { 
            where: {
                id: userId
            }
        }
    )

    //calculate the total price
    const amount = items.reduce(function(tally, item) {
        return tally + item.quantity * item.price
    }, 0);

    //create the charge with the stripe
    const charge = await stripeConfig.paymentIntents.create({
        amount: amount * 100,
        currency: 'USD',
        confirm: true,
        payment_method: token,
    }).catch(err => {
        console.log(err);
        throw new Error(err.message);
    })

    // [ { name: 'UFC Live', price: 120, quantity: 1 } ]

    if (charge.status !== 'succeeded') {
        console.log("Payment details", paymentDetails);
        throw 'Failed payment';
    }
    items.forEach(async item => {
        const event = await Event.findByPk(item.id);
        await event.addUser(user);
        await user.addEvent(event); //maybe this step is not required

        const sub = await Subscription.create({
            eventId: item.id,
            userId: user.id,
            orderId: charge.created,
            send_notification: true,
            email: user.email
            //send_notifications
        })
        await user.addSubscription(sub);
    })
    await sendSubscriptionEmail(user);
}

//helpers

async function sendSubscriptionEmail(user) {
    let message = `<p>Hey ${capitalizeFirstLetter(user.firstName)}, you've subscribed to a new event(s)</p>
                   <p></p>`;

    await sendEmail({
        to: user.email,
        subject: 'Successful Payment for =event=',
        html: makeANiceEmail(`<h4>Successful Payment for =event=</h4>
        ${message}`)
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }