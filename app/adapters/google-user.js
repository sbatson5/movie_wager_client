import DS from 'ember-data';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default DS.RESTAdapter.extend({
  googleToken: service('google-token'),

  host: 'https://www.googleapis.com',
  namespace: 'oauth2/v2',
  pathForType() {
    return 'userinfo'
  },

  headers: computed('googleToken.{accessToken,tokenType}', function() {
    let tokenType = get(this, 'googleToken.tokenType');
    let accessToken = get(this, 'googleToken.accessToken');
    return {
      authorization: `${tokenType} ${accessToken}`
    };
  })
});
