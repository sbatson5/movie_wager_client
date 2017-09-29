import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

const { RSVP: { Promise }} = Ember;

moduleFor('service:session', 'Unit | Service | session', {
  needs: ['service:ajax']
});

const ajaxStub = {
  request() {
    return new Promise((resolve) => {
      resolve();
    });
  }
};

test('`getUser` calls `fetchSession` when user is undefined', function(assert) {
  assert.expect(1);

  let service = this.subject({
    currentUser: null,
    fetchSession() {
      assert.ok(true, 'fetch session is called');
    }
  });

  service.getUser();
});

test('`getUser` returns the currentUser', function(assert) {
  assert.expect(1);

  let service = this.subject({
    currentUser: 'foo'
  });

  assert.equal(service.getUser(), 'foo', 'user is returned');
});

test('`destroySession` deletes the currentUser', function(assert) {
  assert.expect(1);

  let service = this.subject({
    currentUser: 'foo',
    ajax: ajaxStub
  });

  service.destroySession();
  return wait().then(() => {
    assert.notOk(service.getUser(), 'user is null');
  });
});

test('`fetchSession` calls _loadUser with valid api response', function(assert) {
  let service = this.subject({
    currentUser: null,
    ajax: ajaxStub,
    _loadUser() {
      assert.ok(true, 'user is loaded');
    }
  });

  service.fetchSession();
});
