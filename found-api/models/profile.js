const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    type: {
        type: String
    },
    desc: {
        type: String
    },
    income: {
        type: String,
        required: true
    },
    expand: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: true
    },
    remark: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('Profile', ProfileSchema);