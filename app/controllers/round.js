import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { lte } from '@ember/object/computed';

export default Controller.extend({
  notEnoughWagers: lte('sortedWagers.length', 1),
  sortedWagers: computed('wagers.@each.amount', function() {
    return get(this, 'wagers').sortBy('amount');
  }),

  wagersByPlaceOrAmount: computed('wagers.@each.{amount,place}', function() {
    let wagers = get(this, 'wagers');
    let firstWagerPlace = get(wagers, 'firstObject.place');
    if (firstWagerPlace) {
      return wagers.sortBy('place');
    }
    return wagers.sortBy('amount');
  })
});
