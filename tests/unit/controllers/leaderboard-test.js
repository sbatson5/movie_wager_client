import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | leaderboard', function(hooks) {
  setupTest(hooks);

  test('it sorts users from wagers', function(assert) {
    let controller = this.owner.lookup('controller:leaderboard');
    controller.set('wagers', [
      { user: 'foo' },
      { user: 'bar' },
      { user: 'baz' }
    ]);

    let expected = ['foo', 'bar', 'baz'];
    assert.deepEqual(controller.get('userList'), expected);
  });

  test('it properly groups users', function(assert) {
    const wagers = [
      { user: { name: 'foo', profileImageUrl: 'blahblah'} },
      { user: { name: 'foo', profileImageUrl: 'blahblah'} },
      { user: { name: 'bar', profileImageUrl: 'blergh'} },
      { user: { name: 'baz', profileImageUrl: 'bloop'} }
    ];
    let controller = this.owner.lookup('controller:leaderboard');
    controller.set('wagers', wagers);

    let expected = [
      { name: 'foo', profileImageUrl: 'blahblah', count: 2},
      { name: 'bar', profileImageUrl: 'blergh', count: 1},
      { name: 'baz', profileImageUrl: 'bloop', count: 1}
    ];

    assert.deepEqual(controller.get('groupedUsers'), expected);
  });
});
