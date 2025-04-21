const OTPModel = require('../model/OTP');

const generateUniqueOTP = async () => {
    let otp = generateOTP();
    let optExists = await OTPModel.exists({ otp });
    while (optExists) {
        otp = generateOTP();
        optExists = await OTPModel.exists({ otp });
    }

    return otp;
}

const generateOTP = () => {
    return require('crypto').randomInt(100000, 1000000);
}

const returnNonSensitiveData = (user) => {
    const sensitiveData = ['password', 'createdAt', 'updatedAt', '__v'];
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !sensitiveData.includes(key))
    );
}

module.exports = { generateUniqueOTP,returnNonSensitiveData };