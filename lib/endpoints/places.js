const MINKAAPI = require( "../minka_api" );
const Place = require( "../models/place" );

const places = class places {
  static fetch( ids, params, opts = { } ) {
    return MINKAAPI.fetch( "places", ids, params, opts )
      .then( Place.typifyResultsResponse );
  }

  static autocomplete( params, opts = { } ) {
    if ( MINKAAPI.apiURL && MINKAAPI.apiURL.match( /\/v2/ ) ) {
      throw ( new Error( "API v2 does not support places.autocomplete. Use places.search instead." ) );
    }
    return MINKAAPI.get( "places/autocomplete", params, opts )
      .then( Place.typifyResultsResponse );
  }

  static search( params, opts = { } ) {
    if ( MINKAAPI.apiURL && MINKAAPI.apiURL.match( /\/v1/ ) ) {
      throw ( new Error( "API v1 does not support places.search. Use places.autocomplete instead." ) );
    }
    return MINKAAPI.get( "places", params, opts )
      .then( Place.typifyResultsResponse );
  }

  static containing( params, opts = { } ) {
    return MINKAAPI.get( "places/containing", params, opts )
      .then( Place.typifyResultsResponse );
  }
};

module.exports = places;
