let mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator')

let UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  bio: String,
  avatar: String,
  hash: String,
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
let User = mongoose.model('User', UserSchema);

module.exports = User
