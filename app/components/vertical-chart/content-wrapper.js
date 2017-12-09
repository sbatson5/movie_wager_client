import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  tagName: '',
  startingYPosition: computed('chartStartingPoint', 'chartRange', 'amount', 'chartHeight', function() {
    let amount = get(this, 'amount');
    let chartStartingPoint = get(this, 'chartStartingPoint');
    let relativePercentage = (amount - chartStartingPoint) / get(this, 'chartRange');
    return Math.floor(get(this, 'chartHeight') * relativePercentage);
  })
});
