const QRCode = require('qrcode')
const {User, Event, Subscription, Order} = require('../sequelize/models');
const bcrypt = require('bcryptjs');
const sendEmail = require('../helpers/sendMail');
const makeANiceEmail = require('../helpers/makeANiceEmail');
const stripeConfig = require('../helpers/stripe');

module.exports = {
    getUserInfo,
    purchase,
    getOrders,
    changePassword,
    changeMail,
    uploadAvatar

}

//TODO: edit subscription - change send_notification status

async function getUserInfo(userId) {
    const user = await User.findByPk(userId);
    return {
        user: basicDetails(user),
        companies: await user.getCompanies(),
        events: await user.getEvents(),
        notifications: await user.getSubscriptions({
            where: {
                send_notification: true
            }
        })
    };
}

async function getOrders(userId) {
    const user = await User.findByPk(userId);
    const orders = await user.getOrders();
    return orders;
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
        //console.log(err);
        throw new Error(err.message);
    })

    // [ { name: 'UFC Live', price: 120, quantity: 1 } ]

    if (charge.status !== 'succeeded') {
         //console.log("Payment details", paymentDetails);
        throw 'Failed payment';
    }

    await items.forEach(async item => {
        const event = await Event.findByPk(item.id);
        await event.addUser(user);
        await user.addEvent(event); //maybe this step is not required

        const sub = await Subscription.create({
            eventId: item.id,
            userId: user.id,
            orderId: charge.created,
            send_notification: true,
            email: user.email,
            startDate: event.startDate
        })

        await user.addSubscription(sub);
    })

    const order = await Order.create({ 
        total: amount * 100,
        userId: user.id,
        charge: charge.id,
        items: JSON.stringify(items)
    })
    await user.addOrder(order);

    await sendSubscriptionEmail(user);
}

//helpers

async function sendSubscriptionEmail(user) {
    let message = `<p>Hey ${capitalizeFirstLetter(user.fullName)}, you've subscribed to a new event(s)</p>
                   <p></p>`;
    const QR = await QRCode.toDataURL(  "https://community.nodemailer.com/using-embedded-images/",  { errorCorrectionLevel: 'H' })

    await sendEmail({
        to: user.email,
        subject: `Successful Payment for an event `,
        html: makeANiceEmail(`<h4>Successful Payment for events: ==events==</h4>
        ${message} <br/> your QR code for event<br/> <img src= '${QR}'/>`)
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function basicDetails(user) {
    const { id, email, role, createdAt, updatedAt, fullName, profile_picture } = user;
    const fullNameArr = fullName.split(' ');
    const name = `${capitalizeFirstLetter(fullNameArr[0])} ${capitalizeFirstLetter(fullNameArr[1])}`
    return { id, email, role, createdAt, updatedAt, name,  profile_picture};
}

async function changePassword(id, password) {
    const user = await User.findOne({
        where: {
            id: id
        }
    })

    if (!user) throw 'Oops something wrong'

    if (password) {
        user.password = await hash(password)
        user.save()
    }
}

async function uploadAvatar (id, avatar) {
    const user = await User.findOne({
        where: {
            id: id
        }
    })
    console.log(user)
    if (!user) throw 'Oops something wrong'

    if (avatar) {
        user.profile_picture = avatar
        user.save()
    }
}

async function changeMail(id, email) {
    const user = await User.findOne({
        where: {
            id: id
        }
    })

    if (!user) throw 'Oops something wrong'

    if (email) {
        user.email = email;
        user.save()
    }
}

async function hash(password) {
    return await bcrypt.hash(password, 8);
}


