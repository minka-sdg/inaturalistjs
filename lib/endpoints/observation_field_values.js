const MINKAAPI = require( "../minka_api" );
const ObservationFieldValue = require( "../models/observation_field_value" );

const observationFieldValues = class observationFieldValues {
  static create( params, options ) {
    return MINKAAPI.post( "observation_field_values", params, options )
      .then( ObservationFieldValue.typifyInstanceResponse );
  }

  static update( params, options ) {
    return MINKAAPI.put( "observation_field_values/:id", params, options )
      .then( ObservationFieldValue.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return MINKAAPI.delete( "observation_field_values/:id", params, options );
  }
};

module.exports = observationFieldValues;
