const jwt = require('jsonwebtoken');

// const UserModel = require("../model/User");
const { userExists, createNewUser, updateUserByEmail, findUserByEmail } = require("../services/UserService");
const { ACCESS_KEY, jwt_options_refresh, jwt_options_access, REFRESH_KEY, cookieOptionsAccess, cookieOptionsRefresh } = require('../config/serverConfig');
const { sendWelcomeMail, sendOTP } = require('../services/MailingService');
const OTPModel = require('../model/OTP');
const { generateUniqueOTP } = require('../utitlity/utitlityFunctions');

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
        const newUser = await createNewUser(username, email, password);
        let otpFound = await OTPModel.exists({ email });
        let isOTPCreated = undefined;
        if (!otpFound) {
            const otp = await generateUniqueOTP();
            console.log("OTP generated: ", otp);
            isOTPCreated = (await OTPModel.create({ email, otp })).save();
        }
        console.log("Boolean user created: ", newUser);
        if (newUser && isOTPCreated) {
            await sendWelcomeMail(username, email);
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
        if (Object.keys(req.body).length === 0 || !req.body.email) {
            res.locals.statusCode = 422;
            throw new Error("Request body or its members not found");
        }

        const { email } = req.body;

        let otpFound = await OTPModel.exists({ email });
        if (!otpFound) {
            const otp = await generateUniqueOTP();
            console.log('OTP: ', otp);
            otpFound = await OTPModel.create({ email, otp });
        }
        if (otpFound) {
            res.status(200).json({ status: 'success', message: 'OTP sent!' });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const handleOTPVerification = async (req, res, next) => {
    try {
        console.log('Verifying OTP');
        if (Object.keys(req.body).length === 0 || !req.body.otp || !req.body.email) {
            res.locals.statusCode = 422;
            throw new Error("Request body or its members not found");
        }

        const { otp, email } = req.body;

        console.log("OTP: ", typeof (otp), " email: ", email);

        const foundOTP = await OTPModel.find({ email }).sort({ createdAt: -1 }).limit(1);

        console.log("FOUND OTP: ", foundOTP[0]);

        if (!foundOTP[0]) {
            res.locals.statusCode = 404;
            throw new Error("OTP not found");
        }

        if (foundOTP[0].otp === otp) {
            const updatedUser = await updateUserByEmail({ email }, { isActivated: true }, { new: true });
            if(!updatedUser){
                res.locals.statusCode=500;
                throw new Error("Could not update user");
            }
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