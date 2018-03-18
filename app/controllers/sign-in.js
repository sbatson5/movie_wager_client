import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  googleUserAuthenticator: service('google-user-authenticator'),

  actions: {
    authenticateSession() {
      get(this, 'googleUserAuthenticator').authenticateGoogleUser();
    }
  }
});
