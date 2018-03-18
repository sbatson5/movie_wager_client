import Controller, { inject as controller } from '@ember/controller';
import { computed, get } from '@ember/object';

export default Controller.extend({
  application: controller(),

  username: computed('application.currentUser.name', function() {
    return get(this, 'application.currentUser.name');
  })
});
