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
    var formId = elementIds.FORM_CUSTOM;

    function create (emitter) {
        var validate1 = [
            elementIds.INPUT_RTMP_URL,
            elementIds.INPUT_RTMP_STREAMNAME
        ];

        var validate2 = [
            elementIds.INPUT_SERVER_WSS,
            elementIds.INPUT_SERVER_HLS,
            elementIds.INPUT_TOKEN,
            elementIds.INPUT_TWEAKS
        ];

        var validate3 = [
            elementIds.INPUT_BINTU_APIURL,
            elementIds.INPUT_BINTU_STREAMID
        ];

        var emitterListeners = [
            { 'type'     : uiEvents.SELECT_FORM,
                'listener' : onSelectForm },
            { 'type'     : uiEvents.APPLY_FORM,
                'listener' : onApplyForm },
            { 'type'     : uiEvents.SPLIT_CUSTOM,
                'listener' : onSplitCustom }
        ];

        function init () {
            listenerManager.add({ 'target'    : emitter,
                'listeners' : emitterListeners });

            validate1.concat(validate2).concat(validate3).forEach(function (id) {
                if (localStorage) {
                    $(id).val(localStorage.getItem(id));
                }
                $(id).bind('change paste keyup blur', onChange);
            });

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

        function onSplitCustom (e) {
            $(elementIds.INPUT_BINTU_APIURL).val(e.data.apiurl).trigger('blur');
            $(elementIds.INPUT_BINTU_STREAMID).val(e.data.streamid).trigger('blur');
            $(elementIds.INPUT_SERVER_WSS).val(e.data.wss).trigger('blur');
            $(elementIds.INPUT_SERVER_HLS).val(e.data.hls).trigger('blur');
            $(elementIds.INPUT_RTMP_STREAMNAME).val(e.data.streamname).trigger('blur');
            $(elementIds.INPUT_RTMP_URL).val(e.data.url).trigger('blur');
            $(elementIds.INPUT_TOKEN).val(e.data.token).trigger('blur');
            $(elementIds.INPUT_TWEAKS).val(e.data.tweaks ? e.data.tweaks.join(',') : '').trigger('blur');
        }

        function onChange (e) {
            var elementId = '#' + e.currentTarget.id;
            if (localStorage) {
                localStorage.setItem(elementId, e.currentTarget.value);
            }
            validate();
        }

        function validate () {
            var valid = true;
            var validateArr = validate1;

            validateArr.forEach(function (element) {
                valid = valid && !!$(element).val();
            });

            validateArr = [validate2[0], validate2[1]];
            validateArr.forEach(function (element) {
                valid = valid && !!((!$(element).val() && $(validate2[2]).val()) || $(element).val());
            });

            if (!valid) {
                validateArr = validate3;
                if ($(validateArr[1]).val()) {
                    valid = true;
                }
            }

            emitter.emit(uiEvents.FORM_VALIDATED, { 'formId' : formId,
                'valid'  : valid });
        }

        function getConfiguration () {
            var config = {
                'source': {}
            };

            var bintuApiUrl = $(elementIds.INPUT_BINTU_APIURL).val();
            var bintuStreamId = $(elementIds.INPUT_BINTU_STREAMID).val();
            var wss = $(elementIds.INPUT_SERVER_WSS).val();
            var hls = $(elementIds.INPUT_SERVER_HLS).val();
            var url = $(elementIds.INPUT_RTMP_URL).val();
            var streamname = $(elementIds.INPUT_RTMP_STREAMNAME).val();
            var token = $(elementIds.INPUT_TOKEN).val();
            var tweaks = $(elementIds.INPUT_TWEAKS).val();

            if (bintuStreamId) {
                config.source = {
                    'bintu': {
                        'apiurl'   : bintuApiUrl ? bintuApiUrl : 'https://c-t5-bintu.nanocosmos.de',
                        'streamid' : bintuStreamId
                    }
                };
                bintu.setup(config).then(function (_config) {
                    delete _config.source.bintu;
                    setConfig(_config);
                });
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
                setConfig(config);
            }

            function setConfig (config) {
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

                if (tweaks && tweaks.length) {
                    config.tweaks = {
                        'buffer': {}
                    };
                    tweaks = tweaks.replace(/\s/g, '').replace(/;|:/g, ',').split(',');

                    var keys = ['min', 'start', 'target', 'limit', 'max'];
                    for (var i = 0, len = Math.min(tweaks.length, keys.length); i < len; i += 1) {
                        if (!isNaN(tweaks[i])) config.tweaks.buffer[keys[i]] = parseFloat(tweaks[i]);
                    }
                }
                emitter.emit(logicEvents.CONFIGURATION, config);
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
