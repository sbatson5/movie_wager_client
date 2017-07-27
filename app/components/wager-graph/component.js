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
const COLORS = ['#1BB0CE', '#6A5E72', '#4F8699', '#563444'];

export default Component.extend({
  tagName: 'canvas',
  attributeBindings: ['width'],

  pixelObjects: null,

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
    set(this, 'pixelObjects', []); // create a new array since it will be kept in memory otherwise
    let canvas = get(this, 'element');
    let ctx = canvas.getContext('2d');
    let finalAmount = get(this, 'finalAmount');
    set(this, 'canvas', canvas);
    set(this, 'ctx', ctx);

    let chartRange = this.determineTotalRange(finalAmount);
    set(this, 'chartRange', chartRange);

    let winRanges = this._drawChart(chartRange);
    this._drawRangeSteps(ctx, winRanges, chartRange);

    let wagerPixelCollection = get(this, 'wagerPixelCollection');
    let userImages = get(this, 'userImages');
    this.drawUserImageTree(ctx, wagerPixelCollection, COLORS, userImages);
  },

  amounts: mapBy('wagers', 'amount'),
  userImages: mapBy('orderedWagers', 'user.profileImageUrl'),
  orderedAmounts: mapBy('orderedWagers', 'amount'),

  orderedWagers: computed('wagers.@each.amount', function() {
    return get(this, 'wagers').sortBy('amount');
  }),

  wagerRange: computed('orderedWagers.@each', function() {
    let firstWager = get(this, 'orderedWagers.firstObject');
    let lastWager = get(this, 'orderedWagers.lastObject');
    return lastWager - firstWager;
  }),

  wagerPixelCollection: computed('amounts', 'pixelObjects.@each.startingPoint', function() {
    let amounts = get(this, 'amounts').sort();
    let pixelCollection = [];
    get(this, 'pixelObjects').forEach((pixelObject, index) => {
      set(pixelObject, 'amount', amounts[index]);
      pixelCollection.push(pixelObject);
    });

    console.log(pixelCollection);
    return pixelCollection;
  }),

  drawHorizontalLine(ctx, width, color) {
    let lastUsedPixel = get(this, 'lastUsedPixel');
    console.log('width', width);
    let endPoint = lastUsedPixel + width;
    set(this, 'lastUsedPixel', endPoint);

    // we track the pixels for drawing avatars later
    this._trackPixels(lastUsedPixel, endPoint);

    ctx.strokeStyle = color;
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(lastUsedPixel, VERTICAL_OFFSET);
    ctx.lineTo(endPoint, VERTICAL_OFFSET);
    ctx.stroke();
  },

  drawUserImageTree(ctx, wagerPixelCollection, colors, userImages) {
    let color = colors[0];

    wagerPixelCollection.forEach((pixelObject, index) => {
      let { startingPoint, amount, endingPoint } = pixelObject;
      // let xOffset = ((endingPoint - startingPoint) / 2) + startingPoint;
      let xOffset = this._calculatOffset(amount);
      let color = colors[index];
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      let image = userImages[index] || 'http://abs.twimg.com/sticky/default_profile_images/default_profile_3_normal.png';
      this.drawVerticalLine(ctx, color, xOffset);
      this.drawAvatars(ctx, xOffset, image);

      ctx.stroke();
    });
  },

  _calculatOffset(amount) {
    let chartStartingPoint = get(this, 'chartStartingPoint');
    let chartRange = get(this, 'chartRange');
    console.log(chartRange);

    let relativeAmount = amount - chartStartingPoint;
    let relativePercentage = relativeAmount / chartRange;
    return Math.floor(CHART_SIZE * relativePercentage);
  },

  drawVerticalLine(ctx, color, xOffset) {
    ctx.beginPath();
    ctx.moveTo(xOffset, VERTICAL_OFFSET);
    ctx.lineTo(xOffset, 20);
  },

  drawAvatars(ctx, xOffset, userImage) {
    let imageWidth = 48;
    let xPosition = xOffset - (imageWidth / 2);
    let yPosition = 12;
    ctx.rect(xPosition, yPosition, imageWidth, imageWidth);
    let profileImage = new Image();
    profileImage.src = userImage;
    profileImage.onload = function() {
      ctx.drawImage(profileImage, xPosition, yPosition, imageWidth, imageWidth);
    }
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
    let orderedAmounts = get(this, 'orderedAmounts');
    let remainingRange = chartRange;
    let chartStartingPoint = get(this, 'chartStartingPoint');

    return orderedAmounts.map((amount, index) => {
      let nextAmount = orderedAmounts[index + 1];
      let winningRange;

      if (typeof nextAmount === 'undefined') {
        // if there is no next amount, then just draw until the end
        winningRange = remainingRange;
      } else {
        winningRange = (nextAmount - amount) / 2;
        remainingRange -= winningRange;
      }
      console.log(amount, nextAmount, winningRange, remainingRange);
      return winningRange;
    });
  },

  _drawRangeSteps(ctx, winRanges, chartRange) {
    winRanges.forEach((winningRange, index) => {
      let drawRange = winningRange / chartRange;
      let drawPixel = Math.floor(CHART_SIZE * drawRange);

      this.drawHorizontalLine(ctx, drawPixel, COLORS[index]);
    });
  },

  _trackPixels(startingPoint, endingPoint) {
    let pixelObjects = get(this, 'pixelObjects');

    pixelObjects.push({ startingPoint, endingPoint });
  }
});
