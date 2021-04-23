const express = require('express');
const router = express.Router();
const service = require('../services/admin');
const authJwt = require('../middleware/authJwt');

router.post('/event/:id', [authJwt.verifyToken, authJwt.isAdmin], hideEvent);
router.post('/comment/:id', [authJwt.verifyToken, authJwt.isAdmin], hideComment);
router.delete('/event/:id', [authJwt.verifyToken, authJwt.isAdmin], deleteEvent);
router.delete('/comment/:id', [authJwt.verifyToken, authJwt.isAdmin], deleteComment);

module.exports = router;

function hideEvent(req, res, next) {
    service.hideEvent(req.params.id)
        .then(() => res.json({message: 'Event has been hidden'}))
        .catch(next);
}

function hideComment(req, res, next) {
    service.hideComment(req.params.id)
        .then(() => res.json({message: 'Comment has been hidden'}))
        .catch(next);
}

function deleteEvent(req, res, next) {
    service.deleteEvent(req.params.id)
        .then(() => res.json({message: 'Event has been deleted'}))
        .catch(next);
}

function deleteComment(req, res, next) {
    service.deleteComment(req.params.id)
        .then(() => res.json({message: 'Comment has been deleted'}))
        .catch(next);
}