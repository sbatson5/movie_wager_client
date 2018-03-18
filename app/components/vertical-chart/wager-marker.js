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

  y1: computed('startingYPosition', 'stroke-width', function() {
    let halfStrokeWidth = get(this, 'stroke-width') / 2;
    let position = get(this, 'startingYPosition') + halfStrokeWidth;
    return position > 700 ? 700 : position;
  }),

  y2: alias('y1')
});
