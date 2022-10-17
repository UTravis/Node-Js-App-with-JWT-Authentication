const mongoose = require("mongoose");

const schema = mongoose.Schema;

const commentDbSchema = new schema({
    title: {
        type: String,
        required: true,
        max: 100,
    },
    description: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    }
},{timestamps: true});

const Comment = mongoose.model('Comment', commentDbSchema);

module.exports = Comment;