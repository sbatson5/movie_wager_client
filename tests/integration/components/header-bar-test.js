import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'movie-wager-client/tests/helpers/stub-service';

let originalDate;
let originalMonth;
let originalDay;

module('Integration | Component | header-bar', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(() => {
    originalDate = window.Date.prototype.getDate;
    originalMonth = window.Date.prototype.getMonth;
    originalDay = window.Date.prototype.getDay;
    window.Date.prototype.getDate = () => 9;
    window.Date.prototype.getMonth = () => 10;
    window.Date.prototype.getDay = () => 4;
  });

  hooks.afterEach(() => {
     window.Date.prototype.getDate = originalDate;
     window.Date.prototype.getMonth = originalMonth;
     window.Date.prototype.getDay = originalDay;
  });

  test('it renders date and user information', async function(assert) {
    stubService('session', {
      isAuthenticated: true,
      currentUser: {
        givenName: 'Billy',
        profileImageUrl: 'http://funny.org/img.jpg'
      }
    });

    await render(hbs`{{header-bar}}`);

    assert.equal(this.element.querySelector('.t-name').textContent.trim(), 'Billy');
    assert.equal(this.element.querySelector('.header__date').textContent.trim(), 'THU, 9 NOV');
  });

  test('it does not show user information when logged out', async function(assert) {
    stubService('session', {
      isAuthenticated: false
    });

    await render(hbs`{{header-bar}}`);

    assert.notOk(this.element.querySelector('.t-name'));
    assert.equal(this.element.querySelector('.header__date').textContent.trim(), 'THU, 9 NOV');
  });
});
