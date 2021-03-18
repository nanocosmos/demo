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
            { 'type'     : uiEvents.SELECT_FORM,
                'listener' : onSelectForm },
            { 'type'     : uiEvents.APPLY_FORM,
                'listener' : onApplyForm }
        ];

        function init () {
            listenerManager.add({ 'target'    : emitter,
                'listeners' : emitterListeners });

            $(elementIds.INPUT_NANO_URL).bind('change paste keyup blur', onChange);

            if (localStorage) {
                $(elementIds.INPUT_NANO_URL).val(localStorage.getItem(elementIds.INPUT_NANO_URL));
            }

            checkExternalQuery();

            validate();
        }

        function destroy () {
            listenerManager.remove({ 'target'    : emitter,
                'listeners' : emitterListeners });
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

        function checkExternalQuery () {
            var query = document.location.search, pos = query.indexOf('?') + 1;
            if (pos) {
                query = query.slice(pos);
            }
            if (query !== '') {
                var nano = query.split('nano=');
                if (nano.length === 2 && nano[1].length) {
                    $(elementIds.INPUT_NANO_URL)
                        .val(nano[1])
                        .trigger('change');
                    emitter.emit(uiEvents.SELECT_FORM, elementIds.FORM_NANO);
                    if (/(playback.autoplay|autoplay)=(1|true)/.test(nano[1])) {
                        $(elementIds.INPUT_AUTOPLAY).prop('checked', true);
                        $(elementIds.INPUT_AUTOPLAY).trigger('change');
                        emitter.emit(uiEvents.CHECK_AUTOPLAY, true);
                    }
                    if (/(playback.keepConnection|keepConnection)=(1|true)/.test(nano[1])) {
                        $(elementIds.INPUT_KEEP_CONNECTION).prop('checked', true);
                        $(elementIds.INPUT_KEEP_CONNECTION).trigger('change');
                        emitter.emit(uiEvents.CHECK_KEEP_CONNECTION, true);
                    }
                    if (/(playback.muted|muted)=(1|true)/.test(nano[1])) {
                        $(elementIds.INPUT_MUTED).prop('checked', true);
                        $(elementIds.INPUT_MUTED).trigger('change');
                        emitter.emit(uiEvents.CHECK_MUTED, true);
                    }
                    getConfiguration();
                }
            }
        }

        function validate () {
            emitter.emit(uiEvents.FORM_VALIDATED, { 'formId' : formId,
                'valid'  : !!$(elementIds.INPUT_NANO_URL).val() });
        }

        function getConfiguration () {
            var config = {
                'source': undefined
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

                var bintuApiUrl = params['bintu.apiurl'] || 'https://bintu.nanocosmos.de';
                var bintuStreamId = params['bintu.streamid'];
                var url = params['h5live.rtmp.url'];
                var streamname = params['h5live.rtmp.streamname'];
                var isEntryNotation = params['entry.rtmp.streamname'] || params['entry.bintu.streamid'];

                if (!isEntryNotation) {
                    if (bintuStreamId) {
                        config.source = {
                            'bintu': {
                                'apiurl'   : bintuApiUrl,
                                'streamid' : bintuStreamId
                            }
                        };
                    }
                    else {
                        config.source = {
                            'h5live': {
                                'rtmp': {
                                    'url'        : url,
                                    'streamname' : streamname
                                }
                            }
                        };
                    }
                }
                else {
                    config.source = {
                        'entries': []
                    };
                }

                function setConfig (config) {
                    var security = {};
                    security.expires = params['h5live.security.expires'];
                    security.token = params['h5live.security.token'];
                    security.tag = params['h5live.security.tag'];
                    security.options = params['h5live.security.options'];

                    var hasSecurity = security.expires || security.token || security.tag || security.options;

                    var server = params['h5live.server'];
                    var wss = params['h5live.server.websocket']
                        ? params['h5live.server.websocket'] : !bintuStreamId
                            ? hasSecurity ? 'wss://bintu-splay.nanocosmos.de/h5live/authstream' : 'wss://bintu-h5live.nanocosmos.de/h5live/stream' : undefined;
                    var hls = params['h5live.server.hls']
                        ? params['h5live.server.hls'] : !bintuStreamId
                            ? hasSecurity ? 'https://bintu-splay.nanocosmos.de/h5live/authhttp/playlist.m3u8' : 'https://bintu-h5live.nanocosmos.de/h5live/http/playlist.m3u8' : undefined;
                    var token = params['h5live.token'];
                    var tweaks = params.tweaks;


                    if (!isEntryNotation) {
                        if (server) {
                            var routes = {
                                'secured': {
                                    'websocket' : ['wss://', hasSecurity ? '/h5live/authstream' : '/h5live/stream'],
                                    'hls'       : ['https://', hasSecurity ? '/h5live/authhttp/playlist.m3u8' : '/h5live/http/playlist.m3u8']
                                },
                                'unsecured': {
                                    'websocket' : ['ws://', ':8181'],
                                    'hls'       : ['http://', ':8180/playlist.m3u8']
                                }
                            };
                            var route =
                                document.location.protocol.indexOf('https') === 0 ? routes.secured : routes.unsecured;
                            wss = route.websocket[0] + server + route.websocket[1];
                            hls = route.hls[0] + server + route.hls[1];
                        }
                        if (wss && hls) {
                            config.source.h5live = config.source.h5live || {};
                            config.source.h5live.server = {
                                'websocket' : wss,
                                'hls'       : hls
                            };
                        }

                        if (token && token.length) {
                            config.source.h5live.token = token;
                        }

                        if (security.token) {
                            config.source.h5live = config.source.h5live || {};
                            config.source.h5live.security = config.source.h5live.security || {};
                            config.source.h5live.security.token = security.token;
                        }
    
                        if (security.expires) {
                            config.source.h5live = config.source.h5live || {};
                            config.source.h5live.security = config.source.h5live.security || {};
                            config.source.h5live.security.expires = security.expires;
                        }
    
                        if (security.options) {
                            config.source.h5live = config.source.h5live || {};
                            config.source.h5live.security = config.source.h5live.security || {};
                            config.source.h5live.security.options = security.options;
                        }
    
                        if (security.tag) {
                            config.source.h5live = config.source.h5live || {};
                            config.source.h5live.security = config.source.h5live.security || {};
                            config.source.h5live.security.tag = security.tag;
                        }
                    }
                    else {
                        setConfigEntries();
                        setConfigEntriesOptions();
                        setConfigEntriesStartIndex();
                    }

                    if (tweaks && tweaks.length) {
                        config.tweaks = {
                            'buffer': {}
                        };
                        tweaks = tweaks
                            .replace(/\s/g, '')
                            .replace(/;|:/g, ',')
                            .split(',');

                        var keys = ['min', 'start', 'target', 'limit', 'max'];
                        for (var i = 0, len = Math.min(tweaks.length, keys.length); i < len; i += 1) {
                            if (!isNaN(tweaks[i])) config.tweaks.buffer[keys[i]] = parseFloat(tweaks[i]);
                        }
                    }
                    emitter.emit(logicEvents.CONFIGURATION, config);
                    emitter.emit(uiEvents.SPLIT_CUSTOM, {
                        'apiurl'     : bintuApiUrl,
                        'streamid'   : bintuStreamId,
                        'wss'        : wss,
                        'hls'        : hls,
                        'url'        : url,
                        'streamname' : streamname,
                        'token'      : token,
                        'tweaks'     : tweaks
                    });
                }

                function setConfigEntries () {
                    var entries = [];
                    var nums = ['', '2', '3', '4', '5', '6', '7', '8', '9'];
                    var index = 0;
                
                    while (nums.length) {
                        var num = nums.shift();
                        var name = params['entry' + num + '.rtmp.streamname'];
                        var streamid = params['entry' + num + '.bintu.streamid'];
                        if (!name && !streamid) {
                            break;
                        }
                        var url = params['entry' + num + '.rtmp.url'];
                        if (!url) {
                            url = 'rtmp://bintu-play.nanocosmos.de:80/play';
                        }
                        var server = params['entry' + num + '.server'];
                        if (server) {
                            var routes = {
                                'secured': {
                                    'websocket'   : ['wss://', ':443/h5live/stream.mp4'],
                                    'hls'         : ['https://', ':443/h5live/http/playlist.m3u8'],
                                    'progressive' : ['https://', ':443/h5live/http/stream.mp4']
                                },
                                'unsecured': {
                                    'websocket'   : ['ws://', ':8181'],
                                    'hls'         : ['http://', ':8180/playlist.m3u8'],
                                    'progressive' : ['http://', ':8180/stream.mp4']
                                }
                            };
                            var route = (document.location.protocol.indexOf('https') === 0) ? routes.secured : routes.unsecured;
                            server = {
                                'websocket'   : route.websocket[0] + server + route.websocket[1],
                                'hls'         : route.hls[0] + server + route.hls[1],
                                'progressive' : route.progressive[0] + server + route.progressive[1]
                            };
                        }
                        else {
                            var wss = params['entry' + num + '.server.websocket'];
                            var hls = params['entry' + num + '.server.hls'];
                            server = {
                                'websocket'   : wss || 'wss://bintu-h5live.nanocosmos.de:443/h5live/stream/stream.mp4',
                                'hls'         : hls || 'https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8',
                                'progressive' : 'https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4'
                            };
                        }
                        var apiurl = params['entry' + num + '.bintu.apiurl'];

                        entries.push(
                            {
                                'index'  : index,
                                'label'  : 'stream ' + (index + 1),
                                'tag'    : '',
                                'hls'    : '',
                                'h5live' : {
                                    'rtmp': {
                                        'url'        : url,
                                        'streamname' : name
                                    },
                                    'server'   : server,
                                    'token'    : '',
                                    'security' : {
                                        'token'   : params['entry' + num + '.security.token'],
                                        'expires' : params['entry' + num + '.security.expires'],
                                        'options' : params['entry' + num + '.security.options'],
                                        'tag'     : params['entry' + num + '.security.tag']
                                    }
                                },
                                'bintu': {
                                    'apiurl'   : apiurl,
                                    'streamid' : streamid
                                }
                            }
                        );
                        index++;
                    }
                
                    config.source.entries = entries;
                }

                function setConfigEntriesOptions () {
                    config.source.options = {
                        'adaption' : {},
                        'switch'   : {}
                    };
                
                    var rule = params.rule || params['options.rule'];
                    if (rule) {
                        config.source.options.adaption.rule = rule;
                    }
                }

                function setConfigEntriesStartIndex () {
                    var startIndex = parseInt(params.startIndex);
                    config.source.startIndex = startIndex && !isNaN(startIndex) ? startIndex : 0;
                }

                setConfig(config);
            }
        }

        init();

        return {
            'destroy': destroy
        };
    }

    return {
        'create': create
    };
});
