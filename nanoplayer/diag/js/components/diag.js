/**
 * Created by nandor.kostyo on 2017-03-03.
 */
define([
    'log',
    'events/playerevents',
    'common/listenermanager',
    'chart'
], function (
    logger,
    playerEvents,
    listenerManager,
    Chart
) {
    var log = logger.create('diag');

    function create (emitter) {
        var currentTime = -1;
        var profileChart, bufferChart, bitrateChart, qualityChart;
        var delays = [], bitrates = [], times = [];
        var droppedFrames = [], corruptedFrames = [];
        var startupProfile = {
            'connection'   : [],
            'transmission' : [],
            'processing'   : [],
            'buffering'    : [],
            'starting'     : []
        };

        var emitterListeners = [
            { 'type'     : playerEvents.DESTROY,
                'listener' : onResetChart },
            { 'type'     : playerEvents.LOADING,
                'listener' : onResetChart }
        ];

        var startupListeners = [
            { 'type'     : playerEvents.PLAYING,
                'listener' : parsePerformanceMarks }
        ];

        var statsListeners = [
            { 'type'     : playerEvents.STATS,
                'listener' : onPlayerStats }
        ];

        function init () {
            listenerManager.add({ 'target'    : emitter,
                'listeners' : emitterListeners });
            listenerManager.add({ 'target'    : emitter,
                'listeners' : startupListeners });
            listenerManager.add({ 'target'    : emitter,
                'listeners' : statsListeners });
            createProfileChart();
            createBufferChart();
            createBitrateChart();
            createQualityChart();
        }

        function destroy () {
            listenerManager.remove({ 'target'    : emitter,
                'listeners' : emitterListeners });
            listenerManager.remove({ 'target'    : emitter,
                'listeners' : startupListeners });
            listenerManager.remove({ 'target'    : emitter,
                'listeners' : statsListeners });
        }

        function onResetChart () {
            listenerManager.remove({ 'target'    : emitter,
                'listeners' : startupListeners });
            listenerManager.add({ 'target'    : emitter,
                'listeners' : startupListeners });
            createBufferChart();
            createBitrateChart();
            createQualityChart();
        }

        function onPlayerStats (e) {
            var stats = e.data.stats;
            if (currentTime !== stats.currentTime.toFixed(0)) {
                currentTime = stats.currentTime.toFixed(0);
            }
            else {
                return;
            }
            var delay = stats.buffer.delay.current;
            while (delays.length > 10) {
                delays.shift();
            }
            delays.push(delay);
            while (times.length > 10) {
                times.shift();
            }
            times.push(currentTime);
            var labels = new Array(times.length);
            labels[0] = times[0];
            labels[labels.length - 1] = times[times.length - 1];
            updateBufferChart(delays, labels);

            if (stats.bitrate) {
                var bitrate = stats.bitrate.current / 1000;
                while (bitrates.length > 10) {
                    bitrates.shift();
                }
                bitrates.push(bitrate);
                updateBitrateChart(bitrates, labels);
            }

            if (stats.quality) {
                var dropped = stats.quality.droppedVideoFramesCurrent;
                while (droppedFrames.length > 10) {
                    droppedFrames.shift();
                }
                droppedFrames.push(dropped);
                var corrupted = stats.quality.corruptedVideoFramesCurrent;
                while (corruptedFrames.length > 10) {
                    corruptedFrames.shift();
                }
                corruptedFrames.push(corrupted);
                updateQualityChart(droppedFrames, corruptedFrames, labels);
            }
        }

        function createProfileChart () {
            var setColours = {
                'connection'   : '#628395',
                'transmission' : '#c1ce42',
                'processing'   : '#96897b',
                'buffering'    : '#cf995f',
                'starting'     : '#d0ce7c'
            };

            var datasets = [];
            for (var set in setColours) if (setColours.hasOwnProperty(set)) {
                datasets.push({
                    'label'           : set,
                    'backgroundColor' : setColours[set],
                    'data'            : []
                });
            }

            profileChart = new Chart(
                $('#profileChart'),
                {
                    'type' : 'bar',
                    'data' : {
                        'labels'   : [],
                        'datasets' : datasets
                    },
                    'options': {
                        'title': {
                            'display' : true,
                            'text'    : 'Startup profile'
                        },
                        'tooltips': {
                            'mode'      : 'index',
                            'intersect' : false
                        },
                        'responsive' : true,
                        'scales'     : {
                            'xAxes': [{
                                'stacked': true,
                            }],
                            'yAxes': [{
                                'stacked': true
                            }]
                        },
                        'tooltips': {
                            'enabled': false
                        }
                    }
                }
            );
        }

        function createBufferChart () {
            delays = [];
            times = [];

            if (bufferChart) {
                bufferChart.destroy();
            }

            bufferChart = new Chart(
                $('#bufferChart'),
                {
                    'type' : 'line',
                    'data' : {
                        'labels'   : [],
                        'datasets' : [{
                            'label'       : 'Delay',
                            'data'        : [],
                            'lineTension' : 0
                        }]
                    },
                    'options': {
                        'tooltips': {
                            'enabled': false
                        },
                        'maintainAspectRatio' : false,
                        'scales'              : {
                            'yAxes': [{
                                'ticks': {
                                    'beginAtZero': true
                                }
                            }]
                        },
                        'elements': {
                            'point': {
                                'radius': 1
                            }
                        },
                        'tooltips': {
                            'enabled': false
                        }
                    }
                }
            );
        }

        function createBitrateChart () {
            bitrates = [];

            if (bitrateChart) {
                bitrateChart.destroy();
            }

            bitrateChart = new Chart(
                $('#bitrateChart'),
                {
                    'type' : 'line',
                    'data' : {
                        'labels'   : [],
                        'datasets' : [{
                            'label'       : 'Bitrate in kbps',
                            'data'        : [],
                            'lineTension' : 0
                        }]
                    },
                    'options': {
                        'tooltips': {
                            'enabled': false
                        },
                        'maintainAspectRatio' : false,
                        'scales'              : {
                            'yAxes': [{
                                'ticks': {
                                    'beginAtZero': true
                                }
                            }]
                        },
                        'elements': {
                            'point': {
                                'radius': 1
                            }
                        },
                        'tooltips': {
                            'enabled': false
                        }
                    }
                }
            );
        }

        function createQualityChart () {
            if (qualityChart) {
                qualityChart.destroy();
            }

            qualityChart = new Chart(
                $('#qualityChart'),
                {
                    'type' : 'line',
                    'data' : {
                        'labels'   : [],
                        'datasets' : [{
                            'label'       : 'Dropped',
                            'data'        : [],
                            'lineTension' : 0,
                            'borderColor' : 'rgba(255,0,0,1)'
                        },
                        {
                            'label'       : 'Corrupted',
                            'data'        : [],
                            'lineTension' : 0,
                            'borderColor' : 'rgba(0,255,0,1)'
                        }]
                    },
                    'options': {
                        'tooltips': {
                            'enabled': false
                        },
                        'maintainAspectRatio' : false,
                        'scales'              : {
                            'yAxes': [{
                                'ticks': {
                                    'beginAtZero': true
                                }
                            }]
                        },
                        'elements': {
                            'point': {
                                'radius': 1
                            }
                        },
                        'tooltips': {
                            'enabled': false
                        }
                    }
                }
            );
        }

        function updateProfileChart () {
            while (profileChart.data.labels.length < startupProfile.connection.length) {
                profileChart.data.labels.push(profileChart.data.labels.length + 1);
            }
            for (var i in startupProfile) if (startupProfile.hasOwnProperty(i)) {
                var dataset = getArrayItem(profileChart.data.datasets, 'label', i);
                dataset.data = startupProfile[i];
            }
            profileChart.update();
        }

        function updateBufferChart (values, times) {
            bufferChart.data.datasets[0].data = values;
            bufferChart.data.labels = times;
            bufferChart.update();
        }

        function updateBitrateChart (values, times) {
            bitrateChart.data.datasets[0].data = values;
            bitrateChart.data.labels = times;
            bitrateChart.update();
        }

        function updateQualityChart (dropped, corrupted, times) {
            qualityChart.data.datasets[0].data = dropped;
            qualityChart.data.datasets[1].data = corrupted;
            qualityChart.data.labels = times;
            qualityChart.update();
        }

        function parsePerformanceMarks () {
            var relations = [
                { 'start'       : 'connecting',
                    'end'         : 'connected',
                    'measurement' : 'connection',
                    'value'       : 0 },
                { 'start'       : 'connected',
                    'end'         : 'firstFragmentReceived',
                    'measurement' : 'transmission',
                    'value'       : 0 },
                { 'start'       : 'firstFragmentReceived',
                    'end'         : 'firstFrameRendered',
                    'measurement' : 'processing',
                    'value'       : 0 },
                { 'start'       : 'firstFrameRendered',
                    'end'         : 'playable',
                    'measurement' : 'buffering',
                    'value'       : 0 },
                { 'start'       : 'playable',
                    'end'         : 'playing',
                    'measurement' : 'starting',
                    'value'       : 0 }
            ];

            var marks = [];
            performance.getEntriesByType('mark').forEach(function (mark) {
                if (mark.name.indexOf('nano.') == 0) {
                    marks.push({
                        'name'      : mark.name,
                        'startTime' : mark.startTime
                    });
                }
            });

            if (!marks.length) {
                //nothing to do here.
                return;
            }

            //marks = [
            //    {
            //        name: 'nano.playerDiv.connecting',
            //        startTime: 500
            //    },
            //    {
            //        name: 'nano.playerDiv.connected',
            //        startTime: 100
            //    },
            //    {
            //        name: 'nano.playerDiv.firstFragmentReceived',
            //        startTime: 400
            //    },
            //    {
            //        name: 'nano.playerDiv.firstFrameRendered',
            //        startTime: 800
            //    },
            //    {
            //        name: 'nano.playerDiv.playable',
            //        startTime: 700
            //    },
            //    {
            //        name: 'nano.playerDiv.playing',
            //        startTime: 1100
            //    }
            //]

            var namePrefix = marks[0].name.split('.').splice(0, 2).join('.') + '.';
            var startMark;
            var endMark;
            var preEndMark;

            relations.forEach(function (relation, i) {
                startMark = getArrayItem(marks, 'name', namePrefix + relation.start);
                endMark = getArrayItem(marks, 'name', namePrefix + relation.end);
                if (endMark.startTime - startMark.startTime < 0) {
                    for (var j = 0; j < marks.length; ++j) {
                        if (marks[j].name === namePrefix + relation.start) {
                            if (j === 0) {
                                startMark.startTime = endMark.startTime;
                                marks[j].startTime = startMark.startTime;
                            }
                            else {
                                endMark.startTime = startMark.startTime;
                                marks[j].startTime = endMark.startTime;
                            }
                        }
                    }
                }
                relation.value = Math.floor(endMark.startTime - startMark.startTime);

                startupProfile[relation.measurement].push(relation.value);
            });

            performance.clearMarks();
            updateProfileChart();
        }

        function getArrayItem (array, key, value, splice) {
            for (var i = 0; i < array.length; ++i) {
                if (array[i][key] == value) {
                    if (splice) {
                        return array.splice(i, 1)[0];
                    }
                    else {
                        return array[i];
                    }
                }
            }
            return null;
        }

        function setArrayItem (array, key, value, replace) {
            for (var i = 0; i < array.length; ++i) {
                if (array[i][key] == value) {
                    array[i].startTime = replace;
                }
            }
            return null;
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
