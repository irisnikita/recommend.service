// router
const express = require('express');
const commentRouters = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');

// Controler
const {createComment, getComments} = require('../controllers/CommentController');

const commentRouter = (app) => {

    // commentRouters.use(authMiddleware.isAuth);

    commentRouters.post('/create', createComment);

    commentRouters.get('/get-comments', getComments);

    app.use('/comment', commentRouters);
};

module.exports = commentRouter;
