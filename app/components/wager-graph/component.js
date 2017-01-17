import Ember from 'ember';

const {
  Component,
  computed,
  get,
  set
} = Ember;

export default Component.extend({
  tagName: 'canvas',
  attributeBindings: ['width'],

  ctx: null,
  canvas: null,
  lastUsedPixel: 0,
  wagers: null,
  width: 800,

  didInsertElement() {
    let canvas = get(this, 'element');
    let ctx = canvas.getContext('2d');
    set(this, 'canvas', canvas);
    set(this, 'ctx', ctx);
    this.drawLine(ctx, 450, '#000');
    this.drawLine(ctx, 250, '#0aB0dE');
  },

  orderedWagers: computed('wagers.@each', function() {
    return get(this, 'wagers').sortBy('amount');
  }),

  wagerRange: computed('orderedWagers.@each', function() {
    let firstWager = get(this, 'orderedWagers.firstObject');
    let lastWager = get(this, 'orderedWagers.lastObject');
    return lastWager - firstWager;
  }),

  drawLine(ctx, width, color) {
    let lastUsedPixel = get(this, 'lastUsedPixel');
    let endPoint = lastUsedPixel + width;
    set(this, 'lastUsedPixel', endPoint);

    ctx.strokeStyle = color;
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(lastUsedPixel, 50);
    ctx.lineTo(endPoint, 50);
    ctx.stroke();
  }
});
