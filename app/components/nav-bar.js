import Ember from 'ember';

const {
  Component,
  get
} = Ember;

export default Component.extend({
  tagName: 'nav',
  classNames: ['nav-bar'],
  attributeBindings: ['role'],
  role: 'navigation',

  actions: {
    logoutUser() {
      get(this, 'logout')();
    }
  }
});
