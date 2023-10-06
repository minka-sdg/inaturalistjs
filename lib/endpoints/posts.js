const MINKAAPI = require( "../minka_api" );
const Post = require( "../models/post" );

const posts = class posts {
  static search( params, options ) {
    return MINKAAPI.get( "posts", params, options )
      .then( Post.typifyArrayResponse );
  }

  static for_user( params, options ) { // eslint-disable-line camelcase
    return MINKAAPI.get( "posts/for_user", params, { ...options, useAuth: true } )
      .then( Post.typifyArrayResponse );
  }

  static create( params, options ) {
    return MINKAAPI.post( "posts", params, options )
      .then( Post.typifyInstanceResponse );
  }

  static update( params, options ) {
    return MINKAAPI.put( "posts/:id", params, options )
      .then( Post.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return MINKAAPI.delete( "posts/:id", params, options );
  }
};

module.exports = posts;
