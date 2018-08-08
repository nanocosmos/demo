/**
 * Created by nandor.kostyo on 2017-03-01.
 */
define([
    'elementids',
    'common/listenermanager',
    'events/uievents',
    'events/logicevents',
    'bintu/bintusource'
], function (
    elementIds,
    listenerManager,
    uiEvents,
    logicEvents,
    bintu
) {
    var formId = elementIds.FORM_NANO;

    function create (emitter) {
        var emitterListeners = [
            {type: uiEvents.SELECT_FORM,    listener: onSelectForm},
            {type: uiEvents.APPLY_FORM,     listener: onApplyForm}
        ];

        function init() {
            listenerManager.add({target: emitter, listeners: emitterListeners});

            $(elementIds.INPUT_NANO_URL).bind('change paste keyup blur', onChange);

            if (localStorage) {
                $(elementIds.INPUT_NANO_URL).val(localStorage.getItem(elementIds.INPUT_NANO_URL));
            }

            checkExternalQuery();

            validate();
        }

        function destroy() {
            listenerManager.remove({target: emitter,    listeners: emitterListeners});
        }

        function onSelectForm (e) {
            if (e.data == formId) {
                validate();
            }
        }

        function onApplyForm (e) {
            if (e.data == formId) {
                getConfiguration();
            }
        }

        function onChange (e) {
            var elementId = '#' + e.currentTarget.id;
            if (localStorage) {
                localStorage.setItem(elementId, e.currentTarget.value);
            }
            validate();
        }

        function checkExternalQuery() {
            var query = document.location.search, pos = query.indexOf('?') + 1;
            if (pos) {
                query = query.slice(pos);
            }
            if (query !== '') {
                var nano = query.split('nano=');
                if (nano.length === 2 && nano[1].length) {
                    $(elementIds.INPUT_NANO_URL).val(nano[1]);
                    getConfiguration();
                }
            }
        }

        function validate () {
            emitter.emit(uiEvents.FORM_VALIDATED, {formId: formId, valid: !!$(elementIds.INPUT_NANO_URL).val()});
        }

        function getConfiguration () {
            var config = {
                source : undefined
            };

            var query = $(elementIds.INPUT_NANO_URL).val();
            var pos = query.indexOf('?') + 1;
            if (pos) {
                query = query.slice(pos);
            }
            if (query !== '') {
                var gArr = query.split('&'), params = [];
                for (var i = 0; i < gArr.length; ++i) {
                    var v = '';
                    var vArr = gArr[i].split('=');
                    var k = vArr[0];
                    if (vArr.length > 1) {
                        v = vArr[1];
                    }
                    params[unescape(k)] = unescape(v);
                }

                var bintuApiUrl = params['bintu.apiurl'] || 'https://c-t5-bintu.nanocosmos.de';
                var bintuStreamId = params['bintu.streamid'];
                var url = params['h5live.rtmp.url'];
                var streamname = params['h5live.rtmp.streamname'];
                if (bintuStreamId) {
                    config.source = {
                        bintu: {
                            apiurl: bintuApiUrl,
                            streamid: bintuStreamId
                        }
                    };
                    bintu.setup(config).then(function (_config) {
                        delete _config.source.bintu;
                        setConfig(_config);
                    });
                } else {
                    config.source = {
                        h5live: {
                            rtmp: {
                                url: url,
                                streamname: streamname
                            }
                        }
                    }
                    setConfig(config);
                }

                function setConfig(config) {
                    var server = params['h5live.server'];
                    var wss = params['h5live.server.websocket'] || !bintuStreamId ? 'wss://c-t5-edge.nanocosmos.de/h5live/stream' : undefined;
                    var hls = params['h5live.server.hls'] || !bintuStreamId ? 'https://c-t5-edge.nanocosmos.de/h5live/http/playlist.m3u8' : undefined;
                    var token = params['h5live.token'];
                    var tweaks = params['tweaks'];
                    if (server) {
                        var routes = {
                            secured: {
                                websocket: ['wss://', '/h5live/stream'],
                                hls: ['https://', '/h5live/http/playlist.m3u8']
                            },
                            unsecured: {
                                websocket: ['ws://', ':8181'],
                                hls: ['http://', ':8180/playlist.m3u8']
                            }
                        }
                        var route = (document.location.protocol.indexOf('https') === 0) ? routes.secured : routes.unsecured;
                        wss = route.websocket[0] + server + route.websocket[1];
                        hls = route.hls[0] + server + route.hls[1];
                    }
                    if (wss && hls) {
                        config.source.h5live = config.source.h5live || {};
                        config.source.h5live.server = {
                            websocket: wss,
                            hls: hls
                        }
                    }

                    if (token && token.length) {
                        config.source.h5live.token = token;
                    }

                    if (tweaks && tweaks.length) {
                        config.tweaks = {
                            buffer: {}
                        };
                        tweaks = tweaks.replace(/\s/g, '').replace(/;|:/g, ',').split(',');

                        var keys = ['min', 'start', 'target', 'limit', 'max'];
                        for (var i = 0, len = Math.min(tweaks.length, keys.length) ; i < len; i += 1) {
                            if (!isNaN(tweaks[i])) config.tweaks.buffer[keys[i]] = parseFloat(tweaks[i]);
                        }
                    }
                    emitter.emit(logicEvents.CONFIGURATION, config);
                    emitter.emit(uiEvents.SPLIT_CUSTOM, {
                        apiurl: bintuApiUrl,
                        streamid: bintuStreamId,
                        wss: wss,
                        hls: hls,
                        url: url,
                        streamname: streamname,
                        token: token,
                        tweaks: tweaks
                    });
                }

            }
        }

        init();

        return {
            destroy: destroy
        }
    }

    return {
        create: create
    };
});
