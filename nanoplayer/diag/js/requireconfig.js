/**
 * Created by nandor.kostyo on 2016-10-04.
 */
var config = {
    'baseUrl': 'js'
};

if (false) {
    config.paths = {
        'nanoplayer' : '../nanocore/nanocore',
        'common'     : '../nanocore/common',
        'tools'      : '../nanocore/tools',
        'player'     : '../nanocore/player',
        'const'      : '../nanocore/const',
        'vendor'     : '../nanocore/vendor',
        'chart'      : '../vendor/chart',
        'socketio'   : '../vendor/socket.io'
    };
    config.map = {
        '*': {
            'dash/dash'   : 'common/iplayer',
            'dash/native' : 'common/iplayer'
        }
    };
}
else {
    config.paths = {
        'nanoplayer' : '../nanoplayer.3.min',
        'vendor'     : '../nanocore/vendor',
        'chart'      : '../vendor/chart',
        'socketio'   : '../vendor/socket.io'
    };
}

requirejs.config(config);
requirejs.onError = function (t) {
    var n = 'unknown error',
        e = t.stack;
    switch (t.requireType) {
        case 'scripterror':
            n = 'One or more module(s) missing!\r\n';
            break;
        case 'nodefine':
            n = 'One or more module(s) dont use the define directive!\r\n';
            break;
        case 'timeout':
            n = 'Timeout when loading one or more module(s)! You may try to reload the page!\r\n';
            break;
        case 'require':
            n = 'Error loading module(s)!\r\n';
    }
    n = n + 'Original error: ' + t + '\r\nStack: ' + e;
    console.error(n);
};

require(['app']);
