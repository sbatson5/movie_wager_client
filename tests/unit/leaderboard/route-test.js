import { moduleFor, test } from 'ember-qunit';

moduleFor('route:leaderboard', 'Unit | Route | leaderboard');

test('it exists', function(assert) {
  let route = this.subject();

  let model = ['foo', 'bar'];
  let controller = {};

  route.setupController(controller, model);

  assert.deepEqual(controller.wagers, model, 'model is set as wagers');
});
