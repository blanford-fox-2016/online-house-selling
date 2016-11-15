const mongoose = require('mongoose')
var increment = require('mongoose-sequence');
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(email){
                return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email)
            },
            message: 'Wrong email format'
        }
    }
}, {
    timestamps: true
})

User.plugin(increment, {inc_field: 'userId'});

User.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', User)