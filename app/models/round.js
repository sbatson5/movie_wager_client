import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  code: attr('string'),
  endDate: attr('date'),
  boxOfficeAmount: attr('number'),
  title: attr('string'),
  website: attr('string'),
  plot: attr('string'),
  poster: attr('string')
});
