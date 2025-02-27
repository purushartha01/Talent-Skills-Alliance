const UserModel = require("../model/User");
const { userExists, createNewUser } = require("../services/UserService");

const loginActionHandler = async (req, res, next) => {
    try {

        console.log("LOGIN ROUTE!");

        res.send("Done");
    } catch (err) {
        console.log(err);
        next(err);
    }

}


//TODO:implement account verification feature
const signupActionHandler = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0 || !req.body.username || !req.body.email || !req.body.password) {
            res.locals.statusCode = 422;
            throw new Error("Request body or its members not found");
        }
        const { username, email, password } = req.body;
        console.log(`\nusername: ${username} \nemail:${email} \npassword: ${password}`);
        const doesUserExist = await userExists(email);
        if (doesUserExist) {
            res.locals.statusCode = 409;
            throw new Error("User already exists");
        }
        const newUser =await createNewUser(username, email, password);
        console.log("Boolean user created: ", newUser);
        if (newUser) {
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


module.exports = {
    loginActionHandler, signupActionHandler,
}