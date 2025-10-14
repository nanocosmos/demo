// nanoplayer-events
// nanoplayer sample event handlers and logging
// (c) 2021 - 2025, nanocosmos gmbh
// https://www.nanocosmos.de

// NanoPlayer Embed 2.0.0

/* eslint-disable no-undef, no-console, no-unused-vars */
var events = {};

events.onReady = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onPlay = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onPause = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onLoading = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onStartBuffering = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onStopBuffering = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onError = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onWarning = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onMetaData = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
// Beware that this event is fired frequently (each 100msec with infomration source) and can clutter the console quickly.
events.onStats = function (event) {
    // console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onMute = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onUnmute = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onVolumeChange = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onStreamInfo = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onStreamInfoUpdate = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onDestroy = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onUpdateSourceInit = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onUpdateSourceSuccess = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onUpdateSourceFail = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onUpdateSourceAbort = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onSwitchStreamInit = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onSwitchStreamSuccess = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onSwitchStreamFail = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onSwitchStreamAbort = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
events.onFullscreenChange = function (event) {
    console.log(event.name + ': ' + JSON.stringify(event.data, undefined, 4));
    // IF NEEDED DO THINGS HERE
    // ...
};
