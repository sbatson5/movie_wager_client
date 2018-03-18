import Ember from 'ember';

const {
  Service,
  inject: { service },
  get,
  set
} = Ember;

export default Service.extend({
  session: service('session'),
  ajax: service('ajax'),
  store: service('store'),

  saveUser() {
    let user = get(this, 'session.currentUser.data');
    return get(this, 'ajax').request('http://localhost:4000/api/auth', {
      type: 'POST',
      data: {
        id: get(this, 'session.currentUser.id'),
        user
      }
    });
  },

  invalidateSession() {
    this.clearAuthData();
    let session = get(this, 'session');
    set(session, 'currentUser', null);
    set(session, 'isAuthenticated', false);
    set(session, 'data.authenticated', null);
  },

  checkExpiration() {
    let expirationTime = get(this, 'session.data.expirationTime');
    let today = new Date();
    if (expirationTime <= today.getTime() || !expirationTime) {
      this.clearAuthData();
    }
  },

  clearAuthData() {
    localStorage.removeItem('ember_simple_auth-session');
  },

  authenticateGoogleUser() {
    let session = this.get('session');
    session.authenticate('authenticator:torii', 'google-oauth2').then(() => {
      get(this, 'store').queryRecord('google-user', {}).then((user) => {
        session.set('currentUser', user);
        this.saveUser();
      }).catch(() => {
        return null;
      });
    });
  }
});
