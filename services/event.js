const db = require('../sequelize/models');
const Event = db.event;
const User = db.user;
const Company = db.company;
const Comment = db.comment;
const Theme = db.theme;
const Op = db.Sequelize.Op;

module.exports = {
    getAll,
    getById,
    add,
    update,
    delete: _delete,
    addComment,
    updateComment,
    getAllComments,
    deleteComment
}

async function getAll(query) { //currently show only upcoming events
    const options = {
        order: [['startDate', 'ASC']],
        where: {}
    }
    if (query.theme) {
        options.where.theme = query.theme;
    }
    if (query.date) //should be anything in the date to show upcoming event
        options.where.startDate = {[Op.gt]: Date.now()}
    return await Event.findAll(options);
}

async function getAllComments(id) {
    return await getEvent(id).getComments();
}

async function getById(id) {
    const event = await getEvent(id);
    return {
        event,
        organizer: await event.getCompanies()
    }
}

async function add({name, description, startDate, location, price, promoCodes, theme}, id) {
    //startDate time format  "2021-06-11T14:00Z",
    const user = await User.findByPk(id);
    if (!user.hasCompanies) {
        throw 'Create a company to be able to create events';
    }
    // const company = await user.getCompanies();
    const company = await Company.findOne({where: {owner: id}})
    const exists = await Event.findOne({
        where: {
            name
        }
    })
    if (exists)
        throw 'Event already exists';
    
    const foundTheme = await findOrCreateTheme(theme);

    //first latitude, then longitude
    const point = {
        type: 'Point',
        coordinates: location
    }
    const event = await Event.create({
        name,
        description,
        startDate,
        location: point,
        price,
        promoCodes,
        organizer: company.companyId,
        theme
    });

    await company.addEvent(event);
    await foundTheme.addEvent(event);
    return event; //add organizer info
}

async function addComment({ body }, userId, eventId) {
    const event = await Event.findOne({
        where: {
            eventId
        }
    })

    if (!event)
        throw 'Event not found';
    
    const comment = await Comment.create({
        body,
        author: userId,
        eventId
    })
    await event.addComment(comment);
    console.log(event.get());
    return event; // what should be really returned?
}

async function update(params, id) {
    const exists = await Event.findOne({
        where: {
            name: params.name
        }
    })
    if (exists)
        throw 'Event already exists';
    const event = await getEvent(id);
    Object.assign(event, params);
    await event.save();
    return event.get(); //do I really need it?
}

async function updateComment(params, eventId, commentId) {
    const event = await getEvent(eventId)
    
    if (!event)
        throw 'Event not found';
    const comment = await getComment(commentId);
    Object.assign(comment, params);
    await comment.save();
    return comment.get(); //do I really need it?
}

async function _delete(id) {
    const event = await getEvent(id);
    await event.destroy();
}

async function deleteComment(eventId, commentId) {
    const event = await getEvent(eventId)
    
    if (!event)
        throw 'Event not found';
    const comment = await getComment(commentId);
    await comment.destroy();
}

async function findOrCreateTheme(name) {
    let foundTheme = await Theme.findOne({where: {name}});
    if (!foundTheme) {
        foundTheme = await Theme.create({ name })
    }
    return foundTheme;//do I need that?
}

async function getEvent(id) {
    const event = await Event.findByPk(id);
    if (!event) throw 'Event not found';
    return event;
}

async function getComment(id) {
    const comment = await Comment.findByPk(id);
    if (!comment) throw 'Comment not found';
    return comment;
}