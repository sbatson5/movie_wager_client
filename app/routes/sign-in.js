import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  actions: {
    signIn() {
      this.get('ajax').request('/api/v1/twitter-auth', {
        method: 'POST'
      }).then((twitterAuth) => {
        window.location = twitterAuth.url;
      });
    }
  }
});
