// live-replay-events
// live + replay sample event handlers and logging
// (c) 2021 - 2026, nanocosmos gmbh
// https://www.nanocosmos.de

// NanoPlayer Embed 3.0.0

/* eslint-disable no-undef, no-console, no-unused-vars */
// Used with ?replay=true, next to NANOPLAYER-EVENTS.JS:
// - the nanoPlayer events (NANOPLAYER-EVENTS.JS) fire in both modes - live and recording -
//   and every event.data carries mode: 'live' | 'replay'
// - the events below exist only in live + replay, same shape: { name, player, data }
var liveReplayEvents = {};

// data: { mode } - 'live' | 'replay', the player switched between live and the recording
liveReplayEvents.onModeChange = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
// data: { live, replay } - what is available right now
liveReplayEvents.onAvailabilityChange = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
// data: { available } - while on the recording: live is back ("Back to Live" is offered)
liveReplayEvents.onLiveAvailable = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
// data: { available } - a recording exists, seeking back is possible
liveReplayEvents.onReplayAvailable = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
// data: { currency } - 'live-dvr' | 'past-session' | 'unknown' | 'unavailable'
liveReplayEvents.onCurrencyChange = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
// data: { active, label } - a live / replay switch is in progress
liveReplayEvents.onTransition = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
// data: { offline, message } - no live and no recording
liveReplayEvents.onOffline = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
// data: { visible } - the replay button is shown: the recording played to its end, or an ended stream's recording waits to be started
liveReplayEvents.onReplayPrompt = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
// data: { fault } - { kind, reason, message, hint, code }, or null when it clears
liveReplayEvents.onFault = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
// data: { streamname } - the streamname the recording is looked up by
liveReplayEvents.onStreamName = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
// data: { width, height, bitrate, name } - the rendition now playing
liveReplayEvents.onQualityChange = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
