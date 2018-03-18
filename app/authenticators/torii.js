import Torii from 'ember-simple-auth/authenticators/torii';
import Ember from 'ember';
import ENV from '../config/environment';

const {
  RSVP: { Promise },
  get,
  set,
  inject: { service }
} = Ember;

export default Torii.extend({
  session: service('session'),
  torii: service('torii'),
  ajax: service(),

  authenticate(provider, options) {
    let authData = get(this, 'session.data.authData') || {};
    if (authData.access_token) {
      return new Promise((resolve, reject) => {
        if (authData) {
          resolve(authData);
        } else {
          reject('No local session');
        }
      });
    } else {
      return this.authWithTorii(provider, options);
    }
  },

  authWithTorii(provider, options) {
    return this.get('torii').open(provider, options).then((authResponse) => {
      return get(this, 'ajax').request('http://localhost:4000/api/auth', {
        type: 'POST',
        data: {
          code: authResponse.authorizationCode,
          redirect_uri: authResponse.redirectUri,
          client_id: ENV.torii.providers['google-oauth2'].apiKey
        }
      }).then((response) => {
        this._setExpiration(response.expires_in);
        set(this, 'session.data.authData', response);
        set(this, 'session.data.authData.provider', 'google');
        response.provider = provider;
        return response;
      });
    });
  },

  _setExpiration(expiresIn) {
    let now = new Date();
    let exirationInMilli = expiresIn * 1000;
    set(this, 'session.data.expirationTime', now.getTime() + exirationInMilli);
  }
});
