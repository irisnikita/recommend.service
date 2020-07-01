// router
const express = require('express');
const userRouters = express.Router();
const AuthMiddleWare = require('../Middleware/AuthMiddleware');
const EmailController = require('../controllers/EmailController');
const FriendController = require('../controllers/FriendController');
const userModel = require('../model/user');
const {verifyToken} = require('../helpers/jwt.helper');
const bcrypt = require('bcrypt');
const { mailRegisterSucces } = require('../node_mailer');
const {login, register, findOne} = require('../controllers/AuthController');

// AppConfig
const appConfig = require('../constant');

const userRoute = (app) => {

    userRouters.post('/login', login)

    userRouters.post('/register', register);

    userRouters.use(AuthMiddleWare.isAuth);

    // userRouters.get('/get-user/:id?', (req, res) => {
    //     const { id } = req.params;
    //     if (!id) {
    //         userModel.getAll((err, rows, fields) => {
    //             if (!err) {
    //                 res.send({
    //                     message: 'Get Users success',
    //                     status: res.statusCode,
    //                     data: {
    //                         users: rows
    //                     }
    //                 })
    //             }
    //             else {
    //                 res.send({
    //                     message: 'Can\'t get users',
    //                     error: err
    //                 })
    //             }
    //         })
    //     } else {
    //         userModel.get(id, (err, rows) => {
    //             if (!err) {
    //                 res.send({
    //                     message: 'Get user success',
    //                     status: res.statusCode,
    //                     data: {
    //                         user: rows[0]
    //                     }
    //                 })
    //             } else {
    //                 res.send({
    //                     message: 'Can\'t get user',
    //                     error: err
    //                 })
    //             }
    //         })
    //     }
    // })

    userRouters.post('/validate', async (req, res) => {
        const { token } = req.query;

        const data = await verifyToken(token, appConfig.ACCESS_TOKEN_SECERET);

        if (data.data) {
            res.send({
                status: res.statusCode,
                message: 'Validate success',
                data: {
                    user: data.data,
                    status: 1
                }
            })
        } else {
            res.send({
                message: 'Failed token'
            })
        }
    })

    userRouters.get('/get-user/:id?', findOne)

    // userRouters.get('/friends', FriendController.friendLists);

    app.use('/user', userRouters);
}

module.exports = userRoute;