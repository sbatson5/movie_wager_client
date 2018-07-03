import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export default Component.extend({
  tagName: 'header',
  classNames: ['header'],
  navToggle: service('nav-toggle'),

  init() {
    this._super(...arguments);
    let today = new Date();
    this.dayOfTheWeek = DAYS[today.getDay()];
    this.month = MONTHS[today.getMonth()];
    this.day = today.getDate();
  },

  actions: {
    logoutUser() {
      get(this, 'session').logoutUser();
    },

    toggleSideNav() {
      get(this, 'navToggle').toggleProperty('showNav');
    }
  }
});
