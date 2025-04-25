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
            applicant: {
                type: mongoose.Types.ObjectId,
                ref: 'user'
            },
            appliedOn: {
                type: Date,
                default: Date.now
            },
            status: {
                type: String,
                enum: ["accepted", "rejected", "undetermined"],
                default: "undetermined"
            }
        }
    ],
    skillsRequired: [{
        skill: {
            type: String,
            required: true,
        },
        level: {
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
    proposalStatus: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
}, {
    timestamps: true
})

const ProposalModel = mongoose.model('proposal', ProposalSchema);

module.exports = ProposalModel;