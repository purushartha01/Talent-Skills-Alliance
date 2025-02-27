const express = require('express');
const userController = require('./../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleWare');

const userRouter = express.Router();

userRouter.use(authMiddleware)


userRouter.route('/profile')
    .get(userController.getUserProfile)
    .post(userController.setUserProfile)
    .put(userController.updateUserProfile)

userRouter.route('/remove')
    .post(userController.removeUser);

module.exports = userRouter