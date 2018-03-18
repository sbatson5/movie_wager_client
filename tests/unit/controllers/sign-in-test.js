import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:sign-in', 'Unit | Controller | sign in', {
  needs: ['service:google-user-authenticator']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
