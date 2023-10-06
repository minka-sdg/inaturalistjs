const MINKAAPI = require( "../minka_api" );
const Annotation = require( "../models/annotation" );

const annotations = class annotations {
  static create( params, options ) {
    return MINKAAPI.post( "annotations", params, options )
      .then( Annotation.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return MINKAAPI.delete( "annotations/:id", params, options );
  }

  static vote( params, options ) {
    let endpoint = "votes/vote/annotation/:id";
    if ( MINKAAPI.apiURL && MINKAAPI.apiURL.match( /\/v2/ ) ) {
      endpoint = "annotations/:id/vote";
    }
    return MINKAAPI.post( endpoint, params, options )
      .then( Annotation.typifyInstanceResponse );
  }

  static unvote( params, options ) {
    let endpoint = "votes/unvote/annotation/:id";
    if ( MINKAAPI.apiURL && MINKAAPI.apiURL.match( /\/v2/ ) ) {
      endpoint = "annotations/:id/vote";
    }
    return MINKAAPI.delete( endpoint, params, options );
  }
};

module.exports = annotations;
