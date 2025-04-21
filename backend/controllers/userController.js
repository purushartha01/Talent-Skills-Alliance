const UserModel = require("../model/User");
const { removeUserById } = require("../services/UserService");
const ImageKit = require("imagekit");
const { imagKitPublicKey, imagKitPrivateKey, imagKitUrlEndpoint } = require("../config/serverConfig");
const { returnNonSensitiveData } = require("../utitlity/utitlityFunctions");


const imagekit = new ImageKit({
    publicKey: imagKitPublicKey,
    privateKey: imagKitPrivateKey,
    urlEndpoint: imagKitUrlEndpoint
})



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
        if (!req.body || Object.keys(req.body).length === 0) {
            res.locals.statusCode = 422;
            throw new Error("Request data not provided.");
        }
        const { id, dataToUpdate } = req.body;

        console.log("User to be updated: ", req.body);
        console.log("Data to be updated: ", dataToUpdate);

        let updatedUser = await UserModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
        if (!updatedUser) {
            console.log(updatedUser);
            res.locals.statusCode = 404;
            throw new Error("User not Found!");
        }
        updatedUser = returnNonSensitiveData(updatedUser.toObject())
        console.log("Updated user: ", updatedUser);
        res.status(200).json({ status: 'success', message: 'User profile updated successfully!', updatedUser });

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
        console.log("User to be removed: ", userID);
        const removedUser = await removeUserById(userID);
        res.status(200).json({ status: 'success', message: 'User account removed successfully!' });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const getImageKitAuth = async (req, res, next) => {
    try {
        const authData = await imagekit.getAuthenticationParameters();
        console.log("Img AuthData: ", authData);
        res.status(200).json({ status: 'success', authData });
    } catch (err) {
        console.log(err);
        next(err);
    }
}


module.exports = {
    getUserProfile, updateUserProfile, removeUser, getImageKitAuth
}