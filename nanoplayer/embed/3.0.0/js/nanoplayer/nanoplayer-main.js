// nanoplayer-main
// nanoplayer main entry
// (c) 2021 - 2025, nanocosmos gmbh
// https://www.nanocosmos.de

// NanoPlayer Embed 3.0.0

/* eslint-disable no-undef, no-console, no-unused-vars */
// This file is necessary to setup player with config properly. Please don't change anything here.
var nanoPlayer;
var nanoPlayerMain = function () {
    console.log('NanoPlayer Embed Version ' + nanoPlayerEmbedVersion);
    containerReady().then(createPlayer, function error () {
        console.error('Container: not ready, player creation rejected');
    });
};
function containerReady () {
    return new Promise(function (resolve, reject) {
        var result = false,
            count = 0,
            limit = 10,
            time = 50,
            interval = 0,
            container = document.getElementById('playerDiv'),
            callback = function () {
                count++;
                if (container.clientHeight || container.clientWidth) {
                    console.log('Container: ready after ' + (time * (count - 1)) + ' ms');
                    result = true;
                    count = limit;
                }
                if (count === limit) {
                    window.clearInterval(interval);
                    if (result) {
                        resolve();
                    }
                    else {
                        console.log('Container: not ready after ' + (time * (count - 1)) + ' ms');
                        reject();
                    }
                }
            };
        (interval = window.setInterval(callback, time)) && callback();
    });
}
// LIVE + REPLAY (optional) - liveReplayUrl, liveReplayHlsUrl, isLiveReplayEnabled and liveReplayConfig from LIVE-REPLAY-CONFIG.JS
function loadScript (src) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = function () {
            reject(new Error('failed to load ' + src));
        };
        document.head.appendChild(script);
    });
}
// start downloading while the page is still parsing (the config files have already run);
// hls.js and the player load in parallel - the player only reads window.Hls once replay starts,
// so it is created as soon as its own bundle is there: a failed hls.js download must not stop
// live from playing (the player reports a missing hls.js when a replay starts)
var liveReplayReady = null;
if (isLiveReplayEnabled()) {
    loadScript(liveReplayHlsUrl).catch(function (error) {
        console.error('Live + Replay: ' + error.message);
    });
    liveReplayReady = loadScript(liveReplayUrl);
}
function createLiveReplayPlayer () {
    liveReplayReady.then(function () {
        nanoPlayer = new LiveReplay.LiveReplayPlayer('playerDiv');
        // liveReplayConfig from LIVE-REPLAY-CONFIG.JS
        return nanoPlayer.setup(liveReplayConfig);
    }).then(function () {
        console.log('Live + Replay Version ' + LiveReplay.VERSION);
        console.log('Setup (live + replay): ' + JSON.stringify(liveReplayConfig, undefined, 4));
    }, function (error) {
        console.error('Live + Replay: ' + error.message);
    });
}
function createPlayer () {
    if (isLiveReplayEnabled()) {
        createLiveReplayPlayer();
        return;
    }
    nanoPlayer = new NanoPlayer('playerDiv');
    // nanoPlayerConfig from NANOPLAYER-CONFIG.JS
    nanoPlayer.setup(nanoPlayerConfig).then(function (config) {
        console.log('Setup: ' + JSON.stringify(config, undefined, 4));
    }, function (error) {
        console.error(error.message);
    });
}
