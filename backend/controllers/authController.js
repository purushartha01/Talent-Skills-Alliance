const jwt = require('jsonwebtoken');

// const UserModel = require("../model/User");
const { userExists, createNewUser, updateUserByEmail, findUserByEmail } = require("../services/UserService");
const { ACCESS_KEY, jwt_options_refresh, jwt_options_access, REFRESH_KEY, cookieOptionsAccess, cookieOptionsRefresh } = require('../config/serverConfig');
const { sendWelcomeMail, sendOTP } = require('../services/MailingService');

const loginActionHandler = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0 || !req.body.email || !req.body.password) {
            res.locals.statusCode = 422;
            throw new Error("Request body or its members not found");
        }
        const { email, password } = req.body;
        console.log(`\nemail:${email} \npassword: ${password}`);
        const doesUserExist = await userExists(email);
        console.log(`DoesUserExist: ${doesUserExist}`);
        if (!doesUserExist) {
            res.locals.statusCode = 404;
            throw new Error("User not found");
        }
        const isPasswordCorrect = await doesUserExist.matchPassword(password);
        console.log(`isPasswordCorrect: ${isPasswordCorrect}`);
        if (!isPasswordCorrect) {
            res.locals.statusCode = 401;
            throw new Error("Incorrect Password or username");
        }
        if (!doesUserExist.isActivated) {
            res.locals.statusCode = 403;
            throw new Error("Account is not yet activated!");
        }
        const user = { id: doesUserExist.id, username: doesUserExist.username, email: doesUserExist.email };

        const accessToken = jwt.sign({ id: doesUserExist.id, email: doesUserExist.email }, ACCESS_KEY, jwt_options_access);
        const refreshToken = jwt.sign({ id: doesUserExist.id, email: doesUserExist.email }, REFRESH_KEY, jwt_options_refresh);
        res.cookie('AccessToken', accessToken, cookieOptionsAccess);
        res.cookie('RefreshToken', refreshToken, cookieOptionsRefresh);
        // console.log("LOGIN ROUTE!");
        res.status(200).json({ message: 'success', user, accessToken, refreshToken });
    } catch (err) {
        console.log(err);
        next(err);
    }

}



//TODO:implement email account verification feature
const signupActionHandler = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0 || !req.body.username || !req.body.email || !req.body.password) {
            res.locals.statusCode = 422;
            throw new Error("Request body or its members not found");
        }
        const { username, email, password } = req.body;
        console.log(`\nusername: ${username} \nemail:${email} \npassword: ${password}`);
        const doesUserExist = await userExists(email);
        console.log(`DoesUserExist: ${doesUserExist}`);
        if (doesUserExist) {
            res.locals.statusCode = 409;
            throw new Error("User already exists");
        }
        const otp = require('crypto').randomInt(100000, 1000000);
        console.log('OTP: ', otp);
        const OTPLife = new Date(Date.now() + 5 * 60 * 1000);
        const newUser = await createNewUser(username, email, password, otpData);
        console.log("Boolean user created: ", newUser);
        if (newUser) {
            const welcome = await sendWelcomeMail(username, email);
            const isOTPSent = await sendOTP(otp, username, email);
            console.log("OTP response: ", isOTPSent);
            const otpData = {
                currOTP: `${otp}`,
                validTill: OTPLife
            }
            if (!isOTPSent || !welcome) {
                res.locals.statusCode = 500;
                throw new Error('Verification OTP could not be sent');
            }

            res.status(200).json({ status: 'success', message: "Registration successfully completed!" })
        } else {
            res.locals.statusCode = 500;
            throw new Error("Failed to create new user");
        }
    } catch (err) {
        // console.log(err);
        next(err);
    }
}

const generateOTP = async (req, res, next) => {
    try {
        if (Object.keys().length === 0 || !req.body.email) {
            res.locals.statusCode = 422;
            throw new Error("Request body or its members not found");
        }
        const otp = require('crypto').randomInt(100000, 1000000);
        console.log('OTP: ', otp);
        const OTPLife = new Date(Date.now() + 5 * 60 * 1000);
        const updatedUser = await updateUserByEmail(email, {
            currOTP: `${otp}`,
            validTill: OTPLife
        })

        console.log("updatedUser: ", updatedUser)
        if (updatedUser) {
            res.status(200).json({ status: 'success', message: 'OTP sent!' });
        }

    } catch (err) {
        console.log(err);
        next(err);

    }
}

const handleOTPVerification = async (req, res, next) => {
    try {
        if (Object.keys().length === 0 || !req.body.otp || !req.body.email) {
            res.locals.statusCode = 422;
            throw new Error("Request body or its members not found");
        }

        const foundUser = await findUserByEmail(email);
        if (!foundUser) {
            res.locals.statusCode = 404;
            throw new Error("User not found");
        }
        //TODO:TEST THIS CASE, CHECK IF OTP EXPIRES OR NOT!
        if (!foundUser.otpData.validTill < Date.now()) {
            res.locals.statusCode = 408;
            throw new Error("OTP expired");
        }

        if (foundUser.otpData.currOTP === otp) {
            res.status(200).json({ status: 'success', message: 'OTP verified' })
        } else {
            res.locals.statusCode = 401;
            throw new Error("Wrong OTP");
        }

    } catch (err) {
        console.log(err);
        next(err);

    }
}

module.exports = {
    loginActionHandler, signupActionHandler, generateOTP, handleOTPVerification
}