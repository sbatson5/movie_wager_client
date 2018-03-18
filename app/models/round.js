import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  code: attr('string'),
  startDate: attr('date'),
  endDate: attr('date'),
  boxOfficeAmount: attr('number'),
  title: attr('string')
});
