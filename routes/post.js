// router
const express = require('express');
const postRouters = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');

// Controler
const { createPost, listPost, getPaths, findPost, findByUser, deletePost, updateStatus, updatePost, searchPost } = require('../controllers/Posts');

const postRouter = (app) => {

    postRouters.get('/get-list', listPost);

    postRouters.get('/get-paths', getPaths);

    postRouters.get('/get-post-user', authMiddleware.isAuth, findByUser);

    postRouters.get('/get-post/:id?', findPost);

    postRouters.get('/search-post', searchPost);

    postRouters.use(authMiddleware.isAuth);

    postRouters.post('/create', createPost);

    postRouters.delete('/delete/:id?', deletePost);

    postRouters.put('/update/:id?', updateStatus);

    postRouters.put('/update-post/:id?', updatePost);

    app.use('/post', postRouters);
};

module.exports = postRouter;
