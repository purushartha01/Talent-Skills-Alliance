const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    projectDescription: {
        type: String,
        required: true,
        minLength: 100
    },
    members: [{
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    }],
    links: [{
        title: {
            type: String,
            required: true,
        },
        urlString: {
            type: String,
            required: true,
        }
    }],
    skillsUsed: [
        {
            type: String,
            required: true
        }
    ]
}, {
    timestamps: true
})

const ProjectModel=mongoose.model('project',ProjectSchema);

module.exports=ProjectModel;