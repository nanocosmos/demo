// nanoplayer-main
// nanoplayer main entry
// (c) 2021 - 2023, nanocosmos gmbh
// https://www.nanocosmos.de

// NanoPlayer Embed 1.3.3

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
function createPlayer () {
    nanoPlayer = new NanoPlayer('playerDiv');
    // nanoPlayerConfig from NANOPLAYER-CONFIG.JS
    nanoPlayer.setup(nanoPlayerConfig).then(function (config) {
        console.log('Setup: ' + JSON.stringify(config, undefined, 4));
    }, function (error) {
        console.error(error.message);
    });
}
