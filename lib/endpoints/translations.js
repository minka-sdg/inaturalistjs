const MINKAAPI = require( "../minka_api" );

const translations = class translations {
  static locales( params = { }, options = { } ) {
    return MINKAAPI.get( "translations/locales", params, options );
  }
};

module.exports = translations;
