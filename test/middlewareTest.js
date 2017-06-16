const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/userModel');
const BlogPost = require('../src/blogPostModel');

describe('middleware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'This is a catchy title',
      content: 'This is some content in a blog post'
    });

    joe.blogPosts.push(blogPost);

    // need promise all to wait for all instances to save
    // without promise all, not sure which will save first and last
    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('users clean up dangling blogPosts on remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
