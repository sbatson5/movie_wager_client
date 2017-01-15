import Ember from 'ember';

const {
  Route,
  get,
  inject: { service }
} = Ember;

export default Route.extend({
  session: service(),

  beforeModel() {
    let isAuthenticated = get(this, 'session').isAuthenticated();
    if (!isAuthenticated) {
      this.showLogin();
    }
  },

  showLogin() {
    this.transitionTo('sign-in');
  }
});
