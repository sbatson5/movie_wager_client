import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { lte } from '@ember/object/computed';

export default Controller.extend({
  notEnoughWagers: lte('sortedWagers.length', 1),
  sortedWagers: computed('wagers.@each.amount', function() {
    return get(this, 'wagers').sortBy('amount');
  })
});
