const mongoose = require('mongoose');


const ReviewSchema = new mongoose.Schema({
    forProject: {
        type: mongoose.Types.ObjectId,
        ref: 'project',
        required: true
    },
    review: {
        type: String,
        required: true,
    },
    reviewFor: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    extraRemarks: {
        type: String,
        default: null
    },
    reviewBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    reviewedOn: {
        type: Date,
        default: Date.now()
    },
    isProcessed:{
        type: Boolean,
        default: false
    },
    isAnonymous:{
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    }
)

const ReviewModel = mongoose.model("review", ReviewSchema);

module.exports = ReviewModel;