import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

const {
  RSVP: { Promise }
} = Ember;

moduleFor('route:application', 'Unit | Route | application');

test('it fetches session up initialization', function(assert) {
  assert.expect(1);

  this.subject({
    session: {
      fetchSession() {
        return new Promise((resolve) => {
          assert.ok(true, 'session is fetched');
          resolve();
        });
      }
    }
  });
});

test('it exists', function(assert) {
  let route = this.subject({
    session: {
      fetchSession() {
        return new Promise((resolve) => {
          resolve();
        });
      },
      getUser() {
        assert.ok(true, 'user is fetched from service');
        return 'foo';
      }
    }
  });

  let controller = {};
  route.setupController(controller);

  return wait().then(() => {
    assert.equal(controller.currentUser, 'foo', 'currentUser is set');
  });
});
