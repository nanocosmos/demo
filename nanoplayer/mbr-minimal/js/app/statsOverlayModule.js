/*
nanoStream Player
(c) 2015-2020, nanocosmos gmbh
https://www.nanocosmos.de
sales@nanocosmos.de

LEGAL NOTICE:
This material is subject to the terms and conditions defined in
separate license conditions ('LICENSE.txt' or nanocosmos.de/terms)
All information contained herein is, and remains the property
of nanocosmos GmbH and its suppliers if any. The intellectual and technical concepts
contained herein are proprietary to nanocosmos GmbH, and are protected by trade secret
or copyright law. Dissemination of this information or reproduction of this material
is strictly forbidden unless prior written permission is obtained from nanocosmos.
All modifications will remain property of nanocosmos.
*/
var statsOverlayModule = (function () {
    // cache DOM
    var statsOverlay = document.getElementById('playerStatsOverlay');
    var statsResolution = document.getElementById('statsResolution');
    var statsFrameRate = document.getElementById('statsFrameRate');
    var statsBitrate = document.getElementById('statsBitrate');
    var statsLatency = document.getElementById('statsLatency');

    function update(payload) {
        if (payload) {

            if (payload.stream) {
                if (payload.stream.info) {
                    statsResolution.textContent = payload.stream.info ? payload.stream.info.width + "x" + payload.stream.info.height : 'Unknown';
                }
            }

            if (payload.stats) {
                statsFrameRate.textContent = (payload.stats.framerate.avg).toFixed(1);
                statsBitrate.textContent = (payload.stats.bitrate.avg / 1000).toFixed(0);
                statsLatency.textContent = payload.stats.buffer.delay.avg.toFixed(1);
            }
        }
    }

    return {
        update: update,
    }
}());