import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | round', function(hooks) {
  setupTest(hooks);

  test('it properly sets up the controller', function(assert) {
    let route = this.owner.lookup('route:round');
    let hash = {
      round: 'foo',
      wagers: [
        { place: 3 },
        { place: 1 },
        { place: 2 }
      ]
    };
    let controller = {};

    route.setupController(controller, hash);

    let expectedWagers = [
      { place: 1 },
      { place: 2 },
      { place: 3 }
    ];

    assert.equal(controller.round, 'foo', 'round is set on controller');
    assert.deepEqual(controller.wagers, expectedWagers, 'wagers are set and ordered');
  });
});
