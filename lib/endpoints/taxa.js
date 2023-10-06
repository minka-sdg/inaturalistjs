const MINKAAPI = require( "../minka_api" );
const Taxon = require( "../models/taxon" );

const taxa = class taxa {
  static fetch( ids, params, opts = { } ) {
    return MINKAAPI.fetch( "taxa", ids, params, { ...opts, useAuth: true } )
      .then( Taxon.typifyResultsResponse );
  }

  static search( params, opts = { } ) {
    return MINKAAPI.get( "taxa", params, { ...opts, useAuth: true } )
      .then( Taxon.typifyResultsResponse );
  }

  static autocomplete( params, opts = { } ) {
    return MINKAAPI.get( "taxa/autocomplete", params, { ...opts, useAuth: true } )
      .then( Taxon.typifyResultsResponse );
  }

  static suggest( params, opts = { } ) {
    return MINKAAPI.get( "taxa/suggest", params, { ...opts, useAuth: true } ).then( response => {
      response.results = response.results.map( r => (
        { ...r, taxon: new Taxon( r.taxon ) }
      ) );
      return response;
    } );
  }

  static lifelist_metadata( params, opts = { } ) { // eslint-disable-line camelcase
    return MINKAAPI.get( "taxa/lifelist_metadata", params, { ...opts, useAuth: true } )
      .then( Taxon.typifyResultsResponse );
  }

  static wanted( params, opts = { } ) {
    return MINKAAPI.get( "taxa/:id/wanted", params, { ...opts, useAuth: true } )
      .then( response => Taxon.typifyResultsResponse( response ) );
  }
};

module.exports = taxa;
