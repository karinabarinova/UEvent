const db = require('../sequelize/models');
const Event = db.event;
const User = db.user;
const Company = db.company;
const Comment = db.comment;
const Theme = db.theme;
const Format = db.format;
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
    if (query.format) {
        options.where.theme = query.format;
    }
    if (query.date) //should be anything in the date to show upcoming event
        options.where.startDate = {[Op.gt]: Date.now()}
    return await Event.findAll(options);
}

async function getAllComments(id) { //may be deleted as comments are returned in the getById function
    return await getEvent(id).getComments();
}

async function getById(id) {
    const event = await getEvent(id);
    console.log(Event.prototype)
    const organizer = await event.getCompanies();
    console.log("organizer", organizer);
    const company = await Company.findByPk(organizer[0].dataValues.companyId);
    const otherEvents = await company.getEvents();

    return {
        event,
        organizer,
        comments: await event.getComments(),
        otherEvents
    }
}

async function add({name, description, startDate, location, price, promoCodes, theme, format}, id) { //format is null??
    //startDate time format  "2021-06-11T14:00Z",
    const user = await User.findByPk(id);
    if (!user.hasCompanies) {
        throw 'Create a company to be able to create events';
    }
    const company = await Company.findOne({where: {owner: id}})
    const exists = await Event.findOne({
        where: {
            name
        }
    })
    if (exists)
        throw 'Event already exists';

    const foundTheme = await findOrCreateTheme(theme);
    const foundFormat = await findOrCreateFormat(format);

    //first latitude, then longitude
    const point = {
        type: 'Point',
        coordinates: location
    }
    console.log("THEME prototype", Theme.associations)
    console.log("FORMAt prototype", Format.associations)
    console.log("EVENT prototype", Event.associations)

    console.log("theme", foundTheme);
    console.log("format", foundFormat);

    const event = await Event.create({
        name,
        description,
        startDate,
        location: point,
        price,
        promoCodes,
        organizer: company.companyId,
        theme,
        format
    });

    await company.addEvent(event);
    await foundTheme.addEvent(event);
    await foundFormat.addEvent(event);
    return event; //add organizer info
}

async function addComment({ body }, userId, eventId) {
    const event = await Event.findOne({
        where: {
            id: eventId
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
    return foundTheme;
}

async function findOrCreateFormat(name) {
    let foundFormat = await Format.findOne({where: {name}});
    if (!foundFormat) {
        foundFormat = await Format.create({ name })
    }
    return foundFormat;
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