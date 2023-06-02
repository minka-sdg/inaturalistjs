const iNaturalistAPI = require( "../inaturalist_api" );
const Announcement = require( "../models/announcement" );

const announcements = class announcements {
  static search( params, options ) {
    return iNaturalistAPI.get( "announcements", params, { ...options, useAuth: true } )
      .then( Announcement.typifyInstanceResponse );
  }

  static dismiss( params, options ) {
    return iNaturalistAPI.put( "announcements/:id/dismiss", params, options );
  }
};

module.exports = announcements;
