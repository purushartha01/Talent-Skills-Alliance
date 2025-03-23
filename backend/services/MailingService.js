const nodemailer = require('nodemailer');
const { mailerID, mailerPassKey } = require('./../config/serverConfig');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailerID,
        pass: mailerPassKey
    },

});

const sendOTP = async (otp, recipientName, recipient) => {
    console.log("OTP passed: ", otp, "recipient: ", recipient);
    const isSent = await transporter.sendMail({
        from: mailerID,
        to: recipient,
        subject: "Verification OTP",
        html: `<p>Dear ${recipientName}, Your verification OTP is<b>${otp}</b></p><b>This mail is from Talent&Skills Alliance. If you have not registered or requested this mail, please ignore this mail and do not share this OTP with anyone else.</b>`
    }, (err) => {
        if (err) {
            return false
        }
    });

    return isSent;
}

const sendWelcomeMail = async (recipientName, recipient) => {

    const isSent = await transporter.sendMail({
        from: mailerID,
        to: recipient,
        subject: "Welcome to Talent&Skills Alliance",
        html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to TalentSkill Alliance</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px;
            background: #4CAF50;
            color: #ffffff;
            font-size: 24px;
            font-weight: bold;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
            font-size: 16px;
            color: #333;
        }
        .button {
            display: inline-block;
            padding: 12px 20px;
            margin: 20px 0;
            background: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            font-size: 18px;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        Welcome to TalentSkill Alliance!
    </div>
    <div class="content">
        <p>Hi <strong>${recipientName}</strong>,</p>
        <p>We’re excited to have you on board! 🎉</p>
        <p>With **TalentSkill Alliance**, you can find and collaborate with the right people for your projects quickly and efficiently.</p>
        <p>Here’s how to get started:</p>
        <ul style="text-align: left; display: inline-block;">
            <li>✅ Complete your profile to showcase your skills.</li>
            <li>✅ Create a project or apply to join a team.</li>
            <li>✅ Get rated and enhance your credibility.</li>
        </ul>
        <p>Click below to start your journey:</p>
        <a href="[LOGIN_LINK]" class="button">Get Started</a>
        <p>If you have any questions, feel free to reach out to our support team at <a href="mailto:support@talentskill.com">support@talentskill.com</a>.</p>
    </div>
    <div class="footer">
        &copy; 2025 TalentSkill Alliance | <a href="http://localhost:5173/">Visit our Website</a>
    </div>
</div>

</body>
</html>
`
    }, (err) => {
        if (err) return false
    });
    return isSent;
}

module.exports = {
    sendOTP, sendWelcomeMail
}