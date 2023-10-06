const MINKAAPI = require( "../minka_api" );
const Relationship = require( "../models/relationship" );

const relationships = class relationships {
  static create( params, options ) {
    return MINKAAPI.post( "relationships", params, options )
      .then( Relationship.typifyInstanceResponse );
  }

  static search( params, options ) {
    let useWriteApi = false;
    if ( MINKAAPI.writeApiURL && MINKAAPI.writeApiURL.match( /\/v\d/ ) ) {
      useWriteApi = true;
    }
    const opts = {
      ...options,
      useWriteApi,
      useAuth: true
    };
    return MINKAAPI.get( "relationships", params, opts )
      .then( Relationship.typifyResultsResponse );
  }

  static update( params, options ) {
    return MINKAAPI.put( "relationships/:id", params, options );
  }

  static delete( params, options ) {
    return MINKAAPI.delete( "relationships/:id", params, options );
  }
};

module.exports = relationships;
