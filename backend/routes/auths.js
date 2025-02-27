const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.route('/login')
    .post(authController.loginActionHandler)

authRouter.route('/register')
    .post(authController.signupActionHandler);

module.exports = authRouter;