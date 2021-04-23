const express = require('express');
const router = express.Router();
const service = require('../services/user');
const authJwt = require('../middleware/authJwt');

// router.post('/add', authJwt.verifyToken, add);
router.get('/',  authJwt.verifyToken, getUserInfo);
// router.get('/:id', getById);
// router.patch('/:id', authJwt.verifyToken, update);
// router.delete('/:id', authJwt.verifyToken, _delete);
// router.get('/:id/event', getEvents);

module.exports = router;

function getUserInfo(req, res, next) {
    service.getUserInfo(req.userId)
        .then((data) => res.json(data))
        .catch(next);
}
