import Ember from 'ember';

const {
  Component,
  computed,
  computed: { mapBy },
  get,
  set
} = Ember;

const CHART_SIZE = 700;
const VERTICAL_OFFSET = 100;

export default Component.extend({
  tagName: 'canvas',
  attributeBindings: ['width'],

  ctx: null,
  canvas: null,
  chartRange: null,
  finalAmount: null,
  lastUsedPixel: 0,
  wagers: null,
  width: 800,
  chartStartingPoint: 0,
  chartEndingPoint: 0,

  didInsertElement() {
    let canvas = get(this, 'element');
    let ctx = canvas.getContext('2d');
    let finalAmount = get(this, 'finalAmount');
    set(this, 'canvas', canvas);
    set(this, 'ctx', ctx);

    let chartRange = this.determineTotalRange(finalAmount);
    set(this, 'chartRange', chartRange);

    let winRanges = this._drawChart(chartRange);
    this._drawRangeSteps(ctx, winRanges, chartRange);
    this.drawVerticalLine(ctx, '#1BB0CE');
  },

  amounts: mapBy('wagers', 'amount'),
  orderedAmounts: mapBy('orderedWagers', 'amount'),

  orderedWagers: computed('wagers.@each.amount', function() {
    return get(this, 'wagers').sortBy('amount');
  }),

  wagerRange: computed('orderedWagers.@each', function() {
    let firstWager = get(this, 'orderedWagers.firstObject');
    let lastWager = get(this, 'orderedWagers.lastObject');
    return lastWager - firstWager;
  }),

  drawHorizontalLine(ctx, width, color) {
    let lastUsedPixel = get(this, 'lastUsedPixel');
    let endPoint = lastUsedPixel + width;
    set(this, 'lastUsedPixel', endPoint);

    ctx.strokeStyle = color;
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(lastUsedPixel, VERTICAL_OFFSET);
    ctx.lineTo(endPoint, VERTICAL_OFFSET);
    ctx.stroke();
  },

  drawVerticalLine(ctx, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(200, VERTICAL_OFFSET);
    ctx.lineTo(200, 20);
    // ctx.stroke();
    this.drawAvatars(ctx);
  },

  drawAvatars(ctx, winRanges) {
    ctx.rect(180, 20, 40, 40);
    ctx.stroke();
    ctx.fill();
  },

  determineTotalRange(finalAmount) {
    let allAmounts = get(this, 'wagers').mapBy('amount');
    allAmounts.push(finalAmount);
    let sortedAmounts = allAmounts.sort();
    let chartStartingPoint = sortedAmounts.shift();
    let chartEndingPoint = sortedAmounts.pop()
    set(this, 'chartStartingPoint', chartStartingPoint);
    set(this, 'chartEndingPoint', chartEndingPoint);
    return chartEndingPoint - chartStartingPoint;
  },

  _drawChart(chartRange) {
    // Let's assume 700px chart for now
    let previousRange = 0;
    let orderedAmounts = get(this, 'orderedAmounts');
    return orderedAmounts.map((amount, index) => {
      let nextAmount = orderedAmounts[index + 1];
      let winningRange;

      if (typeof nextAmount === 'undefined') {
        // if there is no next amount, then just draw until the end
        winningRange = chartRange - previousRange;
      } else {
        winningRange = (nextAmount - amount) / 2;
        previousRange = winningRange;
      }
      return winningRange;
    });
  },

  _drawRangeSteps(ctx, winRanges, chartRange) {
    let colors = ['#1BB0CE', '#6A5E72']; // do this better

    winRanges.forEach((winningRange, index) => {
      let drawRange = winningRange / chartRange;
      let drawPixel = Math.floor(CHART_SIZE * drawRange);

      this.drawHorizontalLine(ctx, drawPixel, colors[index]);
    });
  }
});
