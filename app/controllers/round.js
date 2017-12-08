import Ember from 'ember';

const {
  Controller,
  computed,
  get
} = Ember;

export default Ember.Controller.extend({
  sortedWagers: computed('wagers.@each.amount', function() {
    return get(this, 'wagers').sortBy('amount');
  })
});
