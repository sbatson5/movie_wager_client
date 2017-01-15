import Ember from 'ember';
import AuthenticatedRoute from 'movie-wager-client/routes/authenticated';

const {
  get,
  inject: { service },
  set,
} = Ember;

export default AuthenticatedRoute.extend({
  flashMessages: service(),

  model({ movie_round_id }) {
    return get(this, 'store').findRecord('movie-round', movie_round_id).catch(() => {
      get(this, 'flashMessages').danger('Unable to find a round with that id');
      this.transitionTo('index');
    });
  },

  setupController(controller, model) {
    set(controller, 'movieRound', model);
  }
});
