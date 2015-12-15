/**
 * Created by alykoshin on 7/18/14.
 */

'use strict';


if ( typeof module !== 'undefined' && typeof require !== 'undefined') {
  var debug   = require('mini-debug');
  var emitter = require('mini-emitter');
}

/**
 *
 * @constructor
 * @param {MediaStream} stream
 * @returns {WebapiMediaStream}
 */
var WebapiMediaStream = function( stream ) {
  var self = this;
  emitter(self);

  // Private properties

  // Public properties

  self.stream = stream;

  // Stream event handlers

  self.stream.onactive = function(evt) {
    debug.log('WebapiMediaStream.stream.onactive(): evt:', evt);
    self.emit('_active', evt);
  };

  self.stream.onaddtrack = function(evt) {
    debug.log('WebapiMediaStream.stream.onaddtrack(): evt:', evt);
    self.emit('_addtrack', evt);
  };

  self.stream.onended = function(evt) {
    debug.log('WebapiMediaStream.stream.onended(): evt:', evt);
    self.emit('_ended', evt);
  };

  self.stream.oninactive = function(evt) {
    debug.log('WebapiMediaStream.stream.oninactive(): evt:', evt);
    self.emit('_inactive', evt);
  };

  self.stream.onremovetrack = function(evt) {
    debug.log('WebapiMediaStream.stream.onremovetrack(): evt:', evt);
    self.emit('_removetrack', evt);
  };

  //

  self.isActive = function() { return self.stream.active; };
  self.isEnded  = function() { return self.stream.ended; };

  self.addTrack       = function(track) { return self.stream.addTrack(track);    };
  self.clone          = function()      { var cloned = self.stream.clone(); return new WebapiMediaStream(cloned); };
  self.getAudioTracks = function()      { return self.stream.getAudioTracks();   };
  self.getTrackById   = function(id)    { return self.stream.getTrackById(id);   };
  self.getTracks      = function()      { return self.stream.getTracks();        };
  self.getVideoTracks = function()      { return self.stream.getVideoTracks();   };
  self.removeTrack    = function()      { return self.stream.removeTrack(track); };

  //

  return self;
};

//

if (typeof module !== 'undefined') {
  module.exports = WebapiMediaStream;
}

if (typeof window !== 'undefined') {
  window.WebapiMediaStream = WebapiMediaStream;
}
