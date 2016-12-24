import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  user: belongsTo('user'),
  movieRound: belongsTo('movie-round'),

  amount: attr('number'),
  place: attr('number')
});
