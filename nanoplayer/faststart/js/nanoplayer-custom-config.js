/* eslint-disable no-undef, no-console, no-unused-vars */
(function () {
    var useCustomConfig = false;
    if (useCustomConfig) {
        window.customConfig = {
            'source': {
                'entries': [ // array of 'entry' objects
                    {
                        'index' : 0,
                        'label' : 'high',
                        'tag'   : 'this is a high quality stream',
                        'info'  : {
                            'bitrate'   : 1200,
                            'width'     : 1280,
                            'height'    : 720,
                            'framerate' : 30
                        },
                        'hls'    : '',
                        'h5live' : {
                            'rtmp': {
                                'url'        : 'RTMP_URL_HERE',
                                'streamname' : 'RTMP_STREAMNAME_HERE'
                            },
                            'server': {
                                'websocket'   : 'H5LIVE_SERVER_WEBSOCKET_HERE',
                                'hls'         : 'H5LIVE_SERVER_HLS_HERE',
                                'progressive' : 'H5LIVE_SERVER_PROGRESSIVE_HERE'
                            },
                            'token'    : '',
                            'security' : {
                                'token'   : '',
                                'expires' : '',
                                'options' : '',
                                'tag'     : ''
                            }
                        },
                        'bintu': {}
                    },
                    {
                        'index' : 1,
                        'label' : 'medium',
                        'tag'   : 'this is a medium quality stream',
                        'info'  : {
                            'bitrate'   : 800,
                            'width'     : 864,
                            'height'    : 480,
                            'framerate' : 30
                        },
                        'hls'    : '',
                        'h5live' : {
                            'rtmp': {
                                'url'        : 'RTMP_URL_HERE',
                                'streamname' : 'RTMP_STREAMNAME_HERE'
                            },
                            'server': {
                                'websocket'   : 'H5LIVE_SERVER_WEBSOCKET_HERE',
                                'hls'         : 'H5LIVE_SERVER_HLS_HERE',
                                'progressive' : 'H5LIVE_SERVER_PROGRESSIVE_HERE'
                            },
                            'token'    : '',
                            'security' : {
                                'token'   : '',
                                'expires' : '',
                                'options' : '',
                                'tag'     : ''
                            }
                        },
                        'bintu': {}
                    },
                    {
                        'index' : 2,
                        'label' : 'low',
                        'tag'   : 'this is a low quality stream',
                        'info'  : {
                            'bitrate'   : 400,
                            'width'     : 640,
                            'height'    : 360,
                            'framerate' : 30
                        },
                        'hls'    : '',
                        'h5live' : {
                            'rtmp': {
                                'url'        : 'RTMP_URL_HERE',
                                'streamname' : 'RTMP_STREAMNAME_HERE'
                            },
                            'server': {
                                'websocket'   : 'H5LIVE_SERVER_WEBSOCKET_HERE',
                                'hls'         : 'H5LIVE_SERVER_HLS_HERE',
                                'progressive' : 'H5LIVE_SERVER_PROGRESSIVE_HERE'
                            },
                            'token'    : '',
                            'security' : {
                                'token'   : '',
                                'expires' : '',
                                'options' : '',
                                'tag'     : ''
                            }
                        },
                        'bintu': {}
                    }
                ],
                'options': {
                    'adaption': {
                        'rule': 'deviationOfMean'
                    },
                    'switch': {
                        'method'       : 'server',
                        'pauseOnError' : false,
                        'forcePlay'    : true,
                        'fastStart'    : false,
                        'timeout'      : 10,
                    }
                },
                'startIndex': 2 // lowest
            },
            'playback': {
                'autoplay'    : true,
                'automute'    : true,
                'muted'       : true,
                'flashplayer' : '//demo.nanocosmos.de/nanoplayer/nano.player.swf'
            },
            'style': {
                'displayMutedAutoplay': false
            },
            'events': {}
        };
    }
})(window);
