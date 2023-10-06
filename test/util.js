const { expect } = require( "chai" );
const util = require( "../lib/util" );

describe( "MINKAAPI", ( ) => {
  describe( "isBrowser", ( ) => {
    it( "returns true if document.querySelector is defined", ( ) => {
      expect( util.isBrowser( ) ).to.be.false;
      global.document = { querySelector: ( ) => { } };
      expect( util.isBrowser( ) ).to.be.true;
      global.document = undefined;
      expect( util.isBrowser( ) ).to.be.false;
    } );
  } );

  describe( "browserMetaTagContent", ( ) => {
    it( "returns the content attribute of the selector", ( ) => {
      global.document = {
        querySelector: ( ) => (
          { getAttribute: ( ) => "test" }
        )
      };
      expect( util.browserMetaTagContent( "attr" ) ).to.eq( "test" );
      global.document = undefined;
    } );
  } );

  describe( "nodeENV", ( ) => {
    it( "returns nothing if isNode is false", ( ) => {
      expect( util.isNode( ) ).to.be.true;
      const { env } = process;
      process.env = undefined;
      expect( util.isNode( ) ).to.be.false;
      expect( util.nodeENV( "NODE_ENV" ) ).to.not.exist;
      process.env = env;
      expect( util.isNode( ) ).to.be.true;
    } );
  } );
} );
