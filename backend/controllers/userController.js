const UserModel = require("../model/User");
const { removeUserById } = require("../services/UserService");

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

const updateUserProfile = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        next(err);
    }
}

const removeUser = async (req, res, next) => {
    try {
        const userID = req.params.userID;
        if (!userID) {
            res.locals.statusCode = 422;
            throw new Error("Request data not provided.");
        }
        console.log("User to be removed: ",userID);
        const removedUser= await removeUserById(userID);
        res.status(200).json({status:'success',message:'User account removed successfully!'});
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = {
    getUserProfile, updateUserProfile, removeUser
}