import Ember from 'ember';

const {
  Controller,
  get,
  inject: { service }
} = Ember;

export default Controller.extend({
  flashMessages: service(),

  actions: {
    placeWager() {
      let wager = get(this, 'wager');
      let title = get(this, 'wager.round.title');
      let flashMessages = get(this, 'flashMessages');

      wager.save().then(() => {
        let amount = get(wager, 'amount');
        flashMessages.success(`Bet placed for ${title} at ${amount}`);
      }).catch(() => {
        flashMessages.danger('Unable to place your bet. Please try again!');
      });
    }
  }
});
