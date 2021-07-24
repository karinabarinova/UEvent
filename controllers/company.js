const express = require('express');
const multer = require('multer')
const path = require('path')
const router = express.Router();
const service = require('../services/company');
const authJwt = require('../middleware/authJwt');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'resources/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

  
const upload = multer( {
    storage: storage,
    dest: 'resources/uploads',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return cb(new Error('Please upload an image'))
        cb(undefined, true)
    }
})

router.post('/add', authJwt.verifyToken, add);
router.get('/', getAll);
router.get('/:id', getById);
router.patch('/:id', authJwt.verifyToken, update);
router.delete('/:id', authJwt.verifyToken, _delete);
router.get('/:id/event', getEvents);
router.post('/:id/image', upload.single('image'), newImage);


module.exports = router;

function getAll(req, res, next) {
    service.getAll(req.query)
        .then(data => res.status(200).json(data))
        .catch(next);
}

function getById(req, res, next) {
    service.getById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(next);
}

function getEvents(req, res, next) {
    service.getEvents(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(next);
}

function add(req, res, next) {
    service.add(req.body, req.userId)
        .then((data) => res.status(200).json({ data, message: "Company created successfully"}))
        .catch(next);
}

function update(req, res, next) {
    service.update(req.body, req.params.id)
        .then((data) => res.status(200).json({data, message: "Company updated successfully"}))
        .catch(next);
}

function newImage(req, res, next) {
    service.newImage(req.file, req.params.id)
        .then(data => res.status(200).json(data))
        .catch(next);
}

function _delete(req, res, next) {
    service.delete(req.params.id)
        .then(() => res.status(200).json({ message: "Company deleted successfully"}))
        .catch(next);
}