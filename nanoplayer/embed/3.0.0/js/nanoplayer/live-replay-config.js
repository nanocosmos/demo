// live-replay-config
// live + replay player configuration, composed from the nanoplayer config
// (c) 2021 - 2026, nanocosmos gmbh
// https://www.nanocosmos.de

// NanoPlayer Embed 3.0.0

/* eslint-disable no-undef, no-console, no-unused-vars */

// LIVE + REPLAY (optional): enabled with ?replay=true (or any ?replay.* param, e.g. ?replay.baseUrl=...)
// Needs NANOPLAYER-CONFIG.JS loaded first: nanoPlayerConfig, params and paramsObject come from there,
// and LIVE-REPLAY-EVENTS.JS for liveReplayEvents.

// live + replay player (fonts included) - major version 1, always the latest 1.x
var liveReplayUrl = 'https://demo.nanocosmos.de/nanoplayer/live-replay/live-replay.1.min.js';
// hls.js for the recording, pinned to a tested version - change it here to upgrade
var liveReplayHlsUrl = 'https://cdn.jsdelivr.net/npm/hls.js@1.7.3/dist/hls.min.js';

function isLiveReplayEnabled () {
    var replay = paramsObject.replay;
    return replay === true || replay === 1 || (!!replay && typeof replay === 'object');
}

// LIVE + REPLAY STYLE OPTIONS - style keys nanoPlayer does not know, so NANOPLAYER-CONFIG.JS drops them;
// read here from the URL instead. A value with commas (rgba(...)) arrives split into a list - joined back.
// ?style.seekBarLiveColor=... colours the played part of the seek bar and the drag handle at the live edge,
// ?style.seekBarReplayColor=... the same on the recording (defaults: orange live, blue replay)
var liveReplayStyleKeys = ['seekBarLiveColor', 'seekBarReplayColor'];
function liveReplayStyle () {
    var style = Object.assign({}, nanoPlayerConfig.style);
    var fromUrl = paramsObject.style || {};
    liveReplayStyleKeys.forEach(function (key) {
        var value = fromUrl[key];
        if (Array.isArray(value)) {
            value = value.join(',');
        }
        if (typeof value === 'string' && value !== '') {
            style[key] = value;
        }
    });
    return style;
}

// CONFIG: the same nanoPlayerConfig as the default player (source, playback, style, events),
// plus the live + replay options
var liveReplayConfig = Object.assign({}, nanoPlayerConfig, {
    // nanoPlayer's style options plus the live + replay ones (style.seekBarLiveColor, style.seekBarReplayColor)
    'style'            : liveReplayStyle(),
    // ?replay.baseUrl=... overrides the recording location, ?replay=true keeps the default
    'replay'           : typeof paramsObject.replay === 'object' ? paramsObject.replay : undefined,
    // ?debug=1 logs every live / replay decision to the console as [LiveReplay]
    'debug'            : Object.prototype.hasOwnProperty.call(params, 'debug'),
    // embed style: the player fills #playerDiv, nothing renders below it
    'layout'           : 'fill',
    // TO GET THE LIVE + REPLAY EVENTS FROM LIVE-REPLAY-EVENTS.JS (the nanoPlayer events come with nanoPlayerConfig)
    'liveReplayEvents' : liveReplayEvents
});
