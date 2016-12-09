import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  twitterId: attr(),
  name: attr(),
  screenName: attr(),
  profileImageUrl: attr()
});
