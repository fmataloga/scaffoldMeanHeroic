// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  username: String,
  password: String,
  rol:  	Number
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', User);