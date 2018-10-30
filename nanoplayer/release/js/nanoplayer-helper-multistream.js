var responseText, response, streamObj, streamObjs = [], streamObjsOld = [];

var searchStreams = function () {
    var group = getHTTPParam('bintu.group');
    var streamFilter = new BintuStreamFilter();
    streamFilter.setState(BintuStreamFilter.STATE.LIVE);
    streamFilter.addTags(['group:' + group]);
    bintu.getStreams(streamFilter, onGetStreamsSuccess.bind(this), onGetStreamsError.bind(this));
};

var onGetStreamsSuccess = function (request) {
    responseText = request.responseText;
    try {
        response = JSON.parse(responseText);
        console.log('success - get streams');
        console.log(response);
    } catch (err) {
        response = [];
        console.error(err);
    }

    // Clear streamObjs, if it exists and not empty
    if (!!streamObjs & streamObjs.length > 0) {
        streamObjs = [];
    }

    var i, responseLen = response.length;
    for (i = 0; i < responseLen; i += 1) {
        var streamObjTemp = getStreamFromResponse(response[i]);

        if (!!streamObjTemp) {
            streamObjs.push(streamObjTemp);
        }
    }

    if (JSON.stringify(streamObjsOld.sort()) === JSON.stringify(streamObjs.sort())) {
        console.log('no change');
        return;
    } else {
        streamObjsOld = streamObjs;
    }

    for (i = 0; i < streamObjs.length; i += 1) {
        var streamObjTemp = streamObjs[i];
            // Add new streams to stream-select, if needed
            var select = document.getElementById('stream-select');
            var j, selectLen = select.options.length, exists = false;
            for (j = 0; j < selectLen; j += 1) {
                var value = select.options[j].value;
                if (value === streamObjTemp.streamname)
                    exists = true;
            }
            if (!exists) {
                var text = streamObjTemp.streamname + ' ' + streamObjTemp.bitrate;
                var value = streamObjTemp.streamname;
                select.options[select.options.length] = new Option(text, value);
            }
    }

    // Remove finished streams from stream-select, if needed
    var select = document.getElementById('stream-select');
    var i, selectLen = select.options.length;
    if (selectLen > 1) {
        for (i = 1; i < selectLen; i += 1) {
            var value = select.options[i].value;
            if (streamObjs.findIndex(function (x) { return x.streamname === value }) === -1) {
                select.remove(i);
                i += 1;
            }
        }
    }

    var count = streamObjs.length
    var group = getHTTPParam('bintu.group');
    document.getElementById('group').innerText = group + ' - ' + count + ' stream(s)';

    if (streamObjs.length === 0) {
        streamObj = undefined;
    }

    if (responseLen === 0) {
        console.log('no stream found with the given search parameters');
        return;
    }

    resetPlayer();
};

onGetStreamsError = function (request) {
    console.log('no stream was found');
};

getStreamFromResponse = function (response) {
    var id = response.id;
    var h5live = response.playout.h5live[0];
    var url = h5live.rtmp.url;
    var streamName = h5live.rtmp.streamname;
    var server = h5live.server;

    var tags = response.tags;
    if (tags && tags.push) {
        var i, len = tags.length;
        for (i = 0; i < len; i += 1) {
            if (tags[i].indexOf('group') !== -1) {
                var group = tags[i];
                group = group.replace(/ /g, '').replace('group:', '');
            }

            if (tags[i].indexOf('bitrate') !== -1) {
                var bitrate = tags[i];
                bitrate = bitrate.replace(/ /g, '').replace('bitrate:', '');
            }
        }
    }

    if (!!id & !!url & !!streamName & !!group & !!bitrate) {
        return {
            'id': id,
            'url': url,
            'streamname': streamName,
            'group': group,
            'bitrate': bitrate,
            'server': server
        };
    }

    return {};
};
