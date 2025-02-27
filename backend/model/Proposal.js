const mongoose = require('mongoose');


const ProposalSchema = new mongoose.Schema({
    proposalTitle: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    proposalDescription: {
        type: String,
        required: true,
        minLength: 50
    },
    applicants: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }
    ],
    skillsRequired: [{
        type: String,
        required: true
    }],
    memberEducationalRequirements: [{
        type: String,
    }],
    memberProfessionRequirements: {
        type: String,
    },
    applicationDeadline: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
})

const ProposalModel = mongoose.model('proposal', ProposalSchema);

module.exports = ProposalModel;