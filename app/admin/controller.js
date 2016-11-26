import Ember from 'ember';

const {
  Controller,
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
        console.log(error);
        flashMessages.danger('Failed');
      });
    }
  }
});
