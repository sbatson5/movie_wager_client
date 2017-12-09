import { moduleFor, test } from 'ember-qunit';

moduleFor('service:google-user-authenticator', 'Unit | Service | google user authenticator', {
  needs: ['service:session', 'service:ajax']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
