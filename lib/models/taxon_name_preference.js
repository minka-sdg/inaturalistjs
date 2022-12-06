const Model = require( "./model" );

const TaxonNamePreference = class TaxonNamePreference extends Model {
  static typifyInstanceResponse( response ) {
    return super.typifyInstanceResponse( response, TaxonNamePreference );
  }
};

module.exports = TaxonNamePreference;
