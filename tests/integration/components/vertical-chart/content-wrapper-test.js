import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | vertical chart/content wrapper', function(hooks) {
  setupRenderingTest(hooks);

  test('it sets up line information properly', async function(assert) {
    this.set('amount', 1000);
    this.set('chartStartingPoint', 500);
    this.set('chartRange', 2000);
    this.set('chartHeight', 400);

    await render(hbs`{{vertical-chart/content-wrapper
      amount=amount
      chartStartingPoint=chartStartingPoint
      chartRange=chartRange
      chartHeight=chartHeight
    }}`);

    let line = this.element.querySelector('line');

    assert.equal(line.attributes['y1'].value, '105');
    assert.equal(line.attributes['y2'].value, '105');
    assert.equal(line.attributes['x1'].value, '250');
    assert.equal(line.attributes['x2'].value, '350');
  });
});
