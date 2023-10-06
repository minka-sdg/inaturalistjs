const MINKAAPI = require( "../minka_api" );
const Identification = require( "../models/identification" );
const Taxon = require( "../models/taxon" );
const User = require( "../models/user" );
const Observation = require( "../models/observation" );

const identifications = class identifications {
  static create( params, options ) {
    return MINKAAPI.post( "identifications", params, options )
      .then( Identification.typifyInstanceResponse );
  }

  static update( params, options ) {
    return MINKAAPI.put( "identifications/:id", params, options )
      .then( Identification.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return MINKAAPI.delete( "identifications/:id", params, options );
  }

  static similar_species( params, opts ) { // eslint-disable-line camelcase
    const options = Object.assign( { }, opts || { } );
    options.useAuth = true;
    return MINKAAPI.get( "identifications/similar_species", params, options )
      .then( response => {
        if ( response.results ) {
          response.results = response.results.map( r => (
            Object.assign( { }, r, { taxon: new Taxon( r.taxon ) } )
          ) );
        }
        return response;
      } );
  }

  static recent_taxa( params, opts ) { // eslint-disable-line camelcase
    const options = Object.assign( { }, opts || { } );
    options.useAuth = true;
    return MINKAAPI.get( "identifications/recent_taxa", params, options )
      .then( response => {
        if ( response.results ) {
          response.results = response.results.map( res => {
            const r = Object.assign( { }, res );
            r.taxon = new Taxon( r.taxon );
            r.identification = new Identification( r.identification );
            if ( r.identification?.observation?.identifications ) {
              delete r.identification.observation.identifications;
            }
            r.identification.observation = new Observation( r.identification.observation );
            return r;
          } );
        }
        return response;
      } );
  }

  static recent_taxa_revisited( params, opts ) { // eslint-disable-line camelcase
    const options = Object.assign( { }, opts || { } );
    options.useAuth = true;
    return MINKAAPI.get( "identifications/recent_taxa_revisited", params, options )
      .then( response => {
        if ( response.results ) {
          response.results = response.results.map( res => {
            const r = Object.assign( { }, res );
            r.taxon = new Taxon( r.taxon );
            r.identification = new Identification( r.identification );
            if ( r.identification?.observation?.identifications ) {
              delete r.identification.observation.identifications;
            }
            r.identification.observation = new Observation( r.identification.observation );
            return r;
          } );
        }
        return response;
      } );
  }

  static identifiers( params, options ) {
    return MINKAAPI.get( "identifications/identifiers", params, options )
      .then( response => {
        if ( response.results ) {
          response.results = response.results.map( r => (
            Object.assign( { }, r, { user: new User( r.user ) } )
          ) );
        }
        return response;
      } );
  }

  static categories( params, opts = { } ) {
    return MINKAAPI.get( "identifications/categories", params, opts );
  }
};

module.exports = identifications;
