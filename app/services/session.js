import Service, { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import config from 'movie-wager-client/config/environment';

export default Service.extend({
  ajax: service('ajax'),
  store: service('store'),

  getCurrentSession() {
    return get(this, 'ajax').request(`${config.apiUri}/api/session`, {
      type: 'GET',
      xhrFields: {
        withCredentials: true
      }
    }).then((userJSON) => {
      let store = get(this, 'store');
      store.pushPayload(userJSON);
      set(this, 'currentUser', store.peekRecord('user', userJSON.data.id));
      set(this, 'isAuthenticated', true);
    }).catch(() => {
      set(this, 'isAuthenticated', false);
    });
  },

  logoutUser() {
    set(this, 'isAuthenticated', false);
    set(this, 'currentUser', null);
    return get(this, 'ajax').request(`${config.apiUri}/api/session`, {
      type: 'DELETE',
      xhrFields: {
        withCredentials: true
      }
    });
  }
});
