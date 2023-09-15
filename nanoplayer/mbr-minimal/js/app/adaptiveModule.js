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
var adaptiveModule = (function () {
    var rulePrev;
    var entries = [];
    var config;
    var entryPointNode;
    var defaultEntryPointId = "qualitiesWrapper";
    var APPEVENTS = [
        {
            playerModulePlayerSetup: function (e) {
                initConfig(e);
            }
        },
        {
            playerModuleUpdateSourceInit: function (e) {
                setRule(e.data.rule);
            }
        },
        {
            playerModuleSwitchStreamInit: function (e) {
                setRule(e.data.rule);
            }
        },
        {
            playerModulePlayerSetup: function (e) {
                setConfig(e.config);
            }
        },
        {
            playerModuleEntriesChanged: function (entries) {
                setEntries(entries);
                renderEntriesWrapper();
            }
        }
    ];

    function isAdaptiveConfig(config) {
        return config && config.source.options && config.source.options.adaption
    }

    function setRule(rule) {
        rulePrev = ruleNameWrapper.textContent;
        if (rule === 'none' && rulePrev !== 'none' && rulePrev !== "" && rulePrev !== undefined) {
            buildRuleBackButton();
        } else if (rule !== 'none') {
            removeAllChildNodes(ruleBackButtonWrapper);
        }

        ruleNameWrapper.textContent = rule;
    }

    function buildRuleBackButton() {
        var ruleBackButton = createElement({
            type: "button",
            textContent: 'back to rule \'' + rulePrev + '\'',
            classes: 'btn btn-accent text-capitalize font-weight-medium',
            events: [{
                type: 'click',
                callback: playerModule.updateSource,
                data: config.source
            }]
        });

        ruleBackButtonWrapper.appendChild(ruleBackButton);
    }

    function buildEntriesWrapperItem(entry, isStreamActive) {
        var statusClasses, bitrateClasses, resolutionClasses, frameRateClasses, wrapperClasses;

        // set classes
        if (isStreamActive) {
            statusClasses = "material-icons col-1 subtitle-1 tertiary--text";
            tagClasses = "col-2 col-md-2 col-lg-2 col-xl-2 subtitle-1 white--text font-weight-medium text-capitalize";
            bitrateClasses = "col subtitle-1 white--text font-weight-medium";
            resolutionClasses = "col subtitle-1 white--text font-weight-medium";
            frameRateClasses = "col-2 col-md col-lg col-xl subtitle-1 white--text font-weight-medium streamWrapperItemFrameRate";
            wrapperClasses = "align-items-center d-flex row flex-1 mx-0 mb-lg-3 mb-3 px-0 py-3 py-md-3 py-lg-3 py-xl-4 corners--round border--active background--light box-shadow__material pointer";
        } else {
            statusClasses = "material-icons col-1 subtitle-1 secondary--text";
            tagClasses = "col-2 col-md-2 col-lg-2 col-xl-2 subtitle-2 secondary--text font-weight-regular text-capitalize";
            bitrateClasses = "col subtitle-2 secondary--text font-weight-regular";
            resolutionClasses = "col subtitle-2 secondary--text font-weight-regular";
            frameRateClasses = "col-2 col-md col-lg col-xl subtitle-2 secondary--text font-weight-regular streamWrapperItemFrameRate";
            wrapperClasses = "align-items-center d-flex row flex-1 mx-0 mb-lg-3 mb-3 px-0 py-2 py-md-3 py-lg-3 py-xl-4 corners--round pointer";
        }

        var wrapper = createElement({
            type: "div",
            classes: wrapperClasses,
            events: [{
                type: "click",
                callback: playerModule.switchStream,
                data: entry.index
            }],
            childNodes: [
                // status (live / default)
                {
                    type: "div",
                    textContent: isStreamActive ? "radio_button_checked" : "radio_button_unchecked",
                    classes: statusClasses
                },
                // tag
                {
                    type: "div",
                    textContent: entry.tag,
                    classes: tagClasses
                },
                // bitrate info
                {
                    type: "div",
                    textContent: ((entry.info && entry.info.bitrate) ? entry.info.bitrate : "?") + " kbit/s",
                    classes: bitrateClasses
                },
                // resolution info
                {
                    type: "div",
                    textContent: ((entry.info && entry.info && entry.info.width && entry.info.width && entry.info.height) ? (entry.info.width + "x" + entry.info.height) : "?x? px"),
                    classes: resolutionClasses
                },
                // framerate info
                {
                    type: "div",
                    textContent: ((entry.info && entry.info && entry.info.framerate) ? (entry.info.framerate) : "?") + " fps",
                    classes: frameRateClasses
                }
            ]
        });

        return wrapper;
    }

    function renderEntriesWrapper() {
        var entryIsActive = false;
        var activeEntry = playerModule.getActiveEntry();

        removeAllChildNodes(qualitiesContainer);
        entries.forEach((entry) => {
            entryIsActive = isEntryActive(entry, activeEntry);
            var entriesWrapperItem = buildEntriesWrapperItem(entry, entryIsActive);
            qualitiesContainer.appendChild(entriesWrapperItem);
        })
    }

    function buildEntrypointWrapper() {
        var innerWrapper = createElement(
            {
                type: "div",
                childNodes: [
                    {
                        type: "div",
                        classes: "col px-0",
                        childNodes: [
                            {
                                type: "div",
                                classes: "row flex-lg-wrap pb-md-2 pb-4 mx-0 align-items-center justify-content-left",
                                childNodes: [
                                    {
                                        type: "div",
                                        classes: "font-weight-bold headline white--text text-left",
                                        textContent: "Switch Rule"
                                    }
                                ]
                            },
                            {
                                type: "div",
                                classes: "align-items-center d-flex row flex-1 mx-0 mb-lg-3 mb-3 px-0 py-3 py-md-3 py-lg-3 py-xl-4 corners--round border--active background--light box-shadow__material",
                                childNodes: [
                                    {
                                        type: "div",
                                        id: "ruleNameWrapper",
                                        classes: "col subtitle-1 white--text font-weight-regular text-capitalize font-weight-medium"
                                    },
                                    {
                                        type: "div",
                                        id: "ruleBackButtonWrapper",
                                        classes: "col subtitle-1 white--text font-weight-regular text-capitalize"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: "div",
                        classes: "col px-0",
                        childNodes: [
                            {
                                type: "div",
                                classes: "row flex-lg-wrap pb-md-2 pb-4 mx-0 align-items-center justify-content-left",
                                childNodes: [
                                    {
                                        type: "div",
                                        classes: "font-weight-bold headline white--text text-left",
                                        textContent: "Qualities"
                                    }
                                ]
                            },
                            {
                                type: "div",
                                id: "qualitiesContainer",
                                classes: "col flex-col flex-1 mx-0 px-0 justify-content__center pb-xl-2"
                            }
                        ]
                    }
                ]
            }
        );

        var defaultEntryPoint = getElementById(defaultEntryPointId);
        defaultEntryPoint.appendChild(innerWrapper);
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

    function setConfig(_config) {
        config = _config;
    }

    function setEntries(newEntries) {
        entries = newEntries;
    }

    function initConfig(e) {
        if (e && isAdaptiveConfig(e.config)) {
            var rule = e.config.source.options.adaption.rule;
            if (rule) setRule(rule);
            renderEntriesWrapper();
        }
    }

    function setEntryPointNode(entryPointId) {
        entryPointNode = getElementById(entryPointId ? entryPointId : defaultEntryPointId);
    }

    function isEntryActive(entry, activeEntry) {
        return activeEntry &&
            activeEntry.h5live &&
            activeEntry.h5live.rtmp &&
            activeEntry.h5live.rtmp.streamname &&
            activeEntry.h5live.rtmp.streamname === entry.h5live.rtmp.streamname;
    }

    function init(entryPointId) {
        setEntryPointNode(entryPointId);
        if (entryPointNode) {
            buildEntrypointWrapper();
            setAppEvents();
        } else {
            console.log("[adaptiveModule] entryPoint DOM node not found!");
        }
    }

    return {
        init: init
    }
}());