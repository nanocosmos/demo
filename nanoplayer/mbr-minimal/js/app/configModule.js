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
var configModule = (function () {
    var defaultServerUrl;
    var defaultRtmpUrl;
    let entries = [];
    var validH5liveParams = ['entryX.server', 'entryX.security.expires', 'entryX.security.token', 'entryX.security.tag', 'entryX.security.options'];
    var paramStyleDefaultRtmpStreamname = 'h5live.rtmpX.streamname';
    var paramStyleEntriesRtmpStreamname = 'entryX.rtmp.streamname';
    var paramStyleDefaultRtmpUrl = 'h5live.rtmpX.url';
    var paramStyleEntriesRtmpUrl = 'entryX.rtmp.url';
    var maxEntries;
    var defaultsService = paramModule.getParamByKey('defaults.service') || 'bintu';
    let config = {
        'source': {
            'defaults': {
                'service': defaultsService
            },
            'h5live': {
                'server': {
                },
                'rtmp': {
                }
            }
        },
        'playback': {
            'autoplay'    : true,
            'automute'    : true,
            'muted'       : true,
            'timeouts'    : {
                'loading'    : 10,
                'buffering'  : 10,
                'connecting' : 10
            },
            'keepConnection': false
        },
        'style': {
            'controls'             : false,
            'displayMutedAutoplay' : false
        },
        'metrics': {
            'accountId'     : 'nanocosmos4',
            'accountKey'    : 'nc4ko5dv2bhcv3p0',
            'userId'        : 'demo1-multi',
            'eventId'       : 'release-multi',
            'statsInterval' : 10,
            'customField1'  : 'release test',
            'customField2'  : 'multi',
            'customField3'  : 'internal'
        }
    };

    let serverRoutes = {
        'secured': {
            'websocket'   : ['wss://', ':443/h5live/stream'],
            'hls'         : ['https://', ':443/h5live/http/playlist.m3u8'],
            'progressive' : ['https://', ':443/h5live/http/stream.mp4']
        },
        'unsecured': {
            'websocket'   : ['ws://', ':8181'],
            'hls'         : ['http://', ':8180/playlist.m3u8'],
            'progressive' : ['http://', ':8180/stream.mp4']
        }
    };

    function buildParam (string, index) {
        return string.replace('X', index === 1 ? '' : index);
    }

    function buildH5liveObject (index) {
        var h5live = {
            'server': {
                'websocket'   : '',
                'hls'         : '',
                'progressive' : ''
            },
            'token' : '',
            'rtmp'  : {
                'url'        : '',
                'streamname' : ''
            },
            'params'   : '',
            'security' : {
                'token'   : '',
                'expires' : '',
                'options' : '',
                'tag'     : ''
            }
        };

        validH5liveParams.forEach(function (param, j) {
            var _param = buildParam(param, index);
            var result = paramModule.getParamByKey(_param);

            if (_param.includes('server')) {
                var websocket = paramModule.getParamByKey(buildParam('entryX.server.websocket', index));
                var hls = paramModule.getParamByKey(buildParam('entryX.server.hls', index));
                var progressive = paramModule.getParamByKey(buildParam('entryX.server.progressive', index));

                h5live.server = result ? buildServerObject(result) : {};
                if (index === 1 && result) {
                    // set first server as default server address for later added streams
                    defaultServerUrl = result;
                }

                if (hls) {
                    h5live.server.hls = hls;
                }

                if (websocket) {
                    h5live.server.websocket = websocket;
                }

                if (progressive) {
                    h5live.server.progressive = progressive;
                }
                if (!Object.keys(h5live.server).length) {
                    delete h5live.server;
                }
            }
            else if (_param.includes('url')) {
                h5live.rtmp.url = result ? result : '';
                // set first url as default url for later added streams
                if (index === 1 && result) defaultRtmpUrl = result;
                if (!h5live.rtmp.url.length) {
                    delete h5live.rtmp.url;
                }
            }
            else if (_param.includes('streamname')) {
                h5live.rtmp.streamname = result;
            }
            else if (_param.includes('security') && result) {
                var key = _param.substring(_param.lastIndexOf('.') + 1);
                h5live.security[key] = result;
            }
        });

        return h5live;
    }

    function buildServerObject (serverUrl) {
        var protocol = document.location.protocol.indexOf('https') !== -1 ? 'secured' : 'unsecured';
        return {
            'websocket'   : serverRoutes[protocol].websocket[0] + serverUrl + serverRoutes[protocol].websocket[1],
            'hls'         : serverRoutes[protocol].hls[0] + serverUrl + serverRoutes[protocol].hls[1],
            'progressive' : serverRoutes[protocol].progressive[0] + serverUrl + serverRoutes[protocol].progressive[1]
        };
    }

    function buildStreamObject (streamname) {
        return {
            'rtmp': {
                'streamname' : streamname,
                'url'        : defaultRtmpUrl ? defaultRtmpUrl : '',
            },
            'server': defaultServerUrl ? buildServerObject(defaultServerUrl) : {}
        };
    }

    function buildEntryQualityTags () {
        var tags = ['high'];
        if (maxEntries === 3) tags.push('mid');
        tags.push('low');

        return tags;
    }

    function useStreamnameParamStyleEntries () {
        var param = buildParam(paramStyleEntriesRtmpStreamname, 1);

        return paramModule.getParamByKey(param);
    }

    function setMaxEntries () {
        maxEntries = 1;

        for (var i = 1; i < 10; i++) {
            var param = buildParam(paramStyleEntriesRtmpStreamname, i);
            if (paramModule.getParamByKey(param)) maxEntries = i;
            else break;
        }
    }

    // sets all streams found in params limited by maxEntriesCount
    // for one valid stream all params (server, url, streamname) need to be passed
    // if not => stops searching for further streams
    // takes first h5live.server as default server for later new added streams
    // expects stream params to be of form:
    // server: h5live.serverX
    // url: h5live.rtmpX.url
    // streamname: h5live.rtmpX.streamname
    // example first stream: h5live.server=XXXX&h5live.rtmp.url=YYYY&h5live.rtmp.streamname=ZZZZ
    // example second stream: h5live.server2=AAAA&h5live.rtmp2.url=BBBB&h5live.rtmp2.streamname=CCCC
    // example third stream: h5live.server3=XXXX&h5live.rtmp3.url=YYYY&h5live.rtmp3.streamname=ZZZZ
    function setEntriesFromHTTPParams () {
        if (useStreamnameParamStyleEntries()) {
            validH5liveParams.push(paramStyleEntriesRtmpStreamname);
            validH5liveParams.push(paramStyleEntriesRtmpUrl);
        }
        else {
            validH5liveParams.push(paramStyleDefaultRtmpStreamname);
            validH5liveParams.push(paramStyleDefaultRtmpUrl);
        }
         
        setMaxEntries();

        var tags = buildEntryQualityTags();

        for (var i = 1; i <= maxEntries; i++) {
            var entryInfo = getEntryInfo(i);
            var entryH5live = buildH5liveObject(i);

            var entry = {
                'index'  : i - 1,
                'label'  : 'stream ' + i,
                'tag'    : tags[i - 1],
                'info'   : entryInfo,
                'h5live' : entryH5live
            };

            entries.push(entry);
        }
    }

    function setConfigOptions () {
        config.source.options = {
            'adaption' : {},
            'switch'   : {}
        };

        var rule = paramModule.getParamByKey('rule') || paramModule.getParamByKey('options.rule');
        if (rule) {
            config.source.options.adaption.rule = rule;
        }
    }

    function setConfigEntries () {
        config.source.entries = entries;
    }

    function setConfigStartEntryByIndex (index) {
        config.source.h5live = config.source.entries[index].h5live;
    }

    function setConfigStartIndex (startIndex) {
        config.source.startIndex = startIndex;
    }

    function setConfigPlayback () {
        var params = paramModule.getParams();
        var keySubstring;
        var limiter = 'playback.';
        Object.keys(params).forEach(function (key) {
            if (key.includes(limiter)) {
                keySubstring = key.substring(limiter.length);
                config.playback[keySubstring] = params[key];
            }
        });
    }

    function setConfig () {
        var startIndex = getStartIndex();

        setConfigEntries();
        setConfigOptions();
        setConfigStartIndex(startIndex);
        setConfigStartEntryByIndex(startIndex);
        setConfigPlayback();
    }

    function setStreamInfoByStreamname (streamname, streaminfo) {
        var index = getStreamIndexByStreamname(streamname);
        if (index !== -1) {
            if (streaminfo.videoInfo) {
                if (streaminfo.videoInfo.width && !isNaN(parseInt(streaminfo.videoInfo.width))) entries[index].info.width = parseInt(streaminfo.videoInfo.width);
                if (streaminfo.videoInfo.height && !isNaN(parseInt(streaminfo.videoInfo.height))) entries[index].info.height = parseInt(streaminfo.videoInfo.height);
                if (streaminfo.videoInfo.frameRate && !isNaN(parseInt(streaminfo.videoInfo.frameRate))) entries[index].info.framerate = parseInt(streaminfo.videoInfo.frameRate);
            }
        }
    }

    function isValidStreamIndex (value, maxValue) {
        return !isNaN(value) && (value >= 0) && (value <= maxValue);
    }

    // finds stream by streamname and updates streamname
    // if new streamname is emtpy remove stream
    function updateStreamByStreamname (streamnameOld, streamnameNew) {
        if (streamnameNew === '') {
            removeStreamByStreamname(streamnameOld);
        }
        else {
            var index = getStreamIndexByStreamname(streamnameOld);
            if (index !== -1) {
                streams[index].h5live.rtmp.streamname = streamnameNew;
            }
        }
    }

    function addNewStreamByStreamname (streamname, vtransInfo) {
        // todo validate => check bintu?
        var stream = buildStreamObject(streamname);
        if (vtransInfo) stream.vtransInfo = vtransInfo;
        entries.push(stream);
    }

    function removeStreamByStreamname (streamname) {
        var index = getStreamIndexByStreamname(streamname);
        if (index !== -1) {
            entries.splice(index, 1);
        }
    }

    // returns all streams that are different then the passed stream
    function getStreamDifferentThenStreamname (streamname) {
        var streamsCopy = entries.slice();
        var index = streamsCopy.findIndex(function (stream) {
            return stream.h5live.rtmp.streamname === streamname;
        });

        if (index > -1) {
            streamsCopy.splice(index, 1);
        }

        return streamsCopy;
    }

    function getConfig () {
        return config;
    }

    function getStartIndex () {
        var startIndexParam = parseInt(paramModule.getParamByKey('startIndex'));
        return isValidStreamIndex(startIndexParam, entries.length - 1) ? startIndexParam : 0;
    }

    function getEntryInfo (index) {
        var indexParam = index === 1 ? '' : index;
        var paramBitrate = paramModule.getParamByKey('entry' + indexParam + '.info.bitrate');
        var paramWidth = paramModule.getParamByKey('entry' + indexParam + '.info.width');
        var paramHeight = paramModule.getParamByKey('entry' + indexParam + '.info.height');
        var paramFramerate = paramModule.getParamByKey('entry' + indexParam + '.info.framerate');

        return {
            'bitrate'   : (paramBitrate && paramBitrate !== '' && !isNaN(parseInt(paramBitrate))) ? parseInt(paramBitrate) : 0,
            'width'     : (paramWidth && paramWidth !== '' && !isNaN(parseInt(paramWidth))) ? parseInt(paramWidth) : 0,
            'height'    : (paramHeight && paramHeight !== '' && !isNaN(parseInt(paramHeight))) ? parseInt(paramHeight) : 0,
            'framerate' : (paramFramerate && paramFramerate !== '' && !isNaN(parseInt(paramFramerate))) ? parseInt(paramFramerate) : 0
        };
    }

    function getStreams () {
        return entries;
    }

    function getStreamByStreamname (streamname) {
        return entries.find(function (stream) {
            return stream.h5live.rtmp.streamname === streamname;
        });
    }

    function getStreamIndexByStreamname (streamname) {
        return entries.findIndex((stream) => stream.h5live.rtmp.streamname === streamname);
    }


    function init () {
        setEntriesFromHTTPParams();
        setConfig();
    }

    return {
        'init'                             : init,
        'config'                           : config,
        'getConfig'                        : getConfig,
        'getStreams'                       : getStreams,
        'getStreamByStreamname'            : getStreamByStreamname,
        'setStreamInfoByStreamname'        : setStreamInfoByStreamname,
        'updateStreamByStreamname'         : updateStreamByStreamname,
        'addNewStreamByStreamname'         : addNewStreamByStreamname,
        'getStreamDifferentThenStreamname' : getStreamDifferentThenStreamname
    };
})();
