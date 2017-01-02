import Ember from 'ember';

const {
  Route,
  get,
  inject: { service },
  set
} = Ember;

export default Route.extend({
  flashMessages: service(),
  session: service(),

  model({ movie_round_id }) {
    return this._getPreviousWagers(movie_round_id).then((previousWagers) => {
      if (get(previousWagers, 'length')) {
        return get(previousWagers, 'firstObject');
      } else {
        return this._createNewWager(movie_round_id);
      }
    });
  },

  setupController(controller, model) {
    set(controller, 'wager', model);
  },

  _createNewWager(movie_round_id) {
    return get(this, 'store').findRecord('movie-round', movie_round_id).then((movieRound) => {
      return get(this, 'store').createRecord('wager', {
        user: get(this, 'session').getUser(),
        movieRound
      });
    }).catch(() => {
      get(this, 'flashMessages').danger('Could not find that movie');
      this.transitionTo('index');
    });
  },

  _getPreviousWagers(movie_round_id) {
    let user = get(this, 'session').getUser();
    let user_id = get(user, 'id');
    return get(this, 'store').query('wager', { user_id, movie_round_id });
  }
});
