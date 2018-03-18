import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

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
