// nanoPlayer Code Snippet Creation Scripts
// (c) 2019-2022 nanocosmos gmbh

/* eslint-disable no-undef, no-console, no-unused-vars */
function isEmptyObject (obj) {
    return isObject(obj) && Object.keys(obj).length === 0;
}

function isObject (obj) {
    return obj.constructor === Object;
}

function isEmptyString (str) {
    return typeof str === 'string' && str.length === 0;
}

function isEmptyArray (arr) {
    return Array.isArray(arr) && arr.length === 0;
}

function removeFromConfig (config) {
    Object.keys(config).forEach(function (key) {
        if (isObject(config[key]) && !isEmptyObject(config[key])) {
            removeFromConfig(config[key]);
        }

        if (isEmptyArray(config[key]) || isEmptyString(config[key]) || isEmptyObject(config[key])) {
            delete config[key];
        }
        else if (Array.isArray(config[key])) {
            config[key].forEach(function (obj) {
                removeFromConfig(obj);
            });
        }
        else if (config[key].constructor === Object) {
            removeFromConfig(config[key]);
        }
    });
    return config;
}

function removePlaceholders (string) {
    var placeholders = ['"___', '___"'];
    for (var i = 0; i < placeholders.length; i += 1) {
        var placeholder = placeholders[i];
        while (string.indexOf(placeholder) !== -1) {
            string = string.replace(placeholder, '');
        }
    }
    return string;
}

function createCodeSippet (_config) {
    // create codesnippet
    var pre = document.getElementById('code-snippet');
    pre.innerHTML = '';
    var line = '<div id="playerDiv"></div>\r\n';
    line += '<script src="' + getPlayerLocation() + '"></script>\r\n';
    line += '<script>\r\n';
    line += 'var player;\r\n';

    // prepare config for parsing
    // copy config
    var config = JSON.parse(JSON.stringify(_config));
    // remove events
    delete config.events;
    // remove empty objects, arrays & undefined keys
    removeFromConfig(config);
    // transform old to new
    var i, len, entry, entryType, entryTypes = ['bintu', 'h5live'], commonServer, commonUrl;
    for (i = 0, len = entryTypes.length; i < len; i += 1) {
        entryType = entryTypes[i];
        if (config.source[entryType]) {
            entry = {
                'index': 0
            };
            entry[entryType] = JSON.parse(JSON.stringify(config.source[entryType]));
            config.source.entries = [
                entry
            ];
            delete config.source[entryType];
            break;
        }
        entryType = undefined;
    }
    if (!config.source.entries) {
        console.log('Error: no source entries?');
    }
    else {
        if (!entryType) {
            for (i = 0, len = entryTypes.length; i < len; i += 1) {
                entryType = entryTypes[i];
                if (config.source.entries[0][entryType]) {
                    break;
                }
                entryType = undefined;
            }
        }
        // check if is redundant code snippet
        var isSameServer, isSameUrl, hasNoServer, hasNoUrl, isGroupStreams;
        var filtered = config.source.entries.filter(function (entry) {
            return !!entry[entryType];
        });
        if (filtered.length === config.source.entries.length) {
            isSameServer = filtered.every(function (entry) {
                return entry.h5live && entry.h5live.server && JSON.stringify(entry.h5live.server) === JSON.stringify(filtered[0].h5live.server);
            });
            hasNoServer = filtered.every(function (entry) {
                return !entry.h5live || (entry.h5live && !entry.h5live.server);
            });
            isSameUrl = filtered.every(function (entry) {
                return entry.h5live && entry.h5live.rtmp && entry.h5live.rtmp.url && entry.h5live.rtmp.url === filtered[0].h5live.rtmp.url;
            });
            hasNoUrl = filtered.every(function (entry) {
                return !entry.h5live || (entry.h5live && (!entry.h5live.rtmp || (entry.h5live.rtmp && !entry.h5live.rtmp.url)));
            });
            isGroupStreams = (isSameServer || isSameUrl) || (hasNoServer && hasNoUrl);
        }
        var _asArray = typeof window.asArray !== 'undefined' ? window.asArray : true;
        // add defaults
        if (isSameUrl) {
            commonUrl = config.source.entries[0].h5live.rtmp.url;
            line += 'var commonUrl = "' + commonUrl + '"; \r\n';
        }
        if (isSameServer) {
            commonServer = config.source.entries[0].h5live.server;
            line += 'var commonServer = ' + JSON.stringify(commonServer, undefined, 4) + '; \r\n';
        }
        if (isGroupStreams) {
            _asArray && (line += 'var ' + (entryType === 'h5live' ? 'streamNames' : 'bintuStreamIds') + ' = [ \r\n');
        }
        for (i = 0, len = config.source.entries.length; i < len; i++) {
            entry = config.source.entries[i];
            // add stream name
            if (isGroupStreams) {
                if (_asArray) {
                    line += '   "' + (entryType === 'h5live' ? entry.h5live.rtmp.streamname : entry.bintu.streamid) + '"';
                    (i !== len - 1) && (line += ',');
                }
                else {
                    line += 'var ' + (entryType === 'h5live' ? 'streamName' : 'bintuStreamId') + (i + 1) + ' = "' + (entryType === 'h5live' ? entry.h5live.rtmp.streamname : entry.bintu.streamid) + '";';
                }
                line += ' \r\n';
            }
            // set placeholders
            if (isSameUrl) {
                entry.h5live.rtmp.url = '___commonUrl___';
            }
            if (isSameServer) {
                entry.h5live.server = '___commonServer___';
            }
            if (isGroupStreams) {
                if (entry.h5live && entry.h5live.rtmp && entry.h5live.rtmp.streamname) {
                    entry.h5live.rtmp.streamname = '___streamName' + (_asArray ? 's[' + i + ']' : (i + 1)) + '___';
                }
                if (entry.bintu && entry.bintu.streamid) {
                    entry.bintu.streamid = '___bintuStreamId' + (_asArray ? 's[' + i + ']' : i) + '___';
                }
            }
        }
        if (isGroupStreams) {
            _asArray && (line += ']; \r\n');
        }
    } // end of check config.source.entries
    config = JSON.stringify(config, null, 4);
    config = removePlaceholders(config);

    // add code snippet end
    line += 'var config = ' + config + ';\r\n';
    line += 'document.addEventListener(\'DOMContentLoaded\', function () {\r\n';
    line += '    player = new NanoPlayer("playerDiv");\r\n';
    line += '    player.setup(config).then(function (config) {\r\n';
    line += '        console.log("setup success");\r\n';
    line += '        console.log("config: " + JSON.stringify(config, undefined, 4));\r\n';
    line += '    }, function (error) {\r\n';
    line += '        alert(error.message);\r\n';
    line += '    });\r\n';
    line += '});\r\n';
    line += '</script>\r\n';
    pre.appendChild(document.createTextNode(line));
    document.getElementById('code-snippet-container').style.display = 'block';
}
