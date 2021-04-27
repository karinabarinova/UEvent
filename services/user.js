const {User, Event, Subscription} = require('../sequelize/models');
const sendEmail = require('../helpers/sendMail');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);

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
    //example of data endpoint awaits
    // {
    //     "items": [
    //         {
    //             "id": 1,
    //             "price": 100,
    //             "quantity": 2
    //         },
    //         {
    //             "id": 3,
    //             "price": 100,
    //             "quantity": 1
    //         }
    //     ],
    //     "token": ""
    // }

    let amount = 0;
    const test_token = "tok_visa";
    items.forEach(item => {
        amount = amount + item.price * item.quantity
    });
    
    const paymentDetails = await stripe.charges.create({
        amount: amount * 100,
        source: test_token, //should be token
        currency: 'usd'
    })
    if (paymentDetails.status !== 'succeeded') {
        console.log("Payment details", paymentDetails);
        throw 'Failed payment';
    }
    const user = await User.findByPk(userId);
    items.forEach(async item => {
        const event = await Event.findByPk(item.id);
        await event.addUser(user);
        await user.addEvent(event); //maybe this step is not required
        console.log("Subscription prototype", Subscription.prototype)
        const sub = await Subscription.create({
            eventId: item.id,
            userId: user.id,
            orderId: paymentDetails.metadata.order_id,
            send_notification: true,
            email: user.email
            //send_notifications
        })
        await user.addSubscription(sub);
    })
    //add events to user
    //add user to events
    //add subscription to user
    //send email
    await sendSubscriptionEmail(user);
}

//helpers

async function sendSubscriptionEmail(user) {
    let message = `<p>Hey ${capitalizeFirstLetter(user.firstName)}, you've subscribed to a new event(s)</p>
                   <p></p>`;

    await sendEmail({
        to: user.email,
        subject: 'Successful Payment for =event=',
        html: `<h4>Successful Payment for =event=</h4>
               ${message}`
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }