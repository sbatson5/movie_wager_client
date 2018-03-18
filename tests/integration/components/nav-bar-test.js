import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nav bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders user information', async function(assert) {
    assert.expect(1);

    let currentUser = {
      name: 'Anita Funnyname',
      profileImageUrl: 'http://funny.org/img.jpg'
    };

    this.set('currentUser', currentUser);
    await render(hbs`{{nav-bar currentUser=currentUser}}`);

    assert.equal(this.element.querySelectorAll('.nav-bar__item')[2].textContent.trim(), 'Logout', 'logout link is shown');
  });

  test('it renders sign in link without user', async function(assert) {
    assert.expect(1);

    await render(hbs`{{nav-bar}}`);
    assert.equal(this.element.querySelectorAll('.nav-bar__item')[2].textContent.trim(), 'Sign in', 'logout link is shown');
  });
});
