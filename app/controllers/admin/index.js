import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  flashMessages: service('flash-messages'),

  actions: {
    submit() {
      let flashMessages = this.get('flashMessages');
      this.get('round').save().then(() => {
        flashMessages.success('Movie Round Saved');
      }).catch((error) => {
        let errorMessage = get(error, 'errors.firstObject.detail');
        flashMessages.danger(`Failed: ${errorMessage}`);
      });
    }
  }
});
