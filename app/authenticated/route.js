import Ember from 'ember';

const {
  Route,
  get,
  inject: { service }
} = Ember;

export default Route.extend({
  queryParams: {
    oauth_token: {
      refreshModel: true
    },
    oauth_verifier: {
      refreshModel: true
    }
  },

  ajax: service(),
  session: service(),

  model({ oauth_token, oauth_verifier}) {
    return get(this, 'ajax').request('/api/v1/twitter-auth', {
      method: 'POST',
      data: {
        oauth_token,
        oauth_verifier
      }
    });
  },

  afterModel() {
    get(this, 'session')
  }
});
