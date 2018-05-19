import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import ENV from '../config/environment';
import { isEmpty } from '@ember/utils';
import config from 'movie-wager-client/config/environment';

export default Route.extend({
  ajax: service('ajax'),
  googleToken: service('google-token'),
  flashMessages: service('flash-messages'),
  session: service('session'),

  queryParams: {
    code: { refreshModel: false }
  },

  model({ code }) {
    if (isEmpty(code)) {
      return;
    }
    return get(this, 'ajax').request(`${config.apiUri}/api/auth`, {
      type: 'POST',
      xhrFields: {
        withCredentials: true
      },
      data: {
        code,
        redirect_uri: ENV.googleCredentials.redirectUri,
        client_id: ENV.googleCredentials.apiKey
      }
    }).then((authData) => {
      let { access_token, token_type } = authData;
      set(this, 'googleToken.accessToken', access_token);
      set(this, 'googleToken.tokenType', token_type);
    }).catch(() => {
      get(this, 'flashMessages').danger('Could not log in');
    });
  },

  afterModel() {
    get(this, 'store').queryRecord('google-user', {}).then((user) => {
      this.saveUser(user);
    });
  },

  saveUser(user) {
    return get(this, 'ajax').request(`${config.apiUri}/api/auth`, {
      type: 'POST',
      xhrFields: {
        withCredentials: true
     },
      data: {
        id: get(user, 'id'),
        user: {
          familyName: get(user, 'familyName'),
          gender: get(user, 'gender'),
          givenName: get(user, 'givenName'),
          locale: get(user, 'locale'),
          name: get(user, 'name'),
          picture: get(user, 'picture'),
          verifiedEmail: get(user, 'verifiedEmail')
        }
      }
    }).then(() => {
      get(this, 'session').getCurrentSession();
      this.transitionTo('index');
    });
  }
});
