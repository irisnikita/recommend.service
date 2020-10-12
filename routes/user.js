// router
const express = require('express');
const userRouters = express.Router();
const AuthMiddleWare = require('../Middleware/AuthMiddleware');
const EmailController = require('../controllers/EmailController');
const FriendController = require('../controllers/FriendController');
const userModel = require('../model/user');
const User = require('../model/user.model');
const {verifyToken} = require('../helpers/jwt.helper');
const bcrypt = require('bcrypt');
const { mailRegisterSucces } = require('../node_mailer');
const {login, register, findOne, update, getTransactions} = require('../controllers/AuthController');

// AppConfig
const appConfig = require('../constant');

const userRoute = (app) => {

    userRouters.post('/login', login)

    userRouters.post('/register', register);

    userRouters.use(AuthMiddleWare.isAuth);

    userRouters.put('/update/:id?', update)

    userRouters.post('/validate', async (req, res) => {
        const { token } = req.query;

        const data = await verifyToken(token, appConfig.ACCESS_TOKEN_SECERET);

        User.findById(data.data.id).exec((err, results) => {
            const newUser = {
                avatar: results.avatar,
                id: results.id,
                fullName: results.fullName,
                sex: results.sex,
                userName: results.userName,
                email: results.email,
                phoneNumber: results.phoneNumber,
                province: results.province,
                address: results.address,
                transactions: results.transactions ? results.transactions.length : 0
            }
            if(!err) {
                if (results) {
                    res.send({
                        status: res.statusCode,
                        message: 'Validate success',
                        data: {
                            user: newUser,
                            status: 1
                        }
                    })
                } else {
                    res.send({
                        message: 'Failed token'
                    })
                }
            }
        })
    })

    userRouters.get('/get-user/:id?', findOne)

    userRouters.get('/transactions', getTransactions)
    // userRouters.get('/friends', FriendController.friendLists);

    app.use('/user', userRouters);
}

module.exports = userRoute;