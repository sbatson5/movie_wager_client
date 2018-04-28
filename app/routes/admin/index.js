import Route from '@ember/routing/route';
import { get, set } from '@ember/object';

export default Route.extend({
  model() {
    return get(this, 'store').createRecord('round', {
      startDate: new Date(),
      endDate: new Date()
    });
  },

  setupController(controller, model) {
    set(controller, 'round', model);
  }
});
