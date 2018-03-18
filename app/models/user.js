import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  familyName: attr('string'),
  gender: attr('string'),
  givenName: attr('string'),
  locale: attr('string'),
  name: attr('string'),
  picture: attr('string'),
  verifiedEmail: attr('boolean')
});
