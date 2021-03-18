/**
 * Created by nandor.kostyo on 2017-03-02.
 */
define([
    'log',
    'events/playerevents',
    'common/listenermanager',
    'events/mediaevents',
    'elementids'
], function (
    logger,
    playerEvents,
    listenerManager,
    mediaEvents,
    elementIds
) {
    var log = logger.create('ranges');

    function create (emitter) {
        var emitterListeners = [
            { 'type'     : playerEvents.CREATE,
                'listener' : onPlayerCreate },
            { 'type'     : playerEvents.DESTROY,
                'listener' : onPlayerDestroy }
        ];
        var videoListeners = [
            { 'type'     : mediaEvents.PROGRESS,
                'listener' : onVideoEvent },
            { 'type'     : mediaEvents.TIME_UPDATE,
                'listener' : onVideoEvent }
        ];

        var container;
        var ranges = [];
        var indicator;
        var video;
        var rangeCount;

        function init () {
            listenerManager.add({ 'target'    : emitter,
                'listeners' : emitterListeners });
        }

        function destroy () {
            listenerManager.remove({ 'target'    : emitter,
                'listeners' : emitterListeners });
        }

        function onPlayerCreate () {
            container = $(elementIds.RANGES);
            container.html('');

            indicator = $('<div/>');
            indicator.addClass('indicator');
            container.append(indicator);

            video = $('video');

            listenerManager.add({ 'target'    : video,
                'listeners' : videoListeners });
        }

        function onPlayerDestroy () {
            container && container.html('');
            ranges = [];
            listenerManager.remove({ 'target'    : video,
                'listeners' : videoListeners });
        }

        function onVideoEvent () {
            var buffered = video[0].buffered;

            if (rangeCount != undefined && rangeCount != buffered.length) {
                log('range ' + (rangeCount > buffered.length ? 'removed' : 'added') + ', current ranges (ms): ' + getRangeList(buffered));
            }

            if (!buffered.length) {
                return;
            }

            rangeCount = buffered.length;

            setupRanges();

            var range;
            var start = buffered.start(0);
            var end = buffered.end(buffered.length - 1);
            var rangeStart;
            var rangeEnd;

            for (var i = 0; i < buffered.length; ++i) {
                rangeStart = buffered.start(i);
                rangeEnd = buffered.end(i);

                range = ranges[i];

                range.attr('data-start', Math.floor(rangeStart * 1000));
                range.attr('data-end', Math.floor(rangeEnd * 1000));
                range.css('left', ((rangeStart - start) / (end - start) * 100) + '%');
                range.css('width', ((rangeEnd - rangeStart) / (end - start) * 100) + '%');
            }

            indicator.css('left', ((video[0].currentTime - start) / (end - start) * 100) + '%');
            indicator.attr('data-position', Math.floor(video[0].currentTime * 1000));
        }

        function setupRanges () {
            var buffered = video[0].buffered;
            var range;
            while (ranges.length < buffered.length) {
                range = $('<div/>');
                range.addClass('range');
                ranges.push(range);
                container.append(range);
            }
            while (ranges.length > buffered.length) {
                range = ranges.pop();
                range.remove();
            }
        }

        function getRangeList (buffered) {
            var result = '';
            for (var i = 0; i < buffered.length; ++i) {
                result += (msec(buffered.start(i)) + '-' + msec(buffered.end(i)));
                if (i < buffered.length - 1) {
                    result += ' <' + msec(buffered.start(i + 1) - buffered.end(i)) + '> ';
                }
            }
            return result;
        }

        function msec (value) {
            return Math.floor(value * 1000);
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
