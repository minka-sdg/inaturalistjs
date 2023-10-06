const MINKAAPI = require( "../minka_api" );
const Flag = require( "../models/flag" );

const flags = class flags {
  static create( params, options ) {
    return MINKAAPI.post( "flags", params, options )
      .then( Flag.typifyInstanceResponse );
  }

  static update( params, options ) {
    return MINKAAPI.put( "flags/:id", params, options )
      .then( Flag.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return MINKAAPI.delete( "flags/:id", params, options );
  }
};

module.exports = flags;
