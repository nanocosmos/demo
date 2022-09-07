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
var statsModule = (function () {
    var APPEVENTS = [
        {
            playerModuleStats: function (e) {
                update(e);
            }
        },
        {
            playerModuleStreamInfo: function (e) {
                setStreamInfo(e);
            }
        }
    ];
    var defaultEntryPointId = "playerWrapper";
    var streamInfo;
    var statsDOMElements = {};
    var entryPointNode;

    function update(payload) {
        if (payload) {

            if (payload.stream) {
                if (payload.stream.info) {
                    statsDOMElements['statsResolution'].textContent = payload.stream.info ? payload.stream.info.width + "x" + payload.stream.info.height : 'Unknown';
                }
            }

            if (payload.stats) {
                statsDOMElements['statsFrameRate'].textContent = (payload.stats.framerate.avg).toFixed(1);
                statsDOMElements['statsBitrate'].textContent = (payload.stats.bitrate.avg / 1000).toFixed(0);
                statsDOMElements['statsLatency'].textContent = payload.stats.buffer.delay.avg.toFixed(1);
            }
        }
    }

    function setAppEvents() {
        setEventsListeners(events, APPEVENTS)
    }

    function setEventsListeners(obj, eventsArr) {
        eventsArr.forEach(function (event) {
            var key = Object.keys(event)[0];
            obj.on(key, event[key]);
        });
    }

    function setStreamInfo(e) {
        streamInfo = e.streamInfo;
        statsResolution.textContent = streamInfo.videoInfo ? streamInfo.videoInfo.width + "x" + streamInfo.videoInfo.height : 'Unknown';
    }

    function buildStatsElement(options) {
        var wrapper = createElement({
            type: "div",
            classes: "flex-col flex-1 d-flex align-items-start justify-content-center px-0 py-3",
            childNodes: [
                {
                    type: "div",
                    classes: "row mx-0 d-flex",
                    childNodes: [
                        {
                            type: "div",
                            classes: "font-weight-regular subtitle-1 secondary--text",
                            textContent: options.title
                        }
                    ]
                },
                {
                    type: "div",
                    classes: "row mx-0 mt-0 d-flex justify-content-left",
                    childNodes: [
                        {
                            type: "span",
                            id: options.outputId,
                            classes: "font-weight-bold title pr-1 white--text"
                        },
                        {
                            type: "div",
                            classes: "font-weight-regular subtitle-2 white--text",
                            textContent: options.unit,
                        }
                    ]
                }
            ]
        });

        return wrapper;
    }

    function cacheStatsDOMElementsById(ids) {
        var element;

        ids.forEach(function (id) {
            element = getElementById(id)
            if (element) statsDOMElements[id] = element;
            element = undefined;
        });
    }

    function buildStatsWrapper() {
        var statsElements = [];
        var elementIds = [];

        var playerStatsWrapper = createElement({
            id: "playerStatsWrapperInside",
            type: "div",
            classes: "d-flex px-lg-3 px-xl-4 mx-0 mt-4 mt-xl-4 justify-content-between corners--round box-shadow__material border--active section--background__light",
        });

        var stats = [
            {
                title: "Latency",
                unit: "s",
                outputId: "statsLatency"
            },
            {
                title: "Bitrate",
                unit: "kbit/s",
                outputId: "statsBitrate"
            },
            {
                title: "Framerate",
                outputId: "statsFrameRate"
            },
            {
                title: "Resolution",
                unit: "px",
                outputId: "statsResolution"
            }
        ];

        stats.forEach(function (stat) {
            statsElement = buildStatsElement(stat);
            statsElements.push(statsElement);
            elementIds.push(stat.outputId);
        });

        appendChildNodes(playerStatsWrapper, statsElements);
        entryPointNode.appendChild(playerStatsWrapper);
        cacheStatsDOMElementsById(elementIds);
    }

    function setEntryPointNode(entryPointId) {
        entryPointNode = getElementById(entryPointId ? entryPointId : defaultEntryPointId);
    }

    function init(entryPointId) {
        setEntryPointNode(entryPointId);
        if (entryPointNode) {
            buildStatsWrapper(entryPointId);
            setAppEvents();
        } else {
            console.log("[statsModule] entryPoint DOM node not found!");
        }

    }

    return {
        init: init
    }
}());