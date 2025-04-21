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
    },
    applicants: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }
    ],
    skillsRequired: [{
        skill:{
            type: String,
            required: true,
        },
        level:{
            type: String,
            default: 'Beginner'
        }
    }],
    lookingFor: [{
        type: String,
        required: true,
    }],
    applicationDeadline: {
        type: Date,
        required: true,
    },
    timeCommitment: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const ProposalModel = mongoose.model('proposal', ProposalSchema);

module.exports = ProposalModel;