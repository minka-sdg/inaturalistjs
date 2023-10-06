const MINKAAPI = require( "../minka_api" );
const ProjectUser = require( "../models/project_user" );

const projectUsers = class projectUsers {
  static update( params, options ) {
    return MINKAAPI.put( "project_users/:id", params, options )
      .then( ProjectUser.typifyInstanceResponse );
  }
};

module.exports = projectUsers;
