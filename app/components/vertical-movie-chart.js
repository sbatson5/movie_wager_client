import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  classNames: ['chart-wrapper'],
  finalAmount: null,
  wagers: null,

  chartStartingPoint: computed('sortedAmounts.[]', function() {
    return get(this, 'sortedAmounts.firstObject');
  }),

  chartEndingPoint: computed('sortedAmounts.[]', function() {
    return get(this, 'sortedAmounts.lastObject');
  }),

  sortedAmounts: computed('wagers.@each.amount', 'finalAmount', function() {
    let finalAmount = get(this, 'finalAmount');
    let allAmounts = get(this, 'wagers').mapBy('amount');
    if (finalAmount) {
      allAmounts.push(finalAmount);
    }
    return allAmounts.sort();
  }),

  chartRange: computed('chartStartingPoint', 'chartEndingPoint', function() {
    return get(this, 'chartEndingPoint') - get(this, 'chartStartingPoint');
  })
});
