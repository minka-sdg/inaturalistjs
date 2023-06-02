const Model = require( "./model" );

const TaxonNamePriority = class TaxonNamePriority extends Model {
  static typifyInstanceResponse( response ) {
    return super.typifyInstanceResponse( response, TaxonNamePriority );
  }
};

module.exports = TaxonNamePriority;
