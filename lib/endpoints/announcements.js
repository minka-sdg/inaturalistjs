const MINKAAPI = require( "../minka_api" );
const Announcement = require( "../models/announcement" );

const announcements = class announcements {
  static search( params, options ) {
    return MINKAAPI.get( "announcements", params, { ...options, useAuth: true } )
      .then( Announcement.typifyInstanceResponse );
  }

  static dismiss( params, options ) {
    return MINKAAPI.put( "announcements/:id/dismiss", params, options );
  }
};

module.exports = announcements;
