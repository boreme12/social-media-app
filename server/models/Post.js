const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema

let PostSchema = new mongoose.Schema([{
  message: {type: String, required: [true, "can't be blank"], index: true},
  userId: Schema.Types.ObjectId,
  username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  avatar: {type: String, required: [true, "can't be blank"]},
  comments: [{
    userId: Schema.Types.ObjectId,
    username: {type: String, lowercase: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    avatar: String,
    comment: String,
    createdAt: { type : Date, default: Date.now },
  }],
  commentCount: Number,
  likes: [{
    userId: Schema.Types.ObjectId,
    username: {type: String, lowercase: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  }],
  likeCount:  Number
}], {timestamps: true});

PostSchema.plugin(uniqueValidator, {message: 'is already taken.'});
let Post = mongoose.model('Post', PostSchema);

module.exports = Post
