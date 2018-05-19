/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'movie-wager-client',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    apiUri: 'http://localhost:4000',

    flashMessageDefaults: {
      extendedTimeout: 400,
      timeout: 2000
    },

    EmberENV: {
      FEATURES: {
      },
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },

    APP: {},

    'ember-simple-auth': {
      authenticationRoute: 'sign-in'
    },

    googleCredentials: {
      apiKey: '345417739633-rv5u2i554m9k88ero9qehfi47qutdb1f.apps.googleusercontent.com',
      redirectUri: 'http://localhost:4200/google-redirect',
      scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
    },
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
    ENV.APP.autoboot = false;
    delete ENV.apiUri;
  }

  if (environment === 'production') {
    ENV.googleCredentials['redirectUri'] = 'https://moviewager.herokuapp.com/google-redirect';
    ENV.apiUri = 'https://moviewagerbackend.herokuapp.com';
  }

  return ENV;
};
