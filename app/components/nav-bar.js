import Component from '@ember/component';
import { get } from '@ember/object';

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
