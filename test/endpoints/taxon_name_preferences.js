const { expect } = require( "chai" );
const nock = require( "nock" );
const taxonNamePreferences = require( "../../lib/endpoints/taxon_name_preferences" );

describe( "TaxonNamePreferences", ( ) => {
  describe( "create", ( ) => {
    it( "posts to /taxon_name_preferences", done => {
      nock( "http://localhost:3000" )
        .post( "/taxon_name_preferences" )
        .reply( 200, { id: 1 } );
      taxonNamePreferences.create( { lexicon: "english" } ).then( ( ) => {
        done( );
      } );
    } );
  } );

  describe( "delete", ( ) => {
    it( "deletes to /taxon_name_preferences/:id", done => {
      nock( "http://localhost:3000" )
        .delete( "/taxon_name_preferences/1" )
        .reply( 200, { id: 1 } );
      taxonNamePreferences.delete( { id: 1 } ).then( ( ) => {
        done( );
      } );
    } );

    it( "throws errors", done => {
      taxonNamePreferences.delete( { any: "thing" } ).catch( e => {
        expect( e.message ).to.eq( "id required" );
        done( );
      } );
    } );
  } );
} );
