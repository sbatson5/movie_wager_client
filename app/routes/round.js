import Ember from 'ember';

const {
  Route,
  RSVP: { hash },
  get,
  set
} = Ember;

export default Route.extend({
  model({ round_id }) {
    return hash({
      round: get(this, 'store').findRecord('round', round_id),
      wagers: get(this, 'store').query('wager', { round_id })
    });
  },

  setupController(controller, hash) {
    set(controller, 'round', get(hash, 'round'));
    set(controller, 'wagers', get(hash, 'wagers').sortBy('place'));
  }
});
