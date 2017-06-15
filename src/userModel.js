const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./postSchema');

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than two characters.'
    },
    required: [true, 'Name is required']
  },
  // posts property for embedded document example only
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

// creates model for user collection
// if no user collection, one is created automatically
// const User represents entire collection of users
const User = mongoose.model('user', UserSchema);

module.exports = User;