const MINKAAPI = require( "../minka_api" );
const Photo = require( "../models/photo" );

const photos = class photos {
  static create( params, options ) {
    return MINKAAPI.upload( "photos", params, options );
  }

  static update( params, options ) {
    return MINKAAPI.put( "photos/:id", params, options )
      .then( Photo.typifyInstanceResponse );
  }
};

module.exports = photos;
