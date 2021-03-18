/**
 * Created by david.engelmaier on 2017-10-27.
 */
define([
    'elementids',
    'common/listenermanager',
    'events/uievents',
    'events/logicevents'
], function (
    elementIds,
    listenerManager,
    uiEvents,
    logicEvents
) {
    var formId = elementIds.FORM_LOCAL_H5LIVE;

    function create (emitter) {
        var validate1 = [
            elementIds.INPUT_LOCAL_SERVER_WSS,
            elementIds.INPUT_LOCAL_RTMP_URL,
            elementIds.INPUT_LOCAL_RTMP_STREAMNAME
        ];

        var emitterListeners = [
            { 'type'     : uiEvents.SELECT_FORM,
                'listener' : onSelectForm },
            { 'type'     : uiEvents.APPLY_FORM,
                'listener' : onApplyForm }
        ];

        function init () {
            listenerManager.add({ 'target'    : emitter,
                'listeners' : emitterListeners });
            validate1.forEach(function (id) {
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
                emitter.emit(logicEvents.CONFIGURATION, getConfiguration());
            }
        }

        function validate () {
            var valid = true;
            var validateArr = validate1;

            validateArr.forEach(function (id) {
                valid = valid && !!$(id).val();
                if (localStorage && localStorage.getItem(id)) {
                    $(id).val(localStorage.getItem(id));
                }
            });

            emitter.emit(uiEvents.FORM_VALIDATED, { 'formId' : formId,
                'valid'  : valid });
        }

        function onChange (e) {
            var elementId = '#' + e.currentTarget.id;
            if (localStorage) {
                localStorage.setItem(elementId, e.currentTarget.value);
            }
            validate();
        }

        function getConfiguration () {
            var config;

            var wss = $(elementIds.INPUT_LOCAL_SERVER_WSS).val();
            var url = $(elementIds.INPUT_LOCAL_RTMP_URL).val();
            var streamname = $(elementIds.INPUT_LOCAL_RTMP_STREAMNAME).val();

            config = {
                'source': {
                    'h5live': {
                        'server': {
                            'websocket': wss
                        },
                        'rtmp': {
                            'url'        : url,
                            'streamname' : streamname
                        }
                    }
                }
            };

            return config;
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
