const MINKAAPI = require( "../minka_api" );
const ProviderAuthorization = require( "../models/provider_authorization" );

const ProviderAuthorizations = class ProviderAuthorizations {
  static search( params, opts = { } ) {
    return MINKAAPI.get( "provider_authorizations", params, { ...opts, useAuth: true } )
      .then( ProviderAuthorization.typifyResultsResponse );
  }

  static delete( params, options ) {
    let endpoint = "provider_authorizations/:id";
    if ( MINKAAPI.writeApiURL && MINKAAPI.writeApiURL.match( /\/v\d/ ) ) {
      endpoint = "provider_authorizations/:id";
    }
    return MINKAAPI.delete( endpoint, params, options );
  }
};

module.exports = ProviderAuthorizations;
