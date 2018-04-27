import Controller from '@ember/controller';
import ENV from '../config/environment';

export default Controller.extend({
  buildGoogUrl() {
    let url = 'https://accounts.google.com/o/oauth2/auth',
    type = 'response_type=code',
    client = `client_id=${ENV.googleCredentials.apiKey}`,
    redirect = `redirect_uri=${ENV.googleCredentials.redirectUri}`,
    scope = `scope=${ENV.googleCredentials.scope}`;

    let queryString = [type, client, redirect, scope].join('&');
    return `${url}?${queryString}`
  },

  actions: {
    authenticateSession() {
      window.location.href = this.buildGoogUrl();
    }
  }
});
