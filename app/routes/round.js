import Ember from 'ember';

const {
  Route,
  RSVP: { hash },
  get,
  set
} = Ember;

export default Route.extend({
  model({ movie_round_id }) {
    return hash({
      movieRound: get(this, 'store').findRecord('movie-round', movie_round_id),
      wagers: get(this, 'store').query('wager', { movie_round_id })
    });
  },

  setupController(controller, hash) {
    set(controller, 'movieRound', get(hash, 'movieRound'));
    set(controller, 'wagers', get(hash, 'wagers').sortBy('place'));
  }
});
