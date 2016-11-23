import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  isNewRound: false,

  submit(event) {
    event.preventDefault();
    let submitAction = this.get('submitAction');
    submitAction();
  }
});
