import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  flashMessages: service('flash-messages'),
  session: service('session'),

  model({ round_id }) {
    return this._getPreviousWagers(round_id).then((previousWagers) => {
      if (get(previousWagers, 'length')) {
        return get(previousWagers, 'firstObject');
      } else {
        return this._createNewWager(round_id);
      }
    });
  },

  setupController(controller, model) {
    set(controller, 'wager', model);
  },

  _createNewWager(round_id) {
    return get(this, 'store').findRecord('round', round_id).then((round) => {
      return get(this, 'store').createRecord('wager', {
        user: get(this, 'session.currentUser'),
        round
      });
    }).catch(() => {
      get(this, 'flashMessages').danger('Could not find that movie');
      this.transitionTo('index');
    });
  },

  _getPreviousWagers(round_id) {
    let user_id = get(this, 'session.currentUser.id');
    return get(this, 'store').query('wager', { user_id, round_id });
  }
});
