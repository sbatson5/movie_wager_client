import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').createRecord('movie-round', {
      startDate: new Date(),
      endDate: new Date()
    });
  },

  setupController(controller, model) {
    controller.set('movieRound', model);
  }
});
