import Ember from 'ember';

const {
  Route,
  RSVP,
  get,
  inject: { service },
  set
} = Ember;

export default Route.extend({
  flashMessages: service(),
  session: service(),

  model({ movie_round_id }) {
    return this._createNewWager(movie_round_id);
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

  actions: {
    placeWager() {
      let wager = get(this, 'controller.wager');
      let title = get(this, 'controller.wager.movieRound.title');
      let flashMessages = get(this, 'flashMessages');

      wager.save().then((wager) => {
        let amount = get(wager, 'amount');
        flashMessages.success(`Bet placed for ${title} at ${amount}`);
      }).catch(() => {
        flashMessages.danger('Unable to place your bet. Please try again!');
      });
    }
  }
});
