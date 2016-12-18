import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  tagName: 'div',

  runtime: computed(function() {
    const details = get(this, 'movie.movieDetail');
    return get(details, 'runtime');
  })

});
