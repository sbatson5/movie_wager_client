import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | leaderboard', function(hooks) {
  setupTest(hooks);

  test('it sets up the controller', function(assert) {
    let route = this.owner.lookup('route:leaderboard');
    let model = ['foo', 'bar'];
    let controller = {};

    route.setupController(controller, model);

    assert.deepEqual(controller.wagers, model, 'model is set as wagers');
  });
});
