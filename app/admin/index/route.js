import Ember from 'ember';
import AuthenticatedRoute from 'movie-wager-client/routes/authenticated';

const { get, set } = Ember;

export default AuthenticatedRoute.extend({
  model() {
    return get(this, 'store').createRecord('movie-round', {
      startDate: new Date(),
      endDate: new Date()
    });
  },

  setupController(controller, model) {
    set(controller, 'movieRound', model);
  }
});
