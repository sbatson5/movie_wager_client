import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('movie-round-form', 'Integration | Component | movie round form', {
  integration: true
});

test('it renders', function(assert) {

  let submitAction = () => {
    assert.ok(true, 'submit action is called');
  };

  this.set('submitAction', submitAction);
  this.render(hbs`{{movie-round-form submitAction=submitAction}}`);

  let submitButton = this.$().find('button:contains("Submit")');
  submitButton.click();
});
