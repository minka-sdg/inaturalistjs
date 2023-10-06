const MINKAAPI = require( "../minka_api" );
const ControlledTerm = require( "../models/controlled_term" );

const typifyResponse = response => {
  const typifiedResponse = ControlledTerm.typifyResultsResponse( response );
  for ( let i = 0; i < typifiedResponse.results.length; i += 1 ) {
    if ( typifiedResponse.results[i] && !typifiedResponse.results[i].values ) {
      typifiedResponse.results[i].values = typifiedResponse.results[i].values.map(
        v => ( new ControlledTerm( v ) )
      );
    }
  }
  return typifiedResponse;
};

const controlledTerms = class controlledTerms { // eslint-disable-line camelcase
  static for_taxon( params, opts = { } ) { // eslint-disable-line camelcase
    if ( MINKAAPI.apiURL && MINKAAPI.apiURL.match( /\/v2/ ) ) {
      const taxonIds = params.taxon_id.toString( ).split( "," ).join( "," );
      const newParams = Object.assign( {}, params );
      delete newParams.taxon_id;
      return MINKAAPI.get( `controlled_terms/for_taxon/${taxonIds}`, newParams, opts ).then( typifyResponse );
    }
    return MINKAAPI.get( "controlled_terms/for_taxon", params, opts ).then( typifyResponse );
  }

  static search( params, opts = { } ) {
    return MINKAAPI.get( "controlled_terms", params, opts ).then( typifyResponse );
  }
};

module.exports = controlledTerms; // eslint-disable-line camelcase
