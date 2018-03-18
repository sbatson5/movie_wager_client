import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  tagName: 'form',
  classNames: ['movie-round-form'],
  isNewRound: false,

  submit(event) {
    event.preventDefault();
    let submitAction = get(this, 'submitAction');
    submitAction();
  }
});
