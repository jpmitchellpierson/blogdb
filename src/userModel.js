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
  // posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  // reason for no arrow function
  // this refers to model instance, in this case this === joe
  const BlogPost = mongoose.model('blogPost');
  
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

// creates model for user collection
// if no user collection, one is created automatically
// const User represents entire collection of users
const User = mongoose.model('user', UserSchema);

module.exports = User;