const ProjectModel = require("./../model/Project");
const ProposalModel = require("./../model/Proposal");
const ReviewModel = require("./../model/Review");



const getAllProjects = async (req, res, next) => {

    try {
        const userId = req.currUserId; // Extract user ID from the request object

        const foundProposedProjects = await ProjectModel.find({
            $and: [
                { teamLeader: userId }
            ]
        })
            .populate('teamLeader', 'username email about id')
            .populate('members', 'username email about id');

        const foundOtherProjects = await ProjectModel.find({
            $and: [
                { members: { $in: [userId] } },
                { teamLeader: { $ne: userId } } // Exclude projects where the user is the team leader
            ]
        })
            .populate('members', 'username email about id')
            .populate('teamLeader', 'username email about id');


        const foundReviewsGiven = await ReviewModel.find({
            $and: [
                { reviewBy: userId }
            ]
        })
            .populate('forProject', 'projectTitle id')
            .populate('reviewFor', 'username email about id')
            .populate('reviewedOn', 'username email about id');


        console.log("Found Reviws by user: ", foundReviewsGiven);
        // const allProjects = [...foundProposedProjects, ...foundOtherProjects];
        // TODO check when adding new projects addition of team leader in members array now provides all project in the "foundOtherProjects" array

        res.status(200).json({ success: true, allProjects: foundOtherProjects, foundProposedProjects, foundReviewsGiven });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getProjectById = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId).populate('user', 'name email'); // Populate user details
        if (!project) {
            res.locals.statusCode = 404;
            throw new Error("Project not found");
        }
        res.status(200).json({ success: true, data: project });
    } catch (error) {

        console.log(error);
        next(error);
    }
}

const completeProjectCreation = async (req, res, next) => {
    try {
        const { proposalId } = req.body;

        const foundProject = await ProjectModel.findOne({ associatedWith: proposalId }); // Find the project by ID
        if (!foundProject) {
            res.locals.statusCode = 404; // Not Found
            throw new Error("Project not found, please recreate a new proposal.");
        }

        const foundProposal = await ProposalModel.findById(proposalId);

        if (!foundProposal) {
            res.locals.statusCode = 404; // Not Found
            throw new Error("Proposal not found.");
        }

        foundProject.members = [...foundProposal.applicants.filter((applicant) => applicant.status === "accepted").map((applicant) => applicant.applicant), foundProposal?.author];
        foundProject.startedOn = Date.now();
        foundProject.completedOn = null;
        foundProject.status = "ongoing";

        console.log("Found Members: ", foundProject.members, foundProject);

        // await foundProject.save();

        const updatedProposal = await ProposalModel.findByIdAndUpdate(proposalId, { proposalStatus: "closed" }, { new: true });
        if (!updatedProposal) {
            res.locals.statusCode = 404; // Not Found
            throw new Error("Proposal not found.");
        }

        await foundProject.save(); // Save the updated project

        res.status(201).json({ success: true, data: foundProject });
    } catch (error) {
        console.log(error);
        next(error);
    }
}


const addReviewForMember = async (req, res, next) => {
    try {
        const { reviewData } = req.body;

        console.log("Review Data: ", reviewData);

        // Find the project by ID
        const foundProject = await ProjectModel.findById(reviewData.forProject);
        if (!foundProject) {
            res.locals.statusCode = 404; // Not Found
            throw new Error("Project not found.");
        }

        const foundMember = foundProject.members.find((member) => member._id.toString() === reviewData.reviewFor);
        if (!foundMember) {
            res.locals.statusCode = 404;
            throw new Error("Member not found in the project.");
        }

        const foundReview = await ReviewModel.findOne(
            {
                $and: [
                    { reviewFor: reviewData.reviewFor },
                    { forProject: reviewData.forProject },
                    { reviewBy: reviewData.reviewBy }
                ]
            }
        );


        if (foundReview) {
            foundReview.review = reviewData.review;
            foundReview.isProcessed = false;
            console.log("Found Edited: ", foundReview);
            await foundReview.save();
        } else {


            const reviewCreated = new ReviewModel({
                review: reviewData.review,
                reviewFor: reviewData.reviewFor,
                reviewBy: reviewData.reviewBy,
                reviewedOn: reviewData.reviewedOn,
                forProject: reviewData.forProject,
            });

            console.log("Review Created: ", reviewCreated);

            await reviewCreated.save();
        }

        res.status(200).json({ success: true, message: "Review added successfully." });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}


const changeProjectStatus = async (req, res, next) => {

    try {
        const { projectId, newStatus } = req.body;

        // Find the project by ID
        const foundProject = await ProjectModel.findById(projectId);
        if (!foundProject) {
            res.locals.statusCode = 404; // Not Found
            throw new Error("Project not found.");
        }
        // Update the project status

        foundProject.status = newStatus;

        if (newStatus === "completed") {
            foundProject.completedOn = Date.now(); // Set the completed date
        }

        console.log("Found Project: ", foundProject);
        await foundProject.save();

        res.status(200).json({ success: true, message: "Project status updated successfully." });

    } catch (error) {
        console.log(error);
        next(error);
    }
}




module.exports = {
    getAllProjects,
    getProjectById,
    completeProjectCreation,
    addReviewForMember,
    changeProjectStatus
};