import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { get, set } from '@ember/object';

export default Route.extend({
  model({ round_id }) {
    return RSVP.hash({
      round: get(this, 'store').findRecord('round', round_id),
      wagers: get(this, 'store').query('wager', { round_id })
    });
  },

  setupController(controller, hash) {
    set(controller, 'round', get(hash, 'round'));
    set(controller, 'wagers', get(hash, 'wagers').sortBy('place'));
  }
});
