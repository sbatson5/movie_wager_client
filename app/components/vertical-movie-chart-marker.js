import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias },
  get
} = Ember;

export default Component.extend({
  tagName: 'line',
  attributeBindings: ['x1', 'x2', 'y1', 'y2', 'stroke', 'stroke-width'],
  stroke: '#e4e6e7',
  'stroke-width': 10,
  index: 0,

  x1: computed('index', function() {
    return get(this, 'index') % 2 == 0 ? 350 : 250;
  }),

  x2: computed('index', function() {
    return get(this, 'index') % 2 == 0 ? 450 : 350;
  }),

  y1: computed('amount', function() {
    let amount = get(this, 'amount');
    let halfStrokeWidth = get(this, 'stroke-width') / 2;
    return get(this, 'getRelativePixel')(amount) + halfStrokeWidth;
  }),

  y2: alias('y1')
});
