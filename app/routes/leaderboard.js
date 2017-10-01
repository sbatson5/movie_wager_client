import Ember from 'ember';

const {
  Route,
  get,
  set
} = Ember;

export default Route.extend({
  model() {
    return get(this, 'store').query('wager', { place: 1 });
  },

  setupController(controller, model) {
    set(controller, 'wagers', model);
  }
});
