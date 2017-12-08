import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias },
  get
} = Ember;

export default Component.extend({
  tagName: 'image',
  attributeBindings: ['href', 'x', 'y', 'height', 'width'],
  index: 0,
  x: computed('index', function() {
    return get(this, 'index') % 2 == 0 ? 450 : 202;
  }),
  y: computed('amount', function() {
    let amount = get(this, 'amount');
    let halfHeight = get(this, 'height') / 2;
    return get(this, 'startingYPosition') - halfHeight;
  }),
  href: alias('userImage'),
  height: 48,
  width: 48
});
