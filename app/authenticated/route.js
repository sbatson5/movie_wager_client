import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    oauth_token: {
      refreshModel: true
    },
    oauth_verifier: {
      refreshModel: true
    }
  },

  ajax: Ember.inject.service(),

  model({ oauth_token, oauth_verifier}) {
    return this.get('ajax').request('/api/v1/twitter-auth', {
      method: 'POST',
      data: {
        oauth_token,
        oauth_verifier
      }
    });
  },

  setupController(controller, model) {
    console.log(model);
    this.get('store').findRecord('user', model.user_id).then((user) => {
      controller.set('user', user);
    });
  }
});
