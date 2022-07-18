const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    id:String,
    name: String,
    email:String
});

//User.plugin(passportLocalMongoose,{usernameField:'email'});

module.exports = mongoose.model('User',User);