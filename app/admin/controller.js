import Ember from 'ember';

const {
  Controller,
  get,
  inject: { service }
} = Ember;

export default Controller.extend({
  flashMessages: service(),

  actions: {
    submit() {
      let flashMessages = this.get('flashMessages');
      this.get('movieRound').save().then(() => {
        flashMessages.success('Movie Round Saved');
      }).catch((error) => {
        let errorMessage = get(error, 'errors.firstObject.detail');
        flashMessages.danger(`Failed: ${errorMessage}`);
      });
    }
  }
});
