/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'movie-wager-client',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',

    flashMessageDefaults: {
      extendedTimeout: 400,
      timeout: 2000
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    'ember-simple-auth': {
      authenticationRoute: 'sign-in'
    },

    torii: {
      sessionServiceName: 'session',
      providers: {
        'google-oauth2': {
          apiKey: '345417739633-rv5u2i554m9k88ero9qehfi47qutdb1f.apps.googleusercontent.com',
          redirectUri: 'http://localhost:4200/torii/redirect.html',
          scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
        }
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
