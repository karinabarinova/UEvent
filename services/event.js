const db = require('../sequelize/models');
const { User, Event, Company,Comment,Theme, Format, ThemeEvents } = require('../sequelize/models');

const Op = db.Sequelize.Op;

module.exports = {
    getAll,
    getById,
    search,
    add,
    update,
    delete: _delete,
    addComment,
    updateComment,
    deleteComment,
    newImage
}

async function getAll(query) { //currently show only upcoming events
    const limit = 4;
    const options = {
        order: [['startDate', 'ASC']],
        where: {},
        limit,
        offset: query.page == 1 ? 0 : limit * query.page - limit
    }
    if (query.theme) {
        options.where.theme = query.theme;
    }
    if (query.format) {
        options.where.theme = query.format;
    }
    if (query.date) //should be anything in the date to show upcoming event
        options.where.startDate = {[Op.gt]: Date.now()}
    return await Event.findAndCountAll(options);
}

async function search(query) { //TODO: fix invalid return result
    if (query?.name.length) {
        const options = {
            where: {
                name: {
                    [Op.iLike]: '%' + query.name + '%'
                }
            }
        }
        return await Event.findAll({
            options
        })
    }
    return null;
}


async function getById(id) {
    const event = await getEvent(id);
    const organizer = await event.getCompanies();
    const company = await Company.findByPk(organizer[0].dataValues.id);
    const otherEvents = await company.getEvents({
        where: {
            name: {
                [Op.not]: event.name
            }
        }
    });
    const similarEvents = await Event.findAll({
        where: {
            [Op.or]: [
              { theme: event.theme },
              { format: event.format }
            ]
        }
    })

    return {
        event,
        organizer,
        comments: await event.getComments(),
        otherEvents,
        otherUsers: await event.getUsers(), //needs testing
        similarEvents //needs testing
    }
}

async function add({name, description, startDate, location, price, promoCodes, theme, format}, id) {
    const user = await User.findByPk(id);
    if (user.hasCompanies === false) {
        throw 'Create a company to be able to create events';
    }
    const company = await Company.findOne({where: {owner: id}})
    if (!company)
        throw 'Create a company to be able to create events';

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
    const event = await Event.create({
        name,
        description,
        startDate,
        location: point,
        price,
        promoCodes,
        organizer: company.id,
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

    const user = await User.findOne({ where: {id: userId}})
    
    const comment = await Comment.create({
        body,
        author: userId,
        name: user.fullName,
        eventId
    })
    await event.addComment(comment);
    return await getById(eventId);
}

async function update(params, id) {
    
    const event = await getEvent(id);

    if (params.location) {
        const point = {
            type: 'Point',
            coordinates: params.location
        }
        params.location = point;

    }
    Object.assign(event, params);

    await event.save();
    return event.get();
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
    const foundTheme = await findOrCreateTheme(event.dataValues.theme);
    const foundFormat = await findOrCreateFormat(event.dataValues.format);
    const foundCompany = await findCompany(event.dataValues.organizer);
    await foundTheme.removeEvent(event);
    await foundFormat.removeEvent(event);
    await foundCompany.removeEvent(event);
    await event.destroy()
}

async function deleteComment(eventId, commentId) {
    const event = await getEvent(eventId)
    
    if (!event)
        throw 'Event not found';
    const comment = await getComment(commentId);
    await comment.destroy();
}

async function newImage(file, id) {
    const event = await getEvent(id);
    if (!file) {
        throw 'No image provided'
    }
    event.image = file.path
    return await event.save();
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

async function findCompany(id) {
    let foundCompany = await Company.findOne({where: {id}});
    return foundCompany;
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