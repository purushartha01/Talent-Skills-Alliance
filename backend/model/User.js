const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12;

const UserSchema = new mongoose.Schema({
    about: {
        name: {
            type: String,
        },
        bio: {
            type: String,
        },
        location: {
            type: String,
        },
        title: {
            type: String,
        },
        coverImg: {
            type: String,
        },
        profileImg: {
            type: String,
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    education: [{
        courseName: {
            type: String,
            required: true,
        },
        from: {
            type: Number,
            required: true,
        },
        to: {
            type: Number,
            required: true
        },
        institute: {
            type: String,
            required: true
        },
        score: {
            type: Number,
        }
    }],
    expertise: {
        skills: [{ name: String, proficiency: String }],
        personalProjects: [{
            projectTitle: String,
            projectDescription: String,
            projectLinks: [String],
            projectSkills: [{
                name: String
            }],
            timeframe: String
        }]
    },
    links:
    {
        github: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        website: {
            type: String,
        },
        twitter: {
            type: String,
        },
        preferredEmail: {
            type: String,
        },
        extraLinks: [
            {
                linkTo: {
                    type: String,
                },
                linkOf: {
                    type: String,
                }
            }
        ]

    },
    proposals: [{
        type: mongoose.Types.ObjectId,
        ref: 'proposal'
    }],
    projects: [{
        type: mongoose.Types.ObjectId,
        ref: 'project'
    }],
    currentProject: {
        type: mongoose.Types.ObjectId,
        ref: 'project'
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    },
    isActivated: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true
})

UserSchema.pre('save', async function (next) {
    //TODO: Remember to use save() when updating password

    console.log("this: ", this);

    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
})

// UserSchema.methods.matchPassword = async function(userPassword){
//     return await bcrypt.compare(userPassword, this.password);
// }

UserSchema.methods.matchPassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;