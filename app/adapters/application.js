import DS from 'ember-data';
import config from 'netflix-move-ui/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.apiUri,
  namespace: 'api'
});
