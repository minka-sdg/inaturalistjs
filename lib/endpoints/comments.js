const MINKAAPI = require( "../minka_api" );
const Comment = require( "../models/comment" );

const comments = class comments {
  static create( params, options ) {
    return MINKAAPI.post( "comments", params, options )
      .then( Comment.typifyInstanceResponse );
  }

  static update( params, options ) {
    return MINKAAPI.put( "comments/:id", params, options )
      .then( Comment.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return MINKAAPI.delete( "comments/:id", params, options );
  }
};

module.exports = comments;
