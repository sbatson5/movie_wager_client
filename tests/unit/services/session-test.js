import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | session', function(hooks) {
  setupTest(hooks);

  test('logout deletes currentUser', function(assert) {
    assert.expect(3);
    let service = this.owner.lookup('service:session');
    service.set('isAuthenticated', true);
    service.set('currentUser', { name: 'bob' });
    service.set('ajax', {
      request(path) {
        assert.equal(path, '/api/session', 'makes request to API');
      }
    });

    service.logoutUser();
    assert.notOk(service.get('currentUser'), 'user is deleted');
    assert.notOk(service.get('isAuthenticated'), 'no longer authenticated');
  });
});
