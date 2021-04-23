const db = require('../sequelize/models');
const Event = db.event;
const Comment = db.comment;

module.exports = {
    hideEvent,
    hideComment,
    deleteEvent,
    deleteComment
}
//TODO: needs testing
//TODO: do i need to unhide/show them again?

async function deleteEvent(eventId) {
    const event = await Event.findByPk(eventId);
    await event.destroy();
}

async function deleteComment(commentId) {
    const comment = await Comment.findByPk(commentId);
    await comment.destroy();
}

async function hideEvent(eventId) {
    const event = await Event.findByPk(eventId);
    event.hidden = true;
    await event.save();
}

async function hideComment(commentId) {
    const comment = await Comment.findByPk(commentId);
    comment.hidden = true;
    await comment.save();
}