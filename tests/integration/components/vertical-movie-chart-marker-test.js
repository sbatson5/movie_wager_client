import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('vertical-movie-chart-marker', 'Integration | Component | vertical movie chart marker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{vertical-movie-chart-marker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#vertical-movie-chart-marker}}
      template block text
    {{/vertical-movie-chart-marker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
