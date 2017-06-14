const assert = require('assert');
const User = require('../src/userModel');

describe('Updating Records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Justin');
        done();
      });
  }

  it('instance type using set and save', (done) => {
    joe.set('name', 'Justin');
    assertName(joe.save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(joe.update({ name: 'Justin' }), done);
  });

  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Justin' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Justin' }),
      done
    );
  });

  it('A model class can find a record with a id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Justin' }),
      done
    );
  });

  it('A user can have their postCount incremented by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 1 }})
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 1);
        done();
      });
  });
});