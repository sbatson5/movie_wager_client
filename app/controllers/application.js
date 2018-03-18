import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

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
