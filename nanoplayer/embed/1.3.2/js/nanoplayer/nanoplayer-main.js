// nanoplayer-main
// nanoplayer main entry
// (c) 2022, nanocosmos gmbh
// https://www.nanocosmos.de

// NanoPlayer Embed 1.3.1

/* eslint-disable no-undef, no-console, no-unused-vars */
// This file is necessary to setup player with config properly. Please don't change anything here.
var nanoPlayer;
var nanoPlayerMain = function () {
    console.log('NanoPlayer Embed Version ' + nanoPlayerEmbedVersion);
    nanoPlayer = new NanoPlayer('playerDiv');
    // nanoPlayerConfig from NANOPLAYER-CONFIG.JS
    nanoPlayer.setup(nanoPlayerConfig).then(function (config) {
        console.log('Setup: ' + JSON.stringify(config, undefined, 4));
    }, function (error) {
        console.error(error.message);
    });
};
