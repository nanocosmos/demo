/**
 * Created by nandor.kostyo on 2017-03-01.
 */
define([
    'log',
    'elementids',
    'events/uievents',
    'events/playerevents',
    'common/listenermanager',
    'components/info',
    'components/forms/nano',
    'components/forms/custom',
    'components/forms/localh5live'
], function (
    logger,
    elementIds,
    uiEvents,
    playerEvents,
    listenerManager,
    info,
    nanoFormHandler,
    customFormHandler,
    localH5liveFormHandler
) {
    var log = logger.create('ui');

    function create (emitter) {
        var emitterListeners = [
            { 'type'     : uiEvents.FORM_VALIDATED,
                'listener' : onFormValidated },
            { 'type'     : playerEvents.CREATE,
                'listener' : onPlayerCreate },
            { 'type'     : playerEvents.DESTROY,
                'listener' : onPlayerDestroy },
            { 'type'     : playerEvents.VERSIONING,
                'listener' : onPlayerVersioning }
        ];

        var formHandlers = [];
        var activeFormId = elementIds.FORM_NANO;
        var video;

        function init () {
            log('init');

            info.create();

            listenerManager.add({ 'target'    : emitter,
                'listeners' : emitterListeners });

            initializeTabs();
            initializeForms();
            initializeButtons();
            initializePlayerSelector();
            initializePlaybackMode();

            if (localStorage) {
                activeFormId = localStorage.getItem('activeForm') || elementIds.FORM_NANO;
                $('.nav-tabs a[href="' + activeFormId + '"]').tab('show');
                log('set active form to ' + activeFormId);
                emitter.emit(uiEvents.SELECT_FORM, activeFormId);
            }
        }

        function destroy () {
            listenerManager.remove({ 'target'    : emitter,
                'listeners' : emitterListeners });
        }

        function onFormValidated (e) {
            if (e.data.formId === activeFormId) {
                $(elementIds.BUTTON_APPLY).prop('disabled', !e.data.valid);
                $(elementIds.BUTTON_VIDEO_APPLY).prop('disabled', !e.data.valid);
            }
        }

        function onPlayerCreate () {
            $(elementIds.BUTTON_PLAY).prop('disabled', false);
            $(elementIds.BUTTON_PAUSE).prop('disabled', false);
            $(elementIds.BUTTON_FULLSCREEN).prop('disabled', false);
            $(elementIds.BUTTON_DESTROY).prop('disabled', false);
            $(elementIds.BUTTON_SNAPSHOT).prop('disabled', false);
            $(elementIds.BUTTON_DUMP).prop('disabled', false);
        }

        function onPlayerDestroy () {
            $(elementIds.BUTTON_PLAY).prop('disabled', true);
            $(elementIds.BUTTON_PAUSE).prop('disabled', true);
            $(elementIds.BUTTON_FULLSCREEN).prop('disabled', true);
            $(elementIds.BUTTON_DESTROY).prop('disabled', true);
            $(elementIds.BUTTON_SNAPSHOT).prop('disabled', true);
            $(elementIds.BUTTON_DUMP).prop('disabled', true);
            $(elementIds.CONTAINER).html('');
        }

        function onPlayerVersioning (version) {
            $(elementIds.SPAN_VERSION).html(version);
        }

        function initializeTabs () {
            $('.nav-tabs a').click(function () {
                $(this).tab('show');
                activeFormId = '#' + this.href.split('#')[1];
                if (localStorage) {
                    localStorage.setItem('activeForm', activeFormId);
                }
                emitter.emit(uiEvents.SELECT_FORM, activeFormId);
            });
        }

        function initializeForms () {
            formHandlers.push(localH5liveFormHandler.create(emitter));
            formHandlers.push(customFormHandler.create(emitter));
            formHandlers.push(nanoFormHandler.create(emitter));
        }

        function initializeButtons () {
            $(elementIds.BUTTON_PLAY).click(function () {
                emitter.emit(uiEvents.PLAY);
            });

            $(elementIds.BUTTON_PAUSE).click(function () {
                emitter.emit(uiEvents.PAUSE);
            });

            $(elementIds.BUTTON_FULLSCREEN).click(function () {
                emitter.emit(uiEvents.FULLSCREEN);
            });

            $(elementIds.BUTTON_SNAPSHOT).click(function () {
                emitter.emit(uiEvents.SNAPSHOT);
            });

            $(elementIds.BUTTON_DESTROY).click(function () {
                emitter.emit(uiEvents.DESTROY);
            });

            $(elementIds.BUTTON_DUMP).click(function () {
                emitter.emit(uiEvents.SAVE_DUMP);
            });

            $(elementIds.BUTTON_APPLY).click(function () {
                emitter.emit(uiEvents.VIDEO_ELEMENT_USAGE, {
                    'videoId': null
                });
                emitter.emit(uiEvents.APPLY_FORM, activeFormId);
            });

            $(elementIds.BUTTON_VIDEO_APPLY).click(function () {
                var videoId = 'external';

                if (!video) {
                    video = $('<video></video>')
                        .attr('autoplay', true)
                        // .attr('muted', true)
                        .attr('controls', false)
                        .attr('webkitPlaysInline', true)
                        .attr('playsInline', true)
                        .appendTo($('body'));

                    video.trigger('play');
                    video.css('visibility', 'hidden');
                    video.attr('id', videoId);
                }

                emitter.emit(uiEvents.VIDEO_ELEMENT_USAGE, {
                    'videoId': videoId
                });

                setTimeout(function () {
                    emitter.emit(uiEvents.APPLY_FORM, activeFormId);
                }, 100);
            });

            $(elementIds.BUTTON_CLEAR_DEBUG).click(function () {
                $(elementIds.DEBUG).html('');
            });
        }

        function initializePlayerSelector () {
            if (localStorage) {
                var selected = localStorage.getItem('playerType') || 'nanoPlayer';
                $('input:radio[value="' + selected + '"]').prop('checked', true);
                emitter.emit(uiEvents.SELECT_PLAYER, selected);
            }

            $('input:radio[name="player"]')
                .change(function (e) {
                    localStorage.setItem('playerType', e.currentTarget.value);
                    emitter.emit(uiEvents.SELECT_PLAYER, e.currentTarget.value);
                });
        }

        function initializePlaybackMode () {
            if (localStorage) {
                var autoplay = localStorage.getItem('playerAutoplay');
                var keepConnection = localStorage.getItem('playerKeepConnection');
                var muted = localStorage.getItem('playerMuted');
                var blur = localStorage.getItem('playerBlur');
                autoplay = autoplay !== 'false';
                keepConnection = keepConnection === 'true';
                muted = muted === 'true';
                blur = blur || '15';
                $(elementIds.INPUT_AUTOPLAY).prop('checked', autoplay);
                $(elementIds.INPUT_KEEP_CONNECTION).prop('checked', keepConnection);
                $(elementIds.INPUT_MUTED).prop('checked', muted);
                $(elementIds.INPUT_BLUR).prop('value', blur);
                emitter.emit(uiEvents.CHECK_AUTOPLAY, autoplay);
                emitter.emit(uiEvents.CHECK_KEEP_CONNECTION, keepConnection);
                emitter.emit(uiEvents.CHECK_MUTED, muted);
                emitter.emit(uiEvents.RANGE_BLUR, blur);
            }

            $(elementIds.INPUT_AUTOPLAY).change(function (e) {
                localStorage.setItem('playerAutoplay', e.currentTarget.checked);
                emitter.emit(uiEvents.CHECK_AUTOPLAY, e.currentTarget.checked);
            });

            $(elementIds.INPUT_KEEP_CONNECTION).change(function (e) {
                localStorage.setItem('playerKeepConnection', e.currentTarget.checked);
                emitter.emit(uiEvents.CHECK_KEEP_CONNECTION, e.currentTarget.checked);
            });

            $(elementIds.INPUT_MUTED).change(function (e) {
                localStorage.setItem('playerMuted', e.currentTarget.checked);
                emitter.emit(uiEvents.CHECK_MUTED, e.currentTarget.checked);
            });

            $('input:radio[name="player"]')
                .change(function (e) {
                    localStorage.setItem('playerType', e.currentTarget.value);
                    emitter.emit(uiEvents.SELECT_PLAYER, e.currentTarget.value);
                });

            $(elementIds.INPUT_BLUR).change(function (e) {
                localStorage.setItem('playerBlur', e.currentTarget.value);
                emitter.emit(uiEvents.RANGE_BLUR, e.currentTarget.value);
            });
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
