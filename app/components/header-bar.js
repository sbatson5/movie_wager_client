import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'header',
  classNames: ['header'],
  navToggle: service('nav-toggle'),

  actions: {
    logoutUser() {
      get(this, 'session').logoutUser();
    },

    toggleSideNav() {
      get(this, 'navToggle').toggleProperty('showNav');
    }
  }
});
