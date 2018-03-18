import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('vertical-chart/content-wrapper', 'Integration | Component | vertical chart/content wrapper', {
  integration: true
});

test('it sets up line information properly', function(assert) {
  this.set('amount', 1000);
  this.set('chartStartingPoint', 500);
  this.set('chartRange', 2000);
  this.set('chartHeight', 400);

  this.render(hbs`{{vertical-chart/content-wrapper
    amount=amount
    chartStartingPoint=chartStartingPoint
    chartRange=chartRange
    chartHeight=chartHeight
  }}`);

  let line = this.$().find('line:eq(0)');

  assert.equal(line.attr('y1'), '105');
  assert.equal(line.attr('y2'), '105');
  assert.equal(line.attr('x1'), '250');
  assert.equal(line.attr('x2'), '350');
});
