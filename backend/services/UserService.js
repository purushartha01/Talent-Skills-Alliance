const UserModel = require("../model/User")

const createNewUser = async (username, email, password) => {
    const createdUser = await UserModel.create({ username, email, password });
    if (!createdUser) return false;
    console.log("created user: ", createdUser);
    return true;
}

const findUserByUsername = async (username) => {
    return await UserModel.findOne({ username: username });
}

const findUserByEmail = async (email) => {
    return await UserModel.findOne({ email: email });
}

const findAllUsers = async () => {
    return await UserModel.find();
}

const userExists = async (email) => {
    const user = await UserModel.findOne({ email: email });
    return user;
}

module.exports = {
    findAllUsers, findUserByEmail, findUserByUsername, userExists, createNewUser
}