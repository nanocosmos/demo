/*
nanoStream Player
(c) 2016, nanocosmos gmbh
http://www.nanocosmos.de
sales@nanocosmos.de

LEGAL NOTICE:
This material is subject to the terms and conditions defined in
separate license conditions ('LICENSE.txt')
All information contained herein is, and remains the property
of nanocosmos GmbH and its suppliers if any. The intellectual and technical concepts
contained herein are proprietary to nanocosmos GmbH, and are protected by trade secret
or copyright law. Dissemination of this information or reproduction of this material
is strictly forbidden unless prior written permission is obtained from nanocosmos.
All modifications will remain property of nanocosmos.
*/

define([
    'bintu/common/emptyconfig',
    'bintu/core/bintu',
    'bintu/core/bintustreamfilter'
], function (
    emptyConfig,
    Bintu,
    BintuStreamFilter
) {
    'use strict';

    function setup (config) {
        var bintu, bintuInterval = 0, bintuIntervalTime = 20, bintuChecked = true;
        return new Promise(function (resolve, reject) {
            if (config.source.bintu) {
                if (!config.source.bintu.apiurl) {
                    config.source.bintu.apiurl = 'https://bintu.nanocosmos.de';
                }
                if (!config.source.bintu.streamid) {
                    reject(Error('No bintu streamid passed'));
                }
                bintuChecked = false;
                bintuIntervalTime = 500;
                bintu = new Bintu(config.source.bintu.apiurl, null, null, 'player');
                bintu.getStream(config.source.bintu.streamid, function success (request) {
                    try {
                        var response = JSON.parse(request.responseText);
                        var id = response.id;
                        var state = response.state;
                        var playout = response.playout;
                        var rtmp = playout.rtmp;
                        var hls = playout.hls;
                        var h5live = playout.h5live;
                        if ((rtmp && !rtmp.length && !h5live) || (h5live && !h5live.length)) {
                            reject(Error('Could not find stream. The stream is not live.'));
                        }
                        else {
                            if (hls && hls.length) {
                                var hlsurl = hls[0].url;
                                config.source.hls = hlsurl;
                            }
                            if (h5live && h5live.length) {
                                config.source.h5live = config.source.h5live || {};
                                if (!config.source.h5live.server) {
                                    config.source.h5live.server = h5live[0].server;
                                }
                                config.source.h5live.rtmp = {};
                                config.source.h5live.rtmp.url = h5live[0].rtmp.url;
                                config.source.h5live.rtmp.streamname = h5live[0].rtmp.streamname;
                            }
                        }
                        bintuChecked = true;
                    }
                    catch (err) {
                        bintuChecked = true;
                        var message = err.message || 'unknown error';
                        reject(Error(message));
                    }
                }, function error (err) {
                    bintuChecked = true;
                    var message = err.error || 'unknown error';
                    message += ' - ' + err.request.responseText;
                    reject(Error(message));
                });
            }

            bintuInterval = setInterval(function () {
                if (bintuChecked) {
                    clearTimeout(bintuInterval);
                    resolve(config);
                }
            }, bintuIntervalTime);
        });
    }

    return {
        'setup'       : setup,
        'emptyConfig' : emptyConfig
    };
});
