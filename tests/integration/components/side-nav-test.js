import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | side-nav', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('rounds', [
      { code: 'abc123', title: 'Cool Movie' },
      { code: 'abc125', title: 'Cool Movie 2: Die Harder' },
      { code: 'abc126', title: 'Too Cool, Too Movie' }
    ]);

    await render(hbs`{{side-nav rounds=rounds}}`);

    assert.equal(this.element.querySelectorAll('[data-scroll-to]').length, 3);
    assert.ok(this.element.querySelector('[href="#abc123"]'), 'first item is anchored');
    assert.ok(this.element.querySelector('[href="#abc125"]'), 'second item is anchored');
    assert.ok(this.element.querySelector('[href="#abc126"]'), 'third item is anchored');
    assert.equal(this.element.querySelector('[href="#abc123"]').textContent.trim(), 'Cool Movie');
    assert.equal(this.element.querySelector('[href="#abc125"]').textContent.trim(), 'Cool Movie 2: Die Harder');
    assert.equal(this.element.querySelector('[href="#abc126"]').textContent.trim(), 'Too Cool, Too Movie');
  });
});
