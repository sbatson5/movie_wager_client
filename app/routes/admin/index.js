import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

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
