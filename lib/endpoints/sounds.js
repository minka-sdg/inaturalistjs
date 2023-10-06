const MINKAAPI = require( "../minka_api" );

const sounds = class sounds {
  static create( params, options ) {
    return MINKAAPI.upload( "sounds", params, options );
  }
};

module.exports = sounds;
