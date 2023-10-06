const MINKAAPI = require( "../minka_api" );
const ProjectObservation = require( "../models/project_observation" );

const projectObservations = class projectObservations {
  static create( params, options ) {
    return MINKAAPI.post( "project_observations", params, options )
      .then( ProjectObservation.typifyInstanceResponse );
  }

  static update( params, options ) {
    return MINKAAPI.put( "project_observations/:id", params, options )
      .then( ProjectObservation.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return MINKAAPI.delete( "project_observations/:id", params, options );
  }
};

module.exports = projectObservations;
