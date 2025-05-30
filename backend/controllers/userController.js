const UserModel = require("../model/User");
const { removeUserById } = require("../services/UserService");
const ImageKit = require("imagekit");
const { imagKitPublicKey, imagKitPrivateKey, imagKitUrlEndpoint } = require("../config/serverConfig");
const { returnNonSensitiveData } = require("../utitlity/utitlityFunctions");
const ProposalModel = require("../model/Proposal");
const ProjectModel = require("../model/Project");
const ReviewModel = require("../model/Review");


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

const getUserById = async (req, res, next) => {
    try {
        console.log('within getUserProfile() method: \n');

        const id = req.params.id;

        console.log("User ID: ", id);

        const currUser = await UserModel.findById(id).select('-password');

        const userProjects = await ProjectModel.find({ teamLeader: id });

        const projectsOfUser = await ProjectModel.find({ teamMembers: { $elemMatch: { member: id } } });

        const reviewsForUser = await ReviewModel.find({ reviewFor: id })
            .populate('reviewBy', 'username email id about')
            .populate('forProject', 'projectTitle id')
            .sort({ createdAt: -1 });

        let performanceRating = 0;
        if (reviewsForUser.length > 0) {
            performanceRating = reviewsForUser.reduce((acc, review) => acc + review.rating, 0) / reviewsForUser.length;
        }


        const userData = {
            currUser,
            userProjects,
            projectsOfUser,
            reviewsForUser,
            performanceRating
        }

        res.status(200).json({ message: 'success', userData });
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
        console.log("User ID: ", id);
        if (!id) {
            res.locals.statusCode = 422;
            throw new Error("id is not provided.");
        }
        if (!dataToUpdate || Object.keys(dataToUpdate).length === 0) {
            res.locals.statusCode = 422;
            throw new Error("id data not provided.");
        }

        console.log("User to be updated: ", req.body);
        console.log("Data to be updated: ", { ...dataToUpdate });

        let updatedUser = await UserModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
        console.log("Updated user: ", updatedUser);
        if (!updatedUser) {
            console.log(updatedUser);
            res.locals.statusCode = 404;
            throw new Error("User could not be updated!");
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

const getAllProposals = async (req, res, next) => {
    try {
        const foundProposals = await ProposalModel.find()
            .populate('author', 'username email id about')
            .populate({
                path: 'applicants',
                populate: {
                    path: 'applicant',
                    select: 'username email id about'
                }
            })
            .sort({ createdAt: -1 });

        const foundSavedProposals = await UserModel.findById(req.currUserId, { savedProposals: 1 })
            .populate({
                path: 'savedProposals',
                populate: [
                    { path: 'author', select: 'username email id about' },
                    {
                        path: 'applicants', populate: {
                            path: 'applicant',
                            select: 'username email id about'
                        }
                    }
                ]
            });

        console.log("Found proposals: ", foundProposals, "\nsavedProposals: ", foundSavedProposals);
        const savedProposals = foundSavedProposals.savedProposals
        res.status(200).json({ status: 'success', message: 'Proposals fetched successfully!', foundProposals, savedProposals });

    } catch (err) {
        console.log(err);
        next(err);
    }
}


const createProposal = async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            res.locals.statusCode = 422;
            throw new Error("Request data not provided.");
        }

        const { formData } = req.body;
        console.log("Proposal to be created: ", formData);

        const newProposal = await ProposalModel.create(formData);

        if (!newProposal) {
            res.locals.statusCode = 422;
            throw new Error("Proposal could not be created!");
        }
        const updateUserProposal = await UserModel.findByIdAndUpdate(req.currUserId, { $push: { proposals: newProposal._id } }, { new: true });
        if (!updateUserProposal) {
            res.locals.statusCode = 422;
            throw new Error("Proposal could not be created!");
        }

        const createdProject = await ProjectModel.create({
            projectTitle: formData.proposalTitle,
            teamLeader: req.currUserId,
            projectDescription: formData.proposalDescription,
            skillsUsed: formData.skillsRequired,
            timeCommitment: formData.timeCommitment,
            associatedWith: newProposal._id,
        })

        if (!createdProject) {
            res.locals.statusCode = 422;
            throw new Error("Project could not be created!");
        }

        res.status(201).json({ status: 'success', message: 'Proposal created successfully!' });

    } catch (err) {
        console.log(err);
        next(err);
    }
}

const changeProposalStatus = async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            res.locals.statusCode = 422;
            throw new Error("Request data not provided.");
        }
        const { proposalID, applicantID, status } = req.body;
        console.log("Proposal to be updated: ", proposalID);
        console.log("Applicant to be updated: ", applicantID);
        console.log("Status to be updated: ", status);

        const foundProposal = await ProposalModel.findByIdAndUpdate(proposalID, {
            $set: {
                "applicants.$[applicant].status": status
            }
        }, {
            arrayFilters: [{ "applicant.applicant": applicantID }],
            new: true
        });

        if (!foundProposal) {
            res.locals.statusCode = 422;
            throw new Error("Proposal could not be updated!");
        }
        res.status(200).json({ status: 'success', message: 'Proposal updated successfully!' });

    }
    catch (err) {
        console.log(err);
        next(err);
    }
}


const deleteProposal = async (req, res, next) => {
    try {
        const proposalID = req.params.id;
        console.log("Proposal to be deleted: ", proposalID);
        if (!proposalID) {
            res.locals.statusCode = 422;
            throw new Error("Request data not provided.");
        }

        // TODO: add logic to delete proposal

        const foundProposal = await ProposalModel.findByIdAndDelete(proposalID);
        if (!foundProposal) {
            res.locals.statusCode = 422;
            throw new Error("Proposal could not be deleted!");
        }


        const foundProject = await ProjectModel.findOneAndDelete({ associatedWith: proposalID });
        if (!foundProject) {
            res.locals.statusCode = 422;
            throw new Error("Associated project could not be deleted!");
        }

        const updatedUser = await UserModel.findByIdAndUpdate(req.currUserId, { $pull: { proposals: proposalID } }, { new: true });
        if (!updatedUser) {
            res.locals.statusCode = 422;
            throw new Error("Proposal could not be deleted!");
        }
        res.status(200).json({ status: 'success', message: 'Proposal deleted successfully!' });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const saveProposal = async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            res.locals.statusCode = 422;
            throw new Error("Request data not provided.");
        }
        const { proposalID } = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(req.currUserId, { $addToSet: { savedProposals: proposalID } }, { new: true });
        if (!updatedUser) {
            res.locals.statusCode = 422;
            throw new Error("Proposal could not be saved!");
        }
        res.status(200).json({ status: 'success', message: 'Proposal saved successfully!' });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const unsaveProposal = async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            res.locals.statusCode = 422;
            throw new Error("Request data not provided.");
        }
        const { proposalID } = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(req.currUserId, { $pull: { savedProposals: proposalID } }, { new: true });
        if (!updatedUser) {
            res.locals.statusCode = 422;
            throw new Error("Proposal could not be unsaved!");
        }
        res.status(200).json({ status: 'success', message: 'Proposal unsaved successfully!' });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const applyProposal = async (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            res.locals.statusCode = 422;
            throw new Error("Request data not provided.");
        }
        const { proposalID, appliedOn } = req.body;
        const foundProposal = await ProposalModel.findById(proposalID);
        if (!foundProposal) {
            res.locals.statusCode = 422;
            throw new Error("Proposal not found!");
        }

        const alreadyApplied = foundProposal.applicants.some((applicant) => applicant.applicant.toString() === req.currUserId.toString());

        if (alreadyApplied) {
            res.locals.statusCode = 422;
            throw new Error("You have already applied for this proposal!");
        }
        const applyToProposal = await ProposalModel.findByIdAndUpdate(proposalID, {
            $addToSet: {
                applicants: {
                    applicant: req.currUserId,
                    appliedOn: appliedOn
                }
            }
        }, { new: true });
        console.log("applyToProposal: ", applyToProposal);

        if (!applyToProposal) {
            res.locals.statusCode = 422;
            throw new Error("Proposal could not be applied!");
        }
        res.status(200).json({ status: 'success', message: 'Proposal applied successfully!' });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const getUserProposals = async (req, res, next) => {
    try {
        console.log("within getUserProposals() method: \n");
        const userID = req.currUserId;
        if (!userID) {
            res.locals.statusCode = 422;
            throw new Error("Request data not provided.");
        }
        // console.log("User to be fetched: ", userID);
        const foundUserProposals = await ProposalModel.find({ author: userID })
            .populate('author', 'username email id about')
            .populate({
                path: 'applicants',
                populate: { path: 'applicant', select: 'username email id about' }
            })
            .sort({ createdAt: -1 });

        // if (!foundUserProposals || foundUserProposals.length === 0) {
        //     res.locals.statusCode = 404;
        //     throw new Error("No proposals found!");
        // }
        // console.log("Found proposals: ", foundUserProposals);
        res.status(200).json({ status: 'success', message: 'Proposals fetched successfully!', foundUserProposals });

    } catch (err) {
        console.log(err);
        next(err);
    }
}


const getProposalById = async (req, res, next) => {
    try {
        const proposalID = req.params.id;
        if (!proposalID) {
            res.locals.statusCode = 422;
            throw new Error("Request data not provided.");
        }
        console.log("Proposal to be fetched: ", proposalID);
        const foundProposal = await ProposalModel.findById(proposalID)
            .populate('author', 'username email id about');
        const foundSavedProposals = await UserModel.findById(req.currUserId, { savedProposals: 1 })
        console.log("Found proposal: ", foundProposal);
        console.log("Found saved proposals: ", foundSavedProposals);
        if (!foundProposal) {
            res.locals.statusCode = 404;
            throw new Error("No proposals found!");
        }
        res.status(200).json({ status: 'success', message: 'Proposal fetched successfully!', foundProposal, foundSavedProposals });
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
    getUserProfile, updateUserProfile, removeUser, getImageKitAuth, getAllProposals, createProposal, deleteProposal, applyProposal, saveProposal, unsaveProposal, getUserProposals, getProposalById, getUserById, changeProposalStatus
}