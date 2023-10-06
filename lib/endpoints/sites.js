const MINKAAPI = require( "../minka_api" );
const Site = require( "../models/site" );

const sites = class sites {
  static search( params, opts = { } ) {
    return MINKAAPI.get( "sites", params, opts )
      .then( Site.typifyResultsResponse );
  }

  static fetch( ids, params, opts = { } ) {
    if ( !ids || ids.length === 0 ) {
      return MINKAAPI.get( "sites", params, opts )
        .then( Site.typifyResultsResponse );
    }
    return MINKAAPI.fetch( "sites", ids, params, opts )
      .then( Site.typifyResultsResponse );
  }
};

module.exports = sites;
