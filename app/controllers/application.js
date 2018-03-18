import Ember from 'ember';

const {
  Controller,
  inject: { service },
  get
} = Ember;

export default Controller.extend({
  googleUserAuthenticator: service('google-user-authenticator'),
  session: service('session'),

  init() {
    this._super(...arguments);
    let googleUserAuthenticator = get(this, 'googleUserAuthenticator');
    googleUserAuthenticator.checkExpiration();
    if (get(this, 'session.data.authData.access_token')) {
      googleUserAuthenticator.authenticateGoogleUser();
    }
  },

  actions: {
    logout() {
      get(this, 'googleUserAuthenticator').invalidateSession();
    }
  }
});
