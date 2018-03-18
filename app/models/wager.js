import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  user: belongsTo('user'),
  round: belongsTo('round'),

  amount: attr('number'),
  place: attr('number')
});
