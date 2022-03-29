// nanoplayer-config
// nanoplayer configuration and stream creating
// (c) 2021, nanocosmos gmbh
// https://www.nanocosmos.de

// NanoPlayer Embed 1.2.0

/* eslint-disable no-undef, no-console, no-unused-vars */

// PARSE & CREATE CONFIG FROM QUERY PARAMETERS
// Comments are FYI, to explain what happens step by step:

const defaultServerRoutes = {
    'secured': {
        'websocket'   : ['wss://', ':443/h5live/stream'],
        'hls'         : ['https://', ':443/h5live/http/playlist.m3u8'],
        'progressive' : ['https://', ':443/h5live/http/stream.mp4']
    },
    'secured_stream': {
        'websocket'   : ['wss://', ':443/h5live/authstream'],
        'hls'         : ['https://', ':443/h5live/authhttp/playlist.m3u8'],
        'progressive' : ['https://', ':443/h5live/authhttp/stream.mp4']
    },
    'unsecured': {
        'websocket'   : ['ws://', ':8181'],
        'hls'         : ['http://', ':8180/playlist.m3u8'],
        'progressive' : ['http://', ':8180/stream.mp4']
    }
};
const defaultBintuApiUrl = 'https://bintu.nanocosmos.de';

// CONFIG TEMPLATE
var nanoPlayerConfig = {
    'source': {
        'defaults': {
            'service': 'bintu'
        },
        'entries' : [],
        'options' : {
            'adaption': {
                'rule': 'deviationOfMean2'
            }
        },
        'startIndex': 0
    },
    'playback': {
        'autoplay' : true,
        'automute' : true
    },
    'style': {
        'width'  : 'auto', // external style
        'height' : 'auto' // external style
    },
    // TO GET EVENTS FROM NANOPLAYER-EVENTS.JS
    'events': events
};


var configTypes = {
    'source': {
        'startIndex' : 'number',
        'options'    : {
            'switch'   : 'object',
            'adaption' : 'object'
        },
        'defaults': {
            'service': 'string'
        },
        'entries': {
            'entry': {
                'index' : 'number',
                'label' : 'string',
                'tag'   : 'string',
                'info'  : {
                    'bitrate'   : 'number',
                    'width'     : 'number',
                    'height'    : 'number',
                    'framerate' : 'number'
                },
                'hls'    : 'string',
                'h5live' : {
                    'server': {
                        'websocket'   : 'string',
                        'progressive' : 'string',
                        'hls'         : 'string'
                    },
                    'token' : 'string',
                    'rtmp'  : {
                        'url'        : 'string',
                        'streamname' : 'string'
                    },
                    'params'   : 'object',
                    'security' : {
                        'token'   : 'string',
                        'expires' : 'string',
                        'options' : 'string',
                        'tag'     : 'string'
                    }
                },
                'bintu': {
                    'apiurl'   : 'string',
                    'streamid' : 'string'
                }
            },
        },
    },
    'playback': {
        'autoplay'               : 'boolean',
        'automute'               : 'boolean',
        'muted'                  : 'boolean',
        'forceTech'              : 'string',
        'metadata'               : 'boolean',
        'flashplayer'            : 'string',
        'videoId'                : '*',
        'keepConnection'         : 'boolean',
        'allowSafariHlsFallback' : 'boolean',
        'crossOrigin'            : 'string',
        'mediaErrorRecoveries'   : 'number',
        'latencyControlMode'     : 'string',
        'reconnect'              : {
            'minDelay'   : 'number',
            'maxDelay'   : 'number',
            'delaySteps' : 'number',
            'maxRetries' : 'number'
        },
        'timeouts': {
            'loading'    : 'number',
            'buffering'  : 'number',
            'connecting' : 'number'
        }
    },
    'style': {
        'width'                : 'string',
        'height'               : 'string',
        'aspectratio'          : 'string',
        'controls'             : 'boolean',
        'interactive'          : 'boolean',
        'view'                 : 'boolean',
        'scaling'              : 'string',
        'keepFrame'            : 'boolean',
        'displayAudioOnly'     : 'boolean',
        'audioPlayer'          : 'boolean',
        'displayMutedAutoplay' : 'boolean',
        'backgroundColor'      : 'string',
        'fullScreenControl'    : 'boolean',
        'centerView'           : 'boolean',
        'symbolColor'          : 'string',
        'controlBarColor'      : 'string',
        'buttonAnimation'      : 'boolean',
        'buttonHighlighting'   : 'boolean',
        'buttonCursor'         : 'string',
        'poster'               : 'string'
    },
    'events': {
        'onReady'               : 'function',
        'onPlay'                : 'function',
        'onPause'               : 'function',
        'onLoading'             : 'function',
        'onStartBuffering'      : 'function',
        'onStopBuffering'       : 'function',
        'onError'               : 'function',
        'onMetaData'            : 'function',
        'onStats'               : 'function',
        'onMute'                : 'function',
        'onUnmute'              : 'function',
        'onVolumeChange'        : 'function',
        'onStreamInfo'          : 'function',
        'onStreamInfoUpdate'    : 'function',
        'onWarning'             : 'function',
        'onDestroy'             : 'function',
        'onUpdateSourceInit'    : 'function',
        'onUpdateSourceSuccess' : 'function',
        'onUpdateSourceFail'    : 'function',
        'onUpdateSourceAbort'   : 'function',
        'onSwitchStreamInit'    : 'function',
        'onSwitchStreamSuccess' : 'function',
        'onSwitchStreamFail'    : 'function',
        'onSwitchStreamAbort'   : 'function',
        'onFullscreenChange'    : 'function'
    },
    'tweaks': {
        'buffer': {
            'min'    : 'number',
            'start'  : 'number',
            'target' : 'number',
            'limit'  : 'number',
            'max'    : 'number'
        },
        'bufferDynamic': {
            'offsetThreshold' : 'number',
            'offsetStep'      : 'number',
            'cooldownTime'    : 'number'
        }
    }
};

var params = {}, paramsObject = {};

// Helper

function parseQuery () {
    var query = document.location.href;
    var pos = query.indexOf('?') + 1;
    if (pos) {
        query = query.slice(pos);
    }
    if (query !== '') {
        var gArr = query.split('&');
        for (var i = 0; i < gArr.length; ++i) {
            var v = '';
            var vArr = gArr[i].split('=');
            var k = vArr[0];
            if (vArr.length > 1) {
                v = vArr[1];
            }
            params[unescape(k)] = unescape(v);
        }
    }
    getParamsAsObject();
}

function getParamsAsObject () {
    var key, value;
    for (key in params) {
        if (Object.hasOwnProperty.call(params, key)) {
            value = params[key];
            addParam(paramsObject, key.split('.'), value);
        }
    }
}

function addParam (target, keys, value) {
    var key = keys.shift();
    if (key) {
        !target[key] && (target[key] = {});
        if (keys.length) {
            addParam(target[key], keys, value);
        }
        else {
            if (/^(true)$/.test(value)) {
                value = true;
            }
            else if (/^(false)$/.test(value)) {
                value = false;
            }
            else if (!isNaN(value)) {
                value = value.indexOf('.') !== -1 ? parseFloat(value) : parseInt(value, 10);
            }
            else {
                var values = value.split(',');
                if (values.length > 1) {
                    value = values;
                }
            }
            if (typeof value !== 'undefined') {
                target[key] = value;
            }
        }
    }
}

function extend (source, target, reference) {
    if (typeof source === 'undefined' || !source || !Object.keys(source).length) {
        return;
    }
    var key, keys, value, values;
    for (key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key) && (Object.prototype.hasOwnProperty.call(reference, key) || reference === 'object')) {
            !target[key] && (target[key] = {});
            if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
                extend(source[key], target[key], reference === 'object' ? reference : reference[key]);
            }
            else if (reference[key] && reference[key] === 'string') {
                target[key] = source[key].toString();
            }
            else if (reference[key] && reference[key] === 'number') {
                target[key] = !isNaN(source[key]) ? source[key] : source[key].indexOf('.') !== -1 ? parseFloat(source[key]) : parseInt(source[key], 10);
            }
            else if (reference[key] && reference[key] === 'boolean') {
                target[key] = !!source[key];
            }
            else if (reference[key] && typeof reference[key] === 'object' && Object.keys(reference[key]).length) {
                try {
                    keys = Object.keys(reference[key]);
                    value = source[key];
                    values = Array.isArray(value) || typeof value !== 'string' ? value : value.split(',');
                    if (values.length === keys.length) {
                        source[key] = {};
                        for (var i = 0; i < values.length; i += 1) {
                            source[key][keys[i]] = values[i].indexOf('.') !== -1 ? parseFloat(values[i]) : parseInt(values[i], 10);
                        }
                        extend(source[key], target[key], reference[key]);
                    }
                    else {
                        target[key] = source[key];
                    }
                }
                catch (e) {
                    target[key] = source[key];
                }
            }
            else {
                target[key] = source[key];
            }
        }
    }
}

function deepCopy (obj) {
    var rv, toString = Object.prototype.toString;

    switch (typeof obj) {
        case 'object':
            if (obj === null) {
                // null => null
                rv = null;
            }
            else {
                switch (toString.call(obj)) {
                    case '[object Array]':
                        // It's an array, create a new array with
                        // deep copies of the entries
                        rv = obj.map(deepCopy);
                        break;
                    case '[object Date]':
                        // Clone the date
                        rv = new Date(obj);
                        break;
                    case '[object RegExp]':
                        // Clone the RegExp
                        rv = new RegExp(obj);
                        break;
                    // ...probably a few others
                    default:
                        // Some other kind of object, deep-copy its
                        // properties into a new object
                        rv = Object.keys(obj).reduce(function (prev, key) {
                            prev[key] = deepCopy(obj[key]);
                            return prev;
                        }, {});
                        break;
                }
            }
            break;
        case 'undefined':
            // It's a primitive, copy via assignment
            rv = obj;
            break;
        default:
            // copy primitive value
            rv = obj.valueOf();
            break;
    }
    return rv;
}

function addSource () {
    extend(paramsObject, nanoPlayerConfig.source, configTypes.source);
    extend(paramsObject.options, nanoPlayerConfig.source.options.adaption, configTypes.source.options.adaption);
}

function addEntries () {
    var index = 1, suffix = '', unparsedEntry, parsedEntry;
    while ((unparsedEntry = deepCopy(paramsObject['entry' + suffix]))) {
        parsedEntry = {
            'index'  : index - 1,
            'h5live' : {
                'params': {
                    'embed'  : nanoPlayerEmbedVersion,
                    'iframe' : nanoPlayerEmbedVersion
                }
            },
            'bintu': {}
        };

        if (unparsedEntry.bintu && unparsedEntry.bintu.streamid) {
            parsedEntry.bintu = {
                'apiurl': defaultBintuApiUrl
            };
        }

        !unparsedEntry.h5live && extend(unparsedEntry, parsedEntry.h5live, configTypes.source.entries.entry.h5live);
        extend(unparsedEntry.h5live, parsedEntry.h5live, configTypes.source.entries.entry.h5live);

        extend(unparsedEntry, parsedEntry.bintu, configTypes.source.entries.entry.bintu);
        extend(unparsedEntry.bintu, parsedEntry.bintu, configTypes.source.entries.entry.bintu);

        if (!paramsObject.defaults || paramsObject.defaults.service !== 'bintu') {
            if (typeof unparsedEntry.server === 'string') {
                var securityCurrent = parsedEntry.h5live && parsedEntry.h5live.security;
                var route = (document.location.protocol.indexOf('https') === 0) ? (securityCurrent ? defaultServerRoutes.secured_stream : defaultServerRoutes.secured) : defaultServerRoutes.unsecured;
                parsedEntry.h5live.server = {
                    'websocket'   : route.websocket[0] + unparsedEntry.server + route.websocket[1],
                    'hls'         : route.hls[0] + unparsedEntry.server + route.hls[1],
                    'progressive' : route.progressive[0] + unparsedEntry.server + route.progressive[1]
                };
            }
        }

        nanoPlayerConfig.source.entries.push(parsedEntry);
        index++;
        suffix = index.toString();
    }
}

function addOtherConfigs () {
    extend(paramsObject, nanoPlayerConfig, configTypes);
    !paramsObject.playback && extend(paramsObject, nanoPlayerConfig.playback, configTypes.playback);
    !paramsObject.style && extend(paramsObject, nanoPlayerConfig.style, configTypes.style);
}

function parseConfig () {
    parseQuery();
    addSource();
    addEntries();
    addOtherConfigs();
}

parseConfig();

