import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
  integration: true
});

test('it renders user information', function(assert) {
  assert.expect(3);
  let logout = function() {
    assert.ok(true, 'logout function is called');
  }

  let currentUser = {
    name: 'Anita Funnyname',
    profileImageUrl: 'http://funny.org/img.jpg'
  };

  this.set('currentUser', currentUser);
  this.set('logout', logout);

  this.render(hbs`{{nav-bar currentUser=currentUser logout=logout}}`);

  assert.ok(this.$().find('a:contains("Logout")').length, 'logout link is shown');
  this.$().find('a:contains("Logout")').click();
  let greeting = this.$().find('h6', '.profile').text().trim();
  assert.equal(greeting, 'Hi, Anita Funnyname', 'name is displayed');
});

test('it renders sign in link without user', function(assert) {
  assert.expect(1);

  this.render(hbs`{{nav-bar}}`);
  assert.ok(this.$().find('a:contains("Sign in")').length, 'sign in link is shown');
});
