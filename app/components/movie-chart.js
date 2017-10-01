import Ember from 'ember';

const {
  Component,
  computed,
  computed: { lte },
  get
} = Ember;

const CHART_SIZE = 700;
const COLORS = ['#1BB0CE', '#6A5E72', '#4F8699', '#563444'];
const CHART_PADDING = 24;

export default Component.extend({
  classNames: ['chart-wrapper'],
  finalAmount: null,
  wagers: null,
  notEnoughWagers: lte('wagers.length', 1),

  chartStartingPoint: computed('sortedAmounts.[]', function() {
    return get(this, 'sortedAmounts.firstObject');
  }),

  chartEndingPoint: computed('sortedAmounts.[]', function() {
    return get(this, 'sortedAmounts.lastObject');
  }),

  sortedAmounts: computed('wagers.[]', function() {
    let finalAmount = get(this, 'finalAmount');
    let allAmounts = get(this, 'wagers').mapBy('amount');
    if (finalAmount) {
      allAmounts.push(finalAmount);
    }
    return allAmounts.sort();
  }),

  chartRange: computed('chartStartingPoint', 'chartEndingPoint', function() {
    return get(this, 'chartEndingPoint') - get(this, 'chartStartingPoint');
  }),

  orderedWagerCollection: computed('wagers.@each.amount', 'chartRange', 'chartStartingPoint', 'chartEndingPoint', function() {
    let wagers = get(this, 'wagers').sortBy('amount');
    let chartRange = get(this, 'chartRange');
    let amounts = wagers.mapBy('amount');
    let chartStartingPoint = get(this, 'chartStartingPoint');
    let collection = [];
    let startingPixelPoint = 0;

    wagers.forEach((wager, index) => {
      let amount = get(wager, 'amount');
      let winningRange;

      let userImage = get(wager, 'user.profileImageUrl');
      let color = COLORS[index];
      let startingPosition = get(wager, 'amount') - chartStartingPoint;
      let previousAmount = amounts[index - 1];
      let nextAmount = amounts[index + 1];
      if (index === 0) {
        winningRange = (nextAmount - amount) / 2;
      } else {
        winningRange = ((amount - previousAmount) / 2) + (nextAmount - amount) / 2;
      }

      let pixelRange = this.getRelativePixel(winningRange, chartRange);
      // add 3 to compensate for thickness of line
      let amountPosition = this.getRelativePixel(startingPosition, chartRange) + 3;
      // due to rounding, the last one won't reliably end at the end of the chart
      // we can safely assume that if it is the last one, it should be drawn until the end
      let endingPixelPoint = (typeof nextAmount === 'undefined') ? 700 : startingPixelPoint + pixelRange;
      collection.pushObject({
        pixelRange,
        userImage,
        amountPosition,
        imagePosition: amountPosition - CHART_PADDING,
        startingPixelPoint,
        endingPixelPoint,
        amount,
        color
      });
      startingPixelPoint += pixelRange;
    });
    return collection;
  }),

  getRelativePixel(amount, chartRange) {
    let relativePercentage = amount / chartRange;
    return Math.floor(CHART_SIZE * relativePercentage);
  }
});
