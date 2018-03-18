import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, get, set } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
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
