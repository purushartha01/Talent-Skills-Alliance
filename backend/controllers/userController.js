const UserModel = require("../model/User");

//TODO: basic logic completed, handling data from DB left.
const getUserProfile = async (req, res, next) => {
    try {
        console.log('within getUserProfile() method: \n');
        const id = req.currUserId;
        const currUser = await UserModel.findById(id).select('-password');
        console.log(`currUser: ${currUser}`);
        if (!currUser) {
            res.locals.statusCode = 404;
            throw new Error("User not Found!");
        }
        res.status(200).json({ message: 'success', currUser });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const setUserProfile = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        next(err);
    }
}


const updateUserProfile = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        next(err);
    }
}

const removeUser = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = {
    getUserProfile, setUserProfile, updateUserProfile, removeUser
}