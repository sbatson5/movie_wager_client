import Ember from 'ember';

const {
  Route,
  get,
  inject: { service },
} = Ember;

export default Route.extend({
  flashMessages: service(),

  model({ movie_round_id }) {
    return get(this, 'store').findRecord('movie-round', movie_round_id).catch(() => {
      get(this, 'flashMessages').danger('Unable to find a round with that id');
      this.transitionTo('index');
    });
  },

  setupController(controller, model) {
    controller.set('movieRound', model);
  }
});
