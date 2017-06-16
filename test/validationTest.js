const assert = require('assert');
const User = require('../src/userModel');

describe('Validating Records', () => {
  xit('requires a username', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required');
  });

  xit('requires username longer than two characters', () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than two characters.');
  });

  xit('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than two characters.');
        done();
      });
  });
});