import Ember from 'ember';

const {
  Controller,
  computed,
  computed: { lte },
  get
} = Ember;

export default Controller.extend({
  notEnoughWagers: lte('sortedWagers.length', 1),
  sortedWagers: computed('wagers.@each.amount', function() {
    return get(this, 'wagers').sortBy('amount');
  })
});
