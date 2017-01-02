import DS from 'ember-data';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend({
  code: attr('string'),
  startDate: attr('date'),
  endDate: attr('date'),
  boxOfficeAmount: attr('number'),
  title: attr('string'),
  movieDetail: belongsTo('movieDetail')
});
