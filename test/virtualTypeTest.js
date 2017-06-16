const assert = require('assert');
const User = require('../src/userModel');

describe('Virtual types', () => {
  xit('postCount returns number of posts', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Post' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});