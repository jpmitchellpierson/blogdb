const mongoose = require('mongoose');
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
    comment = new Comment({ content: 'This blog post is pretty lame and unimaginative' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    // need promise all to wait for all instances to save
    // without promise all, not sure which will save first and last
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it.only('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .then((user) => {
        console.log(user);
        done();
      });
  });
});