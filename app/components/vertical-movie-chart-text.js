import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  tagName: 'text',
  attributeBindings: ['x', 'y'],
  index: 0,
  x: computed('index', function() {
    return get(this, 'index') % 2 == 0 ? 450 : 202;
  }),
  y: computed('amount', function() {
    let amount = get(this, 'amount');
    return get(this, 'getRelativePixel')(amount) + 40;
  })
});
