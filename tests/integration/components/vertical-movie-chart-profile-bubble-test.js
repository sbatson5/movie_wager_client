import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('vertical-movie-chart-profile-bubble', 'Integration | Component | vertical movie chart profile bubble', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{vertical-movie-chart-profile-bubble}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#vertical-movie-chart-profile-bubble}}
      template block text
    {{/vertical-movie-chart-profile-bubble}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
