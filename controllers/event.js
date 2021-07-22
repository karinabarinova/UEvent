const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const service = require('../services/event');
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

router.get('/search', search);
router.post('/add', authJwt.verifyToken, add);
router.get('/', getAll);
router.get('/:id', getById);
router.patch('/:id', authJwt.verifyToken, update);
router.delete('/:id', authJwt.verifyToken, _delete);
router.post('/:id/comment/add', authJwt.verifyToken, addComment);
router.patch('/:id/comment/:commentId/', authJwt.verifyToken, updateComment);
router.delete('/:id/comment/:commentId/', authJwt.verifyToken, deleteComment);
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

function search(req, res, next) {
    service.search(req.query)
        .then(data => res.status(200).json(data))
        .catch(next);
}

function add(req, res, next) {
    service.add(req.body, req.userId)
        .then((data) => res.status(200).json({ data, message: "Event created successfully"}))
        .catch(next);
}

function addComment(req, res, next) {
    service.addComment(req.body, req.userId, req.params.id)
        .then((data) => res.status(200).json({ data, message: "Comment created successfully"}))
        .catch(next);
}

function update(req, res, next) {
    service.update(req.body, req.params.id)
        .then((data) => res.status(200).json({data, message: "Event updated successfully"}))
        .catch(next);
}

function updateComment(req, res, next) {
    service.updateComment(req.body, req.params.id, req.params.commentId)
        .then((data) => res.status(200).json({data, message: "Comment updated successfully"}))
        .catch(next);
}


function _delete(req, res, next) {
    service.delete(req.params.id)
        .then(() => res.status(200).json({ message: "Event deleted successfully"}))
        .catch(next);
}

function deleteComment(req, res, next) {
    service.deleteComment(req.params.id, req.params.commentId)
        .then(() => res.status(200).json({ message: "Comment deleted successfully"}))
        .catch(next);
}

function newImage(req, res, next) {
    service.newImage(req.file, req.params.id)
        .then(data => res.status(200).json(data))
        .catch(next);
}
