const MINKAAPI = require( "../minka_api" );
const Project = require( "../models/project" );

const projects = class projects {
  static fetch( ids, params ) {
    return MINKAAPI.fetch( "projects", ids, params )
      .then( Project.typifyResultsResponse );
  }

  static search( params, options ) {
    return MINKAAPI.get( "projects", params, options )
      .then( Project.typifyResultsResponse );
  }

  static autocomplete( params ) {
    return MINKAAPI.get( "projects/autocomplete", params )
      .then( Project.typifyResultsResponse );
  }

  static create( params, options ) {
    return MINKAAPI.upload( "projects", params, options )
      .then( Project.typifyInstanceResponse );
  }

  static update( params, options ) {
    return MINKAAPI
      .upload( "projects/:id", params, Object.assign( { }, options, { method: "put" } ) )
      .then( Project.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return MINKAAPI.delete( "projects/:id", params, options );
  }

  static join( params, options ) {
    let endpoint = "projects/:id/join";
    if ( MINKAAPI.apiURL && MINKAAPI.apiURL.match( /\/v2/ ) ) {
      endpoint = "projects/:id/membership";
    }
    return MINKAAPI.post( endpoint, params, options );
  }

  static leave( params, options ) {
    let endpoint = "projects/:id/leave";
    if ( MINKAAPI.apiURL && MINKAAPI.apiURL.match( /\/v2/ ) ) {
      endpoint = "projects/:id/membership";
    }
    return MINKAAPI.delete( endpoint, params, options );
  }

  static add( params, options ) {
    return MINKAAPI.post( "projects/:id/add", params, options );
  }

  static remove( params, options ) {
    return MINKAAPI.delete( "projects/:id/remove", params, options );
  }

  static posts( params, options ) {
    return MINKAAPI.get( "projects/:id/posts", params, options );
  }

  static subscribe( params, options ) {
    return MINKAAPI.post( "subscriptions/Project/:id/subscribe", params, options );
  }

  static subscriptions( params, options ) {
    return MINKAAPI.get( "projects/:id/subscriptions", params,
      MINKAAPI.optionsUseAuth( options ) );
  }

  static followers( params, options ) {
    return MINKAAPI.get( "projects/:id/followers", params, options );
  }

  static members( params, options ) {
    return MINKAAPI.get( "projects/:id/members", params, options );
  }

  static membership( params, options ) {
    return MINKAAPI.get( "projects/:id/membership", params,
      MINKAAPI.optionsUseAuth( options ) );
  }

  static feature( params, options ) {
    return MINKAAPI.put( "projects/:id/feature", params, options );
  }

  static unfeature( params, options ) {
    return MINKAAPI.put( "projects/:id/unfeature", params, options );
  }
};

module.exports = projects;
