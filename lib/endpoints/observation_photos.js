const MINKAAPI = require( "../minka_api" );

const observationPhotos = class observationPhotos {
  static create( params, options ) {
    if ( MINKAAPI.apiURL && MINKAAPI.apiURL.match( /\/v2/ ) && !params.file ) {
      // For API v2, observation_photos creation endpoint shouldn't receive a
      // 'file' input param - however, if we use the 'upload' method, it will
      // send the POST request as a multipart request, which will
      // make the server require the file param.
      return MINKAAPI.post( "observation_photos", params, options );
    }

    return MINKAAPI.upload( "observation_photos", params, options );
  }

  static update( params, opts ) {
    const options = Object.assign( { }, opts );

    if ( MINKAAPI.apiURL && MINKAAPI.apiURL.match( /\/v2/ ) ) {
      return MINKAAPI.put( "observation_photos/:id", params, options );
    }

    options.method = "PUT";
    return MINKAAPI.upload( "observation_photos/:id", params, options );
  }

  static delete( params, options ) {
    return MINKAAPI.delete( "observation_photos/:id", params, options );
  }
};

module.exports = observationPhotos;
