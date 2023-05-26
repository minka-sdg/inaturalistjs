/* eslint prefer-destructuring: 0 */

const Model = require( "./model" );
const Taxon = require( "./taxon" );
const Photo = require( "./photo" );
const Sound = require( "./sound" );
const Identification = require( "./identification" );
const Comment = require( "./comment" );

const Observation = class Observation extends Model {
  constructor( attrs ) {
    super( attrs );
    if ( this.private_geojson && this.private_geojson.coordinates ) {
      this.latitude = this.private_geojson.coordinates[1];
      this.longitude = this.private_geojson.coordinates[0];
    } else if ( this.geojson && this.geojson.coordinates ) {
      this.latitude = this.geojson.coordinates[1];
      this.longitude = this.geojson.coordinates[0];
    }
    if ( this.taxon ) {
      this.taxon = new Taxon( this.taxon );
    }
    if ( this.community_taxon ) {
      this.communityTaxon = new Taxon( this.community_taxon );
    }
    if ( this.photos && this.photos.length > 0 ) {
      this.photos = this.photos.map( p => new Photo( p ) );
    }
    if ( this.sounds && this.sounds.length > 0 ) {
      this.sounds = this.sounds.map( s => new Sound( s ) );
    }
    if ( this.comments && this.comments.length > 0 ) {
      this.comments = this.comments.map( c => new Comment( c ) );
    }
    if ( this.identifications && this.identifications.length > 0 ) {
      this.identifications = this.identifications.map( i => new Identification( i ) );
    }
  }

  static typifyResultsResponse( response ) {
    return super.typifyResultsResponse( response, Observation );
  }

  static typifyInstanceResponse( response ) {
    return super.typifyInstanceResponse( response, Observation );
  }

  photo( size = "square" ) {
    this.cachedPhotos = this.cachedPhotos || {};
    if ( this.cachedPhotos[size] ) {
      return this.cachedPhotos[size];
    }
    if ( this.photos && this.photos.length > 0 ) {
      this.cachedPhotos[size] = this.photos[0].photoUrl( size );
    }
    return this.cachedPhotos[size];
  }

  hasPhotos( ) {
    if ( !this.photos || this.photos.length === 0 ) {
      return false;
    }
    let hasPhotos = false;
    this.photos.forEach( p => {
      hasPhotos = hasPhotos || !!p.url;
    } );
    return hasPhotos;
  }

  hasSounds( ) {
    return this.sounds && this.sounds.length > 0;
  }

  hasMedia( ) {
    if ( this.hasPhotos( ) || this.hasSounds( ) ) {
      return true;
    }
    return false;
  }
};

module.exports = Observation;
