import DS from 'ember-data';
import config from 'movie-wager-client/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.apiUri,
  namespace: 'api'
});
