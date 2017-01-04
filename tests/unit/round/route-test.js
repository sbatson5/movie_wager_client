import { moduleFor, test } from 'ember-qunit';

moduleFor('route:round', 'Unit | Route | round');

test('it properly sets up the controller', function(assert) {
  let route = this.subject();
  let hash = {
    movieRound: 'foo',
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

  assert.equal(controller.movieRound, 'foo', 'movieRound is set on controller');
  assert.deepEqual(controller.wagers, expectedWagers, 'wagers are set and ordered');
});
