const mongoose = require('mongoose');
const { sendOTP } = require('../services/MailingService');


const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
});

otpSchema.pre("save", async function (next) {
    if (this.isNew) {
        console.log('Sending new OTP!');
        await sendOTP(this.otp, this.email);
    }
    console.log('Calling OTP middleware next()');
    next();
});

const OTPModel = mongoose.model("OTP", otpSchema);

module.exports = OTPModel;