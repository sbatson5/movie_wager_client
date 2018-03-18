import { moduleForModel, test } from 'ember-qunit';

moduleForModel('wager', 'Unit | Model | wager', {
  needs: ['model:user', 'model:round']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
