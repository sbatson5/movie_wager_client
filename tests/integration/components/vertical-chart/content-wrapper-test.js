import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('vertical-chart/content-wrapper', 'Integration | Component | vertical chart/content wrapper', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{vertical-chart/content-wrapper}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#vertical-chart/content-wrapper}}
      template block text
    {{/vertical-chart/content-wrapper}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
