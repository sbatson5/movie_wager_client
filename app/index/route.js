import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('movie-round');
  },
  session: Ember.inject.service(),

  afterModel() {
    this.get('session').fetchSession();
  },

  actions: {
    checkUser() {
      let user = this.get('session').getUser();
      console.log(user.get('name'));
    }
  }
});
