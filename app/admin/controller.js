import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit() {
      this.get('movieRound').save().then(() => {
        console.log('success');
      }).catch((error) => {
        console.log(error);
      });
    }
  }
});
