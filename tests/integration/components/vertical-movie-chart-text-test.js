import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('vertical-movie-chart-text', 'Integration | Component | vertical movie chart text', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{vertical-movie-chart-text}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#vertical-movie-chart-text}}
      template block text
    {{/vertical-movie-chart-text}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
