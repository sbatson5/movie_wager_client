import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default Component.extend({
  tagName: 'nav',
  classNames: ['nav'],
  classNameBindings: ['isShown:nav__mobile--show'],
  navToggle: service('nav-toggle'),
  isShown: alias('navToggle.showNav'),

  actions: {
    logoutUser() {
      get(this, 'session').logoutUser();
    }
  }
});
