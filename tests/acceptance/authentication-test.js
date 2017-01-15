import { test } from 'qunit';
import moduleForAcceptance from 'movie-wager-client/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | authentication');

test('authentication routes redirect to login page', function(assert) {
  visit('/wager/1');

  andThen(function() {
    assert.equal(currentURL(), '/sign-in');
  });
});
