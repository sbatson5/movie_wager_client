import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:google',
  host: 'https://www.googleapis.com',
  namespace: 'oauth2/v2',
  pathForType() {
    return 'userinfo'
  }
});
