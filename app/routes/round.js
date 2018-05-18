import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { get, setProperties } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  flashMessages: service('flash-messages'),

  model({ round_id }) {
    return RSVP.hash({
      round: get(this, 'store').findRecord('round', round_id),
      wagers: get(this, 'store').query('wager', { round_id })
    });
  },

  setupController(controller, hash) {
    setProperties(controller, hash);
  }
});
