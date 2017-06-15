const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/userModel');
const Comment = require('../src/commentModel');
const BlogPost = require('../src/blogPostModel');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'This is a catchy title',
      content: 'This is some content in a blog post'
    });
    // Joe is his own worst critic
    comment = new Comment({ content: 'This blog post is pretty lame and unimaginative' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    // need promise all to wait for all instances to save
    // without promise all, not sure which will save first and last
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  xit('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'This is a catchy title');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        // inside the user found in the collection, find blogPosts property 
        // and populate with all of its properties
        path: 'blogPosts',
        populate: {
          // inside all of blogPosts properties find comments property
          // and populate blogPosts with comments values
          path: 'comments',
          model: 'comment',
          populate: {
            // inside all of comments properties find user property
            // populate comments with whatever is in user property
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'This is a catchy title');
        assert(user.blogPosts[0].comments[0].content === 'This blog post is pretty lame and unimaginative');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });
});