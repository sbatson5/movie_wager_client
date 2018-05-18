import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object';
import { lte } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
  flashMessages: service('flash-messages'),

  notEnoughWagers: lte('sortedWagers.length', 1),
  sortedWagers: computed('wagers.@each.amount', function() {
    return get(this, 'wagers').sortBy('amount');
  }),

  userWager: computed('wagers.[]', 'session.currentUser.id', function() {
    let user = get(this, 'session.currentUser');
    if (!user) {
      return;
    }
    let wager = get(this, 'wagers').find((wager) => {
      return get(wager, 'user.id') === get(user, 'id');
    });
    return wager || get(this, 'store').createRecord('wager', { user });
  }),

  wagersByPlaceOrAmount: computed('wagers.@each.{amount,place}', function() {
    let wagers = get(this, 'wagers');
    let firstWagerPlace = get(wagers, 'firstObject.place');
    if (firstWagerPlace) {
      return wagers.sortBy('place');
    }
    return wagers.sortBy('amount');
  }),

  actions: {
    placeWager() {
      let wager = get(this, 'userWager');
      let round = get(this, 'round');
      let title = get(round, 'title');
      let flashMessages = get(this, 'flashMessages');

      set(wager, 'round', round);
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
