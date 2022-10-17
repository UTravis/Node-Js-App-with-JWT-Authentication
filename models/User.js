const mongoose = require('mongoose');

const schema = mongoose.Schema

const userTableSchema = new schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        min : 10
    }
}, {timestamps: true})

const User = mongoose.model('User', userTableSchema);

module.exports = User;