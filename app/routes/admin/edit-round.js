import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  Route,
  get,
  inject: { service },
  set,
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  flashMessages: service(),

  model({ round_id }) {
    return get(this, 'store').findRecord('round', round_id).catch(() => {
      get(this, 'flashMessages').danger('Unable to find a round with that id');
      this.transitionTo('index');
    });
  },

  setupController(controller, model) {
    set(controller, 'round', model);
  }
});
