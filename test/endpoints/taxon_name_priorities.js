const { expect } = require( "chai" );
const nock = require( "nock" );
const taxonNamePriorities = require( "../../lib/endpoints/taxon_name_priorities" );

describe( "TaxonNamePriorities", ( ) => {
  describe( "create", ( ) => {
    it( "posts to /taxon_name_priorities", done => {
      nock( "http://localhost:3000" )
        .post( "/taxon_name_priorities" )
        .reply( 200, { id: 1 } );
      taxonNamePriorities.create( { lexicon: "english" } ).then( ( ) => {
        done( );
      } );
    } );
  } );

  describe( "delete", ( ) => {
    it( "deletes to /taxon_name_priorities/:id", done => {
      nock( "http://localhost:3000" )
        .delete( "/taxon_name_priorities/1" )
        .reply( 200, { id: 1 } );
      taxonNamePriorities.delete( { id: 1 } ).then( ( ) => {
        done( );
      } );
    } );

    it( "throws errors", done => {
      taxonNamePriorities.delete( { any: "thing" } ).catch( e => {
        expect( e.message ).to.eq( "id required" );
        done( );
      } );
    } );
  } );
} );
