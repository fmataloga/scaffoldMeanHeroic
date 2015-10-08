var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	country: Number,
	city: Number,
	age: Number,
	height: Number,
	tipo : Number,
	usuario: String,
	password: String
});

mongoose.model('Users', UsersSchema);