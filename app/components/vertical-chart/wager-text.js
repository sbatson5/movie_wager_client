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
  y: computed('startingYPosition', function() {
    return get(this, 'startingYPosition') + 40;
  })
});
