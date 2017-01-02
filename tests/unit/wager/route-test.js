import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:wager', 'Unit | Route | wager');

function getPreviousStub(movie_round_id) {
  return new Ember.RSVP.Promise((resolve) => {
    if (movie_round_id === 1) {
      resolve([{ foo: 'bar' }]);
    } else {
      resolve([]);
    }
  });
}

test('it properly sets wager on controller', function(assert) {
  let route = this.subject();
  let controller = {};

  route.setupController(controller, 'foo');
  assert.equal(controller.wager, 'foo');
});

test('it returns an existing wager if it exists', function(assert) {
  let route = this.subject({ _getPreviousWagers: getPreviousStub });
  route.model({ movie_round_id: 1 }).then((result) => {
    assert.deepEqual(result, { foo: 'bar' }, 'existing wager is returned');
  });
});

test('it creates a new wager when one is not found', function(assert) {
  let route = this.subject({
    _getPreviousWagers: getPreviousStub,
    _createNewWager() {
      assert.ok(true, 'new record is created');
    }
  });
  route.model({ movie_round_id: 2 });
});
