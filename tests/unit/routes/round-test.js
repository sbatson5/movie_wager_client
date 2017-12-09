import { moduleFor, test } from 'ember-qunit';

moduleFor('route:round', 'Unit | Route | round', {
  needs: ['service:flash-messages']
});

test('it properly sets up the controller', function(assert) {
  let route = this.subject();
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
