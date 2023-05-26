const Model = require( "./model" );

const Sound = class Sound extends Model {
  static typifyInstanceResponse( response ) {
    return super.typifyInstanceResponse( response, Sound );
  }
};

module.exports = Sound;
