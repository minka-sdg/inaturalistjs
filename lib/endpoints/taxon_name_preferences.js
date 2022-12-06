const iNaturalistAPI = require( "../inaturalist_api" );
const TaxonNamePreference = require( "../models/taxon_name_preference" );

const taxonNamePreferences = class taxonNamePreferences {
  static create( params, options ) {
    return iNaturalistAPI.post( "taxon_name_preferences", params, options )
      .then( TaxonNamePreference.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return iNaturalistAPI.delete( "taxon_name_preferences/:id", params, options );
  }
};

module.exports = taxonNamePreferences;
