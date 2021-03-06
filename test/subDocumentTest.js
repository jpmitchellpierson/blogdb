//only used for embedded documents example
const assert = require('assert');
const User = require('../src/userModel');

describe('Subdocuments', () => {
  xit('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post Title' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'Post Title');
        done();
      });
  });

  xit('can add subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      //joe starts off with an empty array of posts 
      posts: []
    });
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  xit('can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Post' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});