const mongoose = require('mongoose');


const ProjectSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true,
    },
    teamLeader: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    projectDescription: {
        type: String,
        required: true,
    },
    members: [{
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    }],
    links: [{
        title: {
            type: String,
        },
        urlString: {
            type: String,
        }
    }],
    skillsUsed: [
        {
            skill: {
                type: String,
                required: true,
            },
            level: {
                type: String,
                default: 'Beginner'
            }
        }
    ],
    startedOn:{
        type: Date,
        default: Date.now()
    },
    completedOn:{
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['ongoing', 'completed', 'on-hold'],
        default: 'on-hold'
    },
    timeCommitment: {
        type: String,
    },
    associatedWith: {
        type: mongoose.Types.ObjectId,
        ref: 'proposal',
        required: true  
    },
}, {
    timestamps: true
})


const ProjectModel=mongoose.model('project',ProjectSchema);

module.exports=ProjectModel;