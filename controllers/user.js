const express = require('express');
const router = express.Router();
const service = require('../services/user');
const upload = require('../helpers/upload')
const authJwt = require('../middleware/authJwt');
const stripePublicKey = process.env.STRIPE_PUBLISHABLE_KEY;

router.get('/',  authJwt.verifyToken, getUserInfo);
router.get('/cart', authJwt.verifyToken, getCart);
router.post('/purchase', authJwt.verifyToken, purchase);
router.post('/change-password', authJwt.verifyToken, changePasswordInAccount)
router.post('/change-email', authJwt.verifyToken, changeEmailInAccount)
router.post('/:id/upload-avatar', authJwt.verifyToken, uploadUserAvatar, upload.single('image'))
router.get('/orders', authJwt.verifyToken, getOrders);
//TODO: edit/getByID subscriptions

module.exports = router;

function getUserInfo(req, res, next) {
    service.getUserInfo(req.userId)
        .then((data) => res.json(data))
        .catch(next);
}

function getOrders(req, res, next) {
    service.getOrders(req.userId)
        .then((data) => res.json(data))
        .catch(next);
}

function getCart(req, res, next) {
    res.json({
        stripePublicKey
    })
}

function purchase(req, res, next) {
    //we should get an array of objects to be purchased 
    //{id, price, quantity}
    const {items, token, userId} = req.body;
    // service.purchase(req.userId, items, token)
    service.purchase(userId, items, token)
        .then(() => res.json({message: 'Successfully purchased event(s)'}))
        .catch(next);
}

function uploadUserAvatar (req, res, next) {

    console.log("user id")
    console.log(req.userId)
    service.updateUserAvatar(req.userId, req.file.filename)
        .then(() => res.json({ message: 'Successfully upload avatar'}))
        .catch((next))
}

function changePasswordInAccount (req, res, next) {
    service.changePassword(req.userId,  req.body.password)
        .then(() => res.json({ message: 'Password updated successfully' }))
        .catch(next);
}

function changeEmailInAccount (req, res, next) {
    service.changeMail(req.userId,  req.body.email)
        .then(() => res.json({ message: 'Email updated successfully' }))
        .catch(next);
}
