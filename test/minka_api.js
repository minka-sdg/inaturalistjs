const { expect } = require( "chai" );
const nock = require( "nock" );
const sinon = require( "sinon" );
const MINKAAPI = require( "../lib/minka_api" );

describe( "MINKAAPI", ( ) => {
  describe( "thenJson", ( ) => {
    it( "does nothing without text", ( ) => {
      expect( MINKAAPI.thenJson( ) ).to.be.undefined;
    } );
  } );

  describe( "methodHostPrefix", ( ) => {
    it( "returns an empty string if using same_origin", ( ) => {
      expect( MINKAAPI.methodHostPrefix( { same_origin: true } ) ).to.eq( "" );
    } );
  } );

  describe( "csrf", ( ) => {
    it( "returns an empty string if using same_origin", ( ) => {
      global.document = {
        querySelector: ( ) => (
          { getAttribute: ( ) => "test" }
        )
      };
      expect( MINKAAPI.csrf( ) ).to.deep.eq( {
        param: "test",
        token: "test"
      } );
      global.document = undefined;
    } );
  } );

  describe( "apiToken", ( ) => {
    it( "returns an empty string if using same_origin", ( ) => {
      global.document = {
        querySelector: ( ) => (
          { getAttribute: ( ) => "test" }
        )
      };
      expect( MINKAAPI.apiToken( ) ).to.eq( "test" );
      global.document = undefined;
    } );
  } );

  describe( "post", ( ) => {
    it( "will use CSRF if there is no API token", done => {
      const stubApiToken = sinon.stub( MINKAAPI, "apiToken" ).callsFake( ( ) => false );
      const stubCSRF = sinon.stub( MINKAAPI, "csrf" ).callsFake( ( ) => (
        { param: "p", token: "t" }
      ) );
      nock( "http://localhost:3000" )
        .post( "/observations", { taxon_id: 4 } )
        .reply( 200, { id: 1 } );
      const params = { taxon_id: 4 };
      MINKAAPI.post( "observations", params ).then( ( ) => {
        stubApiToken.restore( );
        stubCSRF.restore( );
        done( );
      } );
    } );
  } );

  describe( "interpolateRouteParams", ( ) => {
    it( "interpolate params", ( ) => {
      const r = MINKAAPI.interpolateRouteParams( "/one/:one/two/:two/:three",
        { one: 1, two: 2, three: 3 } );
      expect( r.route ).to.eq( "/one/1/two/2/3" );
      expect( r.err ).to.be.undefined;
    } );

    it( "returns errors in a failed promise", done => {
      const r = MINKAAPI.interpolateRouteParams( "/one/:one/two/:two/:three", { } );
      expect( r.route ).to.eq( "/one/:one/two/:two/:three" );
      expect( r.err.constructor.name ).to.eq( "Promise" );
      r.err.catch( e => {
        expect( e.message ).to.eq( "one required" );
        done( );
      } );
    } );

    it( "should substitute uuid for id if id is missing", ( ) => {
      const uuid = "1234-abcd";
      const r = MINKAAPI.interpolateRouteParams( "/foo/:id", { uuid } );
      expect( r.route ).to.eq( `/foo/${uuid}` );
      expect( r.err ).to.be.undefined;
    } );
  } );

  describe( "headers", ( ) => {
    it( "should include Content-Type for post", done => {
      nock( "http://localhost:3000", { reqheaders: { "Content-Type": "application/json" } } )
        .post( "/observations", { taxon_id: 4 } )
        .reply( 200, { id: 1 } );
      MINKAAPI.post( "observations", { taxon_id: 4 } ).then( ( ) => {
        done( );
      } ).catch( done );
    } );
    it( "should include Content-Type for fetch", done => {
      nock( "http://localhost:4000", { reqheaders: { "Content-Type": "application/json" } } )
        .get( "/v1/observations/1234" )
        .reply( 200, { id: 1 } );
      MINKAAPI.fetch( "observations", [1234] ).then( ( ) => {
        done( );
      } ).catch( done );
    } );
    it( "should include Content-Type for fetch with fields", done => {
      nock( "http://localhost:4000", { reqheaders: { "Content-Type": "application/json" } } )
        .get( "/v1/observations/1234?fields=(observed_on%3A!t)" )
        .reply( 200, { id: 1 } );
      MINKAAPI.fetch( "observations", [1234], { fields: { observed_on: true } } ).then( ( ) => {
        done( );
      } ).catch( done );
    } );
    it( "should pass through arbitrary headers for GET requests", done => {
      nock( "http://localhost:4000", { reqheaders: { "Accept-Language": "es" } } )
        .get( "/v1/observations" )
        .reply( 200, { id: 1 } );
      MINKAAPI.get( "observations", {}, { headers: { "Accept-Language": "es" } } ).then( ( ) => {
        done( );
      } ).catch( done );
    } );
    it( "should pass through arbitrary headers for POST requests", done => {
      nock( "http://localhost:3000", { reqheaders: { "Accept-Language": "es" } } )
        .post( "/observations", { taxon_id: 4 } )
        .reply( 200, { id: 1 } );
      MINKAAPI.post( "observations", { taxon_id: 4 }, { headers: { "Accept-Language": "es" } } ).then( ( ) => {
        done( );
      } ).catch( done );
    } );
    // Not entirely sure how to test this, maybe with a Sinon mock? ~~~kueda 20230905
    it( "should not allow arbitrary headers to override Content-Type" );
  } );
} );
