import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | sign in', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:sign-in');
    assert.ok(controller);
  });
});
