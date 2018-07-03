import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { set } from '@ember/object';

export default Component.extend({
  tagName: 'nav',
  classNames: ['nav'],
  classNameBindings: ['isShown:nav__mobile--show'],
  navToggle: service('nav-toggle'),
  isShown: alias('navToggle.showNav'),

  click() {
    set(this, 'navToggle.showNav', false);
    this._super(...arguments);
  }
});
