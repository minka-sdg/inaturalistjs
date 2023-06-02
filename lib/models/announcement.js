const Model = require( "./model" );

const Announcement = class Announcement extends Model {
  static typifyInstanceResponse( response ) {
    return super.typifyInstanceResponse( response, Announcement );
  }
};

module.exports = Announcement;
