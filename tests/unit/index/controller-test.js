import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:index', 'Unit | Controller | index');

test('username is properly set', function(assert) {
  let controller = this.subject({
    application: {
      currentUser: { name: 'foo' }
    }
  });
  assert.equal(controller.get('username'), 'foo');
});
