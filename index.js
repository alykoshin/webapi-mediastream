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

  /**
   * @memberOf WebapiMediaStream
   * @type {MediaStream}
   */
  self.stream = stream;

  self.muted        = false;
  self.videoEnabled = true;
  self.audioEnabled = true;

  // Stream event handlers

  self.stream.onactive = function(evt) {
    debug.log('WebapiMediaStream.stream.onactive(): evt:', evt);
    self.emit('active', evt);
  };

  self.stream.onaddtrack = function(evt) {
    debug.log('WebapiMediaStream.stream.onaddtrack(): evt:', evt);
    self.emit('addtrack', evt);
  };

  self.stream.onended = function(evt) {
    debug.log('WebapiMediaStream.stream.onended(): evt:', evt);
    self.emit('ended', evt);
  };

  self.stream.oninactive = function(evt) {
    debug.log('WebapiMediaStream.stream.oninactive(): evt:', evt);
    self.emit('inactive', evt);
  };

  self.stream.onremovetrack = function(evt) {
    debug.log('WebapiMediaStream.stream.onremovetrack(): evt:', evt);
    self.emit('removetrack', evt);
  };

  // Public methods - Stream control

  self.stop = function() {
    debug.log('WebapiMediaStream.stop()');
    stream.stop();
  };

  self.hasAudio = function() {
    return self.stream.getAudioTracks().length > 0;
  };

  self.setAudioEnabled = function(value) {
    debug.debug('WebapiMediaStream.setAudioEnabled('+value+')');
    self.audioEnabled = value;
    var audioTracks = self.stream.getAudioTracks();
    for ( var i = 0, l = audioTracks.length; i < l; i++ ) {
      audioTracks[i].enabled = value;
    }
  };

  self.toggleAudioEnabled = function() {
    debug.debug('WebapiMediaStream.toggleAudioEnabled()');
    self.setAudioEnabled( ! self.audioEnabled );
  };

  self.hasVideo = function() {
    return self.stream.getVideoTracks().length > 0;
  };

  self.setVideoEnabled = function(value) {
    // Muting for screencast is disabled
    // https://code.google.com/p/chromium/codesearch#chromium/src/third_party/libjingle/source/talk/media/webrtc/webrtcvideoengine.cc&q=Disable%20muting%20for%20screencast.&sq=package:chromium&type=cs&l=3232
    //
    debug.debug('WebapiMediaStream.setVideoEnabled('+value+')');
    self.videoEnabled = value;
    var tracks = self.stream.getVideoTracks();
    for ( var i = 0, l = tracks.length; i < l; i++ ) {
      tracks[i].enabled = value;
    }
  };

  self.toggleVideoEnabled = function() {
    // Muting for screencast is disabled
    // https://code.google.com/p/chromium/codesearch#chromium/src/third_party/libjingle/source/talk/media/webrtc/webrtcvideoengine.cc&q=Disable%20muting%20for%20screencast.&sq=package:chromium&type=cs&l=3232
    debug.debug('WebapiMediaStream.toggleVideoEnabled()');
    self.setVideoEnabled( ! self.videoEnabled );
  };

  self.setAudioEnabled(self.audioEnabled);

  self.setVideoEnabled(self.videoEnabled);

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
