const MINKAAPI = require( "../minka_api" );
const AuthorizedApplication = require( "../models/authorized_application" );

const authorizedApplications = class authorizedApplications {
  static search( params, opts = { } ) {
    return MINKAAPI.get( "authorized_applications", params, { ...opts, useAuth: true } )
      .then( AuthorizedApplication.typifyResultsResponse );
  }

  static delete( params, options ) {
    let endpoint = "oauth/authorized_applications/:id";
    if ( MINKAAPI.writeApiURL && MINKAAPI.writeApiURL.match( /\/v\d/ ) ) {
      endpoint = "authorized_applications/:id";
    }
    return MINKAAPI.delete( endpoint, params, options );
  }
};

module.exports = authorizedApplications;
