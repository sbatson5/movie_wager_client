import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  flashMessages: service('flash-messages'),

  actions: {
    placeWager() {
      let wager = get(this, 'wager');
      let title = get(this, 'wager.round.title');
      let flashMessages = get(this, 'flashMessages');

      wager.save().then(() => {
        let amount = get(wager, 'amount');
        flashMessages.success(`Bet placed for ${title} at ${amount}`);
      }).catch((errorObject) => {
        let { errors } = errorObject;
        let [mainError] = errors;
        flashMessages.danger(`Unable to place your bet. ${mainError.title}`);
      });
    }
  }
});
