const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.route('/login')
    .post(authController.loginActionHandler)

authRouter.route('/register')
    .post(authController.signupActionHandler);


authRouter.route('/verify').post(authController.handleOTPVerification);
authRouter.route('/generate').post(authController.generateOTP);
authRouter.route('/remove').post(authController.removeOTP);


authRouter.route('/forgot').post(authController.forgotPasswordActionHandler);


module.exports = authRouter;