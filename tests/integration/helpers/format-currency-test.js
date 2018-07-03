import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-currency', function(hooks) {
  setupRenderingTest(hooks);

  test('it formats currency', async function(assert) {
    this.set('inputValue', '1234');

    await render(hbs`{{format-currency inputValue}}`);

    assert.equal(this.element.textContent.trim(), '$1,234');
  });

  test('it formats currency with long values', async function(assert) {
    this.set('inputValue', '12321312212312');

    await render(hbs`{{format-currency inputValue}}`);

    assert.equal(this.element.textContent.trim(), '$12,321,312,212,312');
  });
});
