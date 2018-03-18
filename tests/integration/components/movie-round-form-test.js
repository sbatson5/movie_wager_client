import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | movie round form', function(hooks) {
  setupRenderingTest(hooks);

  test('it calls submit action', async function(assert) {
    let submitAction = () => {
      assert.ok(true, 'submit action is called');
    };

    this.set('submitAction', submitAction);
    await render(hbs`{{movie-round-form submitAction=submitAction}}`);

    await click('button');
  });
});
