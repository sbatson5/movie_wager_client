import Ember from 'ember';

const {
  Controller,
  inject: { service },
  get
} = Ember;

export default Controller.extend({
  googleUserAuthenticator: service('google-user-authenticator'),

  actions: {
    authenticateSession() {
      get(this, 'googleUserAuthenticator').authenticateGoogleUser();
    }
  }
});
