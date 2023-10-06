const { expect } = require( "chai" );
const nock = require( "nock" );
const places = require( "../../lib/endpoints/places" );
const testHelper = require( "../../lib/test_helper" );

describe( "Places", ( ) => {
  describe( "fetch", ( ) => {
    it( "fetches places by ID", done => {
      nock( "http://localhost:4000" )
        .get( "/v1/places/1" )
        .reply( 200, testHelper.mockResponse );
      places.fetch( 1 ).then( r => {
        expect( r.test_uri ).to.eq( "/v1/places/1" );
        expect( r.constructor.name ).to.eq( "MINKAAPIResponse" );
        expect( r.total_results ).to.eq( 1 );
        expect( r.results[0].constructor.name ).to.eq( "Place" );
        expect( r.results[0].id ).to.eq( 1 );
        done( );
      } );
    } );
  } );
} );
