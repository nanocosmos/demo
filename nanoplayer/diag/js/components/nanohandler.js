/**
 * Created by nandor.kostyo on 2017-03-01.
 */
define([
    'log',
    'util/browserinfo',
    'util/graylog',
    'events/uievents',
    'events/logicevents',
    'events/playerevents',
    'common/listenermanager'
], function (
    logger,
    browserInfo,
    graylog,
    uiEvents,
    logicEvents,
    playerEvents,
    listenerManager
) {
    var log = logger.create('nanohandler');
    var autoplay = true, keepConnection = false, muted = false, blur = 15;
    var videoId = null;

    if (!NanoPlayer) {
        NanoPlayer = window.NanoPlayer;
    }

    function create (emitter) {
        var emitterListeners = [
            {type: logicEvents.CONFIGURATION,       listener: onConfiguration},
            {type: uiEvents.CHECK_AUTOPLAY,         listener: onCheckAutoplay},
            {type: uiEvents.CHECK_KEEP_CONNECTION,  listener: onCheckKeepConnection},
            {type: uiEvents.CHECK_MUTED,            listener: onCheckMuted},
            {type: uiEvents.RANGE_BLUR,             listener: onRangeBlur},
            {type: uiEvents.VIDEO_ELEMENT_USAGE,    listener: onVideoElementUsage},
            {type: uiEvents.PLAY,                   listener: onPlay},
            {type: uiEvents.PAUSE,                  listener: onPause},
            {type: uiEvents.DESTROY,                listener: destroyPlayer}
        ];

        var player, buffering = { start: 0, end: 0}, streamInfo, conf, server, stats;

        function init() {
            listenerManager.add({ target: emitter, listeners: emitterListeners });
        }

        function destroy () {
            listenerManager.remove({target: emitter,    listeners: emitterListeners});
        }

        function onConfiguration (e) {
            destroyPlayer();
            createPlayer(e.data);
        }

        function onCheckAutoplay(e) {
            autoplay = e.data;
        }

        function onCheckKeepConnection(e) {
            keepConnection = e.data;
        }

        function onCheckMuted(e) {
            muted = e.data;
        }

        function onRangeBlur(e) {
            blur = e.data;
            if (player) {
                var video = document.getElementById('playerDiv').querySelector('video');
                if (video) {
                    video.style.filter = 'blur(' + blur + 'px)';
                }
            }
        }

        function onVideoElementUsage (e) {
            videoId = e.data.videoId;
        }

        function createPlayer(config) {
            emitter.emit(playerEvents.VERSIONING, NanoPlayer.version);
            config.playback = {
                autoplay: autoplay,
                muted: muted,
                videoId: videoId
            };

            if (keepConnection) config.playback.keepConnection = keepConnection;

            player = new NanoPlayer("playerDiv");
            setListeners();

            window.fragments = [];

            player.setup(config).then(function (config) {
                conf = config;
                server = conf.source.h5live.server.websocket.split('//')[1].split('/')[0];
                emitter.emit(playerEvents.CREATE);
				var video = document.getElementById('playerDiv').querySelector('video');
                if (video) {
                    video.style.filter = 'blur(' + blur + 'px)';
                }
            }, function (err) {
                log('nanoplayer failed');
                log(JSON.stringify(err));
                log(err.toString())
            });
        }

        function destroyPlayer () {
            if (player) {
                player.destroy();
                player = null;
                emitter.emit(playerEvents.DESTROY);
            }
        }

        function setListeners(){
            player.on('Ready', function (e) {
                log('nano ready');
            });
            player.on('Play', function (e) {
                logging(e);
                log('nano playing');
                emitter.emit(playerEvents.PLAYING, 'play');
            });
            player.on('Pause', function (e) {
                logging(e);
                log('nano pause ' + e.data.reason);
            });
            player.on('Loading', function (e) {
                emitter.emit(playerEvents.LOADING);
                log('nano loading');
            });
            player.on('StartBuffering', function (e) {
                buffering.start = new Date();
                emitter.emit(playerEvents.BUFFERING);
            });
            player.on('StopBuffering', function (e) {
                buffering.stop = new Date();
                if (buffering.start) {
                    var duration = Math.abs(buffering.stop - buffering.start);
                    if (duration > 1000) {
                        log('nano buffering ' + duration + 'ms');
                        log('nano resume playing');
                        e.name = 'Buffering';
                        e.data.duration = duration;
                        logging(e);
                    }
                    buffering.stop = buffering.start = 0;
                }
                emitter.emit(playerEvents.PLAYING, 'resume');
            });
            player.on('Error', function (e) {
                try {
                    var err = JSON.stringify(e);
                    if (err === '{}') {
                        err = e.message;
                    }
                    e = err;
                } catch (err) {
                }
                log('nano error: ' + e, 'error');
            });
            player.on('Warning', function (e) {
                log('nano warning: ' + e.data.message, 'warning');
            });
            player.on('Metadata', function (e) {
                log('nano onMetaData');
                log(JSON.stringify(e));
            });
            player.on('Stats', function (e) {
                stats = e.data.stats;
                emitter.emit(playerEvents.STATS, e);
            });
            player.on('StreamInfo', function (e) {
                log('nano onStreamInfo');
                log(JSON.stringify(e));
                streamInfo = e.data.streamInfo;
            });
        }

        function logging(event) {
            graylog.log({
                name: event.name.toLowerCase(),
                stream_info: streamInfo,
                id: event.id,
                version: event.version,
                source: server,
                application_name: 'h5live_player',
                severity: 'info',
                message: JSON.stringify(event),
                duration: event.data.duration || 0,
                playtime: stats.currentTime,
                referrer: document.location.href,
                user_agent: navigator.userAgent,
                browser_info: browserInfo,
                rtmp_url: conf.source.h5live.rtmp.url,
                rtmp_streamname: conf.source.h5live.rtmp.streamname,
                orga_hash: (conf.source.h5live.rtmp.url.indexOf('bintu') !== -1) ? conf.source.h5live.rtmp.streamname.split('-')[0] : ''
            });
        }

        function onPlay () {
            if (player) {
                player.play();
            }
        }

        function onPause () {
            if (player) {
                player.pause();
            }
        }

        init();

        return {
            destroy: destroy
        };
    }

    return {
        create: create
    };
});
