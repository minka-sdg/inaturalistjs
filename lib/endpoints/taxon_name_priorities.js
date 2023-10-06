const MINKAAPI = require( "../minka_api" );
const TaxonNamePriority = require( "../models/taxon_name_priority" );

const taxonNamePriorities = class taxonNamePriorities {
  static create( params, options ) {
    return MINKAAPI.post( "taxon_name_priorities", params, options )
      .then( TaxonNamePriority.typifyInstanceResponse );
  }

  static update( params, options ) {
    return MINKAAPI.put( "taxon_name_priorities/:id", params, options )
      .then( TaxonNamePriority.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return MINKAAPI.delete( "taxon_name_priorities/:id", params, options );
  }
};

module.exports = taxonNamePriorities;
