const sendEmail = require('./sendMail')
const { Subscription, Event } = require('../sequelize/models');
const makeANiceEmail = require('./makeANiceEmail');

async function sendNotificationEmail({name, id}, email) {
    let message =  `<p>Don't forget you have subscribed to the event: ${name}
                    <p>It will start in less than 24 hours</p>
                    <p>Link to the event: http://localhost:3006/event/${id}</p>`

    await sendEmail({
        to: email,
        subject: 'UEvent Notification - Upcoming Event',
        html: makeANiceEmail(`${message}`)
    });
}

const findDifference = (date) => {
    const now = new Date(Date.now())
    const start = new Date(date)
    let findDiff = (start.getTime() - now.getTime()) / 1000;
    findDiff /= 60;
    return Math.abs(Math.round(findDiff));
}

//TODO: add startTime to Subscription
const notificationCron = async () => {
    const subs = await Subscription.findAll( {where: {send_notification: true}} ) //all subscription where send notification = true, once email sent we need to set it to false
    if (subs) {
        subs.forEach(async sub => {
            const diff = findDifference(sub.startDate)
            if (diff <= 1440) { //if event is in less than 24 hours
                const event = await Event.findOne({where: { id: sub.eventId}})
                await sendNotificationEmail(event, sub.email)
                sub.send_notification = false
                await sub.save()
            }
        })
    }
}

module.exports = notificationCron;