import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { Promise } from 'rsvp';

function getPreviousStub(round_id) {
  return new Promise((resolve) => {
    if (round_id === 1) {
      resolve([{ foo: 'bar' }]);
    } else {
      resolve([]);
    }
  });
}

module('Unit | Route | wager', function(hooks) {
  setupTest(hooks);

  test('it properly sets wager on controller', function(assert) {
    let route = this.owner.lookup('route:wager');
    let controller = {};

    route.setupController(controller, 'foo');
    assert.equal(controller.wager, 'foo');
  });

  test('it returns an existing wager if it exists', function(assert) {
    let route = this.owner.lookup('route:wager');
    route.set('_getPreviousWagers', getPreviousStub);
    route.model({ round_id: 1 }).then((result) => {
      assert.deepEqual(result, { foo: 'bar' }, 'existing wager is returned');
    });
  });

  test('it creates a new wager when one is not found', function(assert) {
    let route = this.owner.lookup('route:wager');
    route.set('_getPreviousWagers', getPreviousStub);
    route.set('_createNewWager', function() {
      assert.ok(true, 'new record is created');
    });
    route.model({ round_id: 2 });
  });
});
