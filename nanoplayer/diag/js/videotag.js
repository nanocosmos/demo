/**
 * Created by nandor.kostyo on 2016-10-05.
 */
define([
    'mediaevents',
    'log',
    'elementids'
], function(
    mediaEvents,
    log,
    elementIds
){
    var video;

    function createTag(container){
        return $('<video></video>')
            .attr('autoplay', true)
            // .attr('muted', true)
            .attr('controls', false)
            .attr('webkitPlaysInline', true)
            .attr('playsInline', true)
            .appendTo(container);
    }

    function setListeners(video){
        var silentTypes = [
            mediaEvents.TIME_UPDATE,
            mediaEvents.PROGRESS,
            mediaEvents.DURATION_CHANGE
        ];

        for (var key in mediaEvents) {
            if (mediaEvents.hasOwnProperty(key) && silentTypes.indexOf(mediaEvents[key]) === -1) {
                video.on(mediaEvents[key], onMediaEvent);
            }
        }

        video.on(mediaEvents.TIME_UPDATE, onTimeUpdate);
    }

    function onTimeUpdate(e){
        var output = [
            new Date(e.currentTarget.currentTime*1000).toISOString().substr(11, 12),
            e.currentTarget.videoWidth + 'x' + e.currentTarget.videoHeight
        ];
        $(elementIds.CURRENT_TIME).html(output.join(', '));
    }

    function onMediaEvent(e) {
        if (e.type === mediaEvents.PLAYING || e.type === mediaEvents.PLAY) {
            var ranges = [];
            for (var i = 0; e.currentTarget && i < e.currentTarget.buffered.length; ++i) {
                ranges.push(Math.floor(e.currentTarget.buffered.start(i) * 1000) + '>' + Math.floor(e.currentTarget.buffered.end(i) * 1000));
            }
            log('ranges: ' + ranges.join(' '));
        }
        log(e.type);
    }

    function init(src){
        log('add videotag');
        video = createTag(elementIds.CONTAINER);
        setListeners(video);

        video.attr('src', src)
            .trigger('play');
    }

    function play(){
        if (video) {
            video.trigger('play');
        }
    }

    function pause(){
        if (video) {
            video.trigger('pause');
        }
    }

    function enterFullScreen(videoTag){
        if (!videoTag){
            videoTag = video[0];
        }
        if (videoTag){
            if (typeof(videoTag.requestFullscreen) != "undefined") {
                videoTag.requestFullscreen();
            } else if (typeof(videoTag.webkitEnterFullscreen) != "undefined") {
                videoTag.webkitEnterFullscreen();
            } else if (typeof(videoTag.webkitRequestFullscreen)  != "undefined") {
                videoTag.webkitRequestFullscreen();
            } else if (typeof(videoTag.mozRequestFullScreen)  != "undefined") {
                videoTag.mozRequestFullScreen();
            }
        }
    }

    function destroy() {
        $(elementIds.CONTAINER).html('');
    }

    return {
        createTag: createTag,
        setListeners: setListeners,
        init: init,
        play: play,
        pause: pause,
        enterFullScreen: enterFullScreen,
        destroy: destroy
    }
});
