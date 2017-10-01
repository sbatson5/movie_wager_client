import { moduleFor, test } from 'ember-qunit';

moduleFor('route:authenticated', 'Unit | Route | authenticated', {
  needs: ['service:session']
});

test('it redirects when not logged in', function(assert) {
  let sessionStub = {
    isAuthenticated() {
      return false;
    }
  };
  let route = this.subject({
    transitionTo(route) {
      assert.equal(route, 'sign-in', 'user is redirected');
    },
    session: sessionStub
  });

  route.beforeModel();
});
