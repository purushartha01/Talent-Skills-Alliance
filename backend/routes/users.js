const express = require('express');
const userController = require('./../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleWare');

const userRouter = express.Router();

userRouter.use(authMiddleware)


userRouter.route('/profile')
    .get(userController.getUserProfile)
    .put(userController.updateUserProfile)


userRouter.route('/remove/:userID')
    .delete(userController.removeUser);


//TODO: add view profile controller handler
userRouter.route('/view/:id');

module.exports = userRouter;