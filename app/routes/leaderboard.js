import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
  model() {
    return get(this, 'store').query('wager', { place: 1 });
  },

  setupController(controller, model) {
    set(controller, 'wagers', model);
  }
});
