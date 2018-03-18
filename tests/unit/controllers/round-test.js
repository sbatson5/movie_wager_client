import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | round', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:round');
    assert.ok(controller);
  });
});
