import Ember from 'ember';

const {
  Controller,
  computed,
  get,
  inject: { controller }
} = Ember;

export default Controller.extend({
  application: controller(),

  username: computed('application.currentUser.name', function() {
    return get(this, 'application.currentUser.name');
  })
});
