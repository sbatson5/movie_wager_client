import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'movie-wager-client/tests/helpers/stub-service';

module('Integration | Component | workview-nav', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders logout while signed in', async function(assert) {
    stubService('session', {
      isAuthenticated: true,
      currentUser: {
        name: 'Anita Funnyname',
        profileImageUrl: 'http://funny.org/img.jpg'
      }
    });

    await render(hbs`{{workview-nav}}`);

    assert.equal(this.element.querySelectorAll('.nav__link').length, 3);
    assert.equal(this.element.querySelector('.nav__link').textContent.trim(), 'Logout');
  });
  test('it renders sign in while logged out', async function(assert) {

    await render(hbs`{{workview-nav}}`);

    assert.equal(this.element.querySelectorAll('.nav__link').length, 3);
    assert.equal(this.element.querySelector('.nav__link').textContent.trim(), 'Sign In');
  });
});
