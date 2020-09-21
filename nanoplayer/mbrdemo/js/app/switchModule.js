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
var switchModule = (function () {

    var algorithmStreamsContainer = document.getElementById('algorithmStreamsContainer');

    function renderSwitchMode() {
        renderAlgorithmContent();
    }

    function removeAllChildNodes(elem) {
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
    }

    function appendChildNodes(elem, childNodes) {
        childNodes.forEach(childNode => {
            elem.appendChild(childNode);
        })
    }

    function addClasses(elem, classesString) {
        var classes = classesString.split(" ");

        classes.forEach(c => {
            elem.classList.add(c);
        });
    }


    function buildStreamsWrapperItem(stream, isStreamActive) {
        var childNodes = [];
        var statusClasses, bitrateClasses, resolutionClasses, frameRateClasses, wrapperClasses;

        // add status icon / label
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
            clickEvent: {
                callback: playerModule.switchStream,
                data: stream.index
            }
        });
        
        // status (playing / ready)
        var elemStatus = createElement({
            type: "div",
            textContent: isStreamActive ? "radio_button_checked" : "radio_button_unchecked",
            classes: statusClasses
        });
        childNodes.push(elemStatus);
        
        // status tag
        var elemTag = createElement({
            type: "div",
            textContent: stream.tag,
            classes: tagClasses
        });
        childNodes.push(elemTag);

        // add bitrate
        var elemBitrate = createElement({
            type: "div",
            textContent: ((stream.info && stream.info.bitrate) ? stream.info.bitrate : "?") + " kbit/s",
            classes: bitrateClasses
        });
        childNodes.push(elemBitrate);

        // add stream info resolution + framerate
        var elemResolution = createElement({
            type: "div",
            textContent: ((stream.info && stream.info && stream.info.width && stream.info.width && stream.info.height) ? (stream.info.width + "x" + stream.info.height) : "?x? px"),
            classes: resolutionClasses
        });
        childNodes.push(elemResolution);

        var elemFrameRate = createElement({
            type: "div",
            textContent: ((stream.info && stream.info && stream.info.framerate) ? (stream.info.framerate) : "?") + " fps",
            classes: frameRateClasses
        });
        childNodes.push(elemFrameRate);

        appendChildNodes(wrapper, childNodes);

        return wrapper;
    }

    function createElement(props) {
        var elem;

        if (props.type) elem = document.createElement(props.type);
        if (props.textContent) elem.textContent = props.textContent;
        if (props.classes) addClasses(elem, props.classes);
        if (props.clickEvent) elem.addEventListener('click', function(data) {
            props.clickEvent.callback(data)
        }.bind(null, props.clickEvent.data));
        return elem;
    }

    function renderStreamsWrapper(streams) {
        removeAllChildNodes(algorithmStreamsContainer);
        var activeStream = playerModule.getActiveStream();
        var activeStreamname = activeStream ? activeStream.h5live.rtmp.streamname : undefined;

        streams.forEach((stream, i) => {
            var isStreamActive = activeStreamname === stream.h5live.rtmp.streamname;
            var streamsWrapperItem = buildStreamsWrapperItem(stream, isStreamActive);
            algorithmStreamsContainer.appendChild(streamsWrapperItem);
        })
    }

    function renderAlgorithmContent() {
        var streams = playerModule.getStreams();
        renderStreamsWrapper(streams);
    }

    return {
        renderSwitchMode: renderSwitchMode,
    }
}())