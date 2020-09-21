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
var playerModule = (function () {
    var config;
    var player;
    var videoElement;
    var ruleName;
    var ruleBackButton;
    var activeStream;
    var status = 'uninitialized';
    var buffering = {};
    var isPlaying = false;
    var isFullscreen = false;
    var updatingSource = false;
    var restartPlayerTimeout;
    var metaDataTimeout;
    var DEFAULT_VOLUME_UNMUTE = 0.4;
    var PLAYEREVENTS = [
        { Ready: handleReady },
        { Play: handlePlay },
        { Pause: handlePause },
        { Loading: handleLoading },
        { StartBuffering: handleStartBuffering },
        { StopBuffering: handleStopBuffering },
        { Error: handleError },
        { Warning: handleWarning },
        { MetaData: handleMetaData },
        { Stats: handleStats },
        { Mute: handleMute },
        { Unmute: handleUnmute },
        { VolumeChange: handleVolumeChange },
        { StreamInfo: handleStreamInfo },
        { StreamInfoUpdate: handleStreamInfoUpdate },
        { Destroy: handleDestroy },
        { UpdateSourceInit: handleUpdateSourceInit },
        { UpdateSourceSuccess: handleUpdateSourceSuccess },
        { UpdateSourceFail: handleUpdateSourceFail },
        { UpdateSourceAbort: handleUpdateSourceAbort },
        { SwitchStreamInit: handleSwitchStreamInit },
        { SwitchStreamSuccess: handleSwitchStreamSuccess },
        { SwitchStreamFail: handleSwitchStreamFail },
        { SwitchStreamAbort: handleSwitchStreamAbort }
    ];
    var streamsStatus = {};
    var muted = true;

    let blinkText = document.getElementById('blink-text');

    let ruleSwitch = document.getElementById("switch-1");

    // cache DOM
    var playerDiv = document.getElementById('playerDiv');

    // bind DOM events
    playerDiv.addEventListener('mouseenter', handleMouseEnter);
    playerDiv.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    function init(_config) {
        config = _config;

        if (window.nanoPlayerMetricsConfig) {
            config.metrics = window.nanoPlayerMetricsConfig;
        }

        setup();
        controlsOverlayModule.init();
        chartModule.init(player);
    }

    function setup() {
        player = new NanoPlayer("playerDiv");

        player.setup(config).then(function (_config) {
            setRule('deviationOfMean');
            setPlayerEvents();
            setVideoElementEvent
            initStreamStatus();
        }, function (error) {
            alert(error.message);
        });
    }

    function updateSource() {
        player.updateSource(config.source).then(function (_config) {
            log('updateSource initialized');
        }, function error(_err) {
            log('updateSource aborted with error ' + _err.code + ': ' + _err.message);
        });
    }

    function switchStream(index) {
        if (ruleSwitch.checked)
            ruleSwitch.click();
        player.switchStream(index).then(function(_config){
            log('switchStream initialized');
        }, function error(_err) {
            log('switchStream aborted with error ' + _err.code + ': ' + _err.message);
        });
    }

    /*function setRule(rule) {
        ruleName = document.getElementById('ruleName');
        ruleBackButton = document.getElementById('ruleBackButton');
        var oldRule = ruleName.textContent;
        if (rule === 'none' && oldRule !== 'none' && oldRule !== "" && oldRule !== undefined) {
            var button = document.createElement('button');
            button.textContent = 'back to rule \'' + oldRule + '\'';
            button.className = 'btn btn-accent text-capitalize font-weight-medium';
            button.style.marginLeft = '1em';
            button.addEventListener('click', updateSource);
            ruleBackButton.appendChild(button);
        } else if (rule !== 'none'){
            if (ruleBackButton.firstChild) {
                ruleBackButton.removeChild(ruleBackButton.firstChild);
            }
        }
        ruleName.textContent = rule;
    }*/

    ruleSwitch.addEventListener('click',function () {
        if (ruleSwitch.checked) {
            blinkText.style.display = 'flex';
            setRule('deviationOfMean')
        }
        else {
            blinkText.style.display = 'none';
            setRule('none')
        }
    });

    function setRule(useAdaption){
        let adaption = {
            "rule": "none"
        }

        if (useAdaption === 'deviationOfMean')
            adaption.rule = 'deviationOfMean';

        player.setAdaption(adaption);
    }

    function setPlayerEvents() {
        PLAYEREVENTS.forEach(function (event) {
            var key = Object.keys(event)[0];
            player.on(key, event[key]);
        });
    }

    function setVideoElementEvent() {
        // enables pausing/resuming by click on player 
        videoElement = document.getElementById('h5live-playerDiv');
        if (videoElement) {
            videoElement.addEventListener('click', function (e) {
                if (e.target === videoElement) togglePlay();
            });
        }
    }

    function setActiveStreamByStreamname(streamname) {
        if (!activeStream || activeStream.h5live.rtmp.streamname !== streamname) {
            activeStream = configModule.getStreamByStreamname(streamname);
        }
    }

    function setStatus(_status) {
        status = _status;

        if (status === 'pause' || status === 'ready') {
            isPlaying = false;
            controlsOverlayModule.setPlayIcon(false);
        } else {
            isPlaying = true;
            controlsOverlayModule.setPlayIcon(true);
        }
    }

    function setVolume(volume) {
        if (volume === 0.0) {
            player.mute();
            handleVolumeChangeEvents(0);
        } else {
            player.unmute();
            player.setVolume(volume);
            handleVolumeChangeEvents(volume*100);
        }
    }

    function getActiveStream() {
        return activeStream;
    }

    function handleMouseEnter() {
        controlsOverlayModule.show(true);
    }

    function handleMouseLeave() {
        controlsOverlayModule.show(false);
    }

    function handleReady(e) {
        setStatus('ready');
    }

    function handlePlay(e) {
        setStatus('playing');
    }

    function handlePause(e) {
        if (e.data.reason !== "normal" && e.data.reason !== "playbackrestart") {
            restartPlayer();
        }
        setStatus('pause');
    }

    function handleLoading(e) {
        setStatus('loading');
        log('loading = ' + JSON.stringify(e));
    }

    function handleStartBuffering(e) {
        log('onStartBuffering = ' + JSON.stringify(e));
        buffering.start = new Date();
    }

    function handleStopBuffering(e) {
        log('onStopBuffering = ' + JSON.stringify(e));
        buffering.stop = new Date();
        if (buffering.start) {
            var duration = Math.abs(buffering.stop - buffering.start);
            if (duration > 1000) {
                log('buffering ' + duration + 'ms');
            }
            buffering.stop = buffering.start = 0;
        }
    }

    function handleError(e) {
        var err;
        try {
            err = JSON.stringify(e);
            if (err === '{}') {
                err = e.message;
            }
            e = err;
        } catch (err) { }
        log('onError = ' + err);
    }

    function handleWarning(e) {
        log('onWarning = ' + e.data.message);
    }

    function handleMetaData(e) {
        var metadata = JSON.stringify(e.data);
        (metadata.length > 100) && (metadata = metadata.substr(0, 100) + '...');
        clearTimeout(metaDataTimeout);
        log('onMetaData = ' + JSON.stringify(e));
    }

    function handleMute() {
        log('onMmute');
        muted = true;
    }

    function handleUnmute(e) {
        log('onUnmute');
        muted = false;
    }

    function handleVolumeChange(e) {
        var volume = e.data.volume * 100;
        log('onVolumeChange ' + volume);
        handleVolumeChangeEvents(volume);
    }

    function handleStreamInfo(e) {
        //log('onStreamInfo = ' + JSON.stringify(e.data.streamInfo));
        var streamInfo = e.data.streamInfo;
        var streamname = streamInfo.rtmp.streamname;

        configModule.setStreamInfoByStreamname(streamname, streamInfo);
        setActiveStreamByStreamname(streamname);
        setStreamStatus(streamname, "live");
        switchModule.renderSwitchMode();
    }

    function handleStreamInfoUpdate(e) {
        log('onStreamInfoUpdate = ' + JSON.stringify(e.data.streamInfo));
    }

    function handleDestroy(e) {
        log('onDestroy = ' + JSON.stringify(e));
    }

    function handleStats(e) {
        var stats = e.data.stats;
        var payload = {
            stats: stats,
        };

        if (activeStream) payload.stream = activeStream;
        
        controlsOverlayModule.setPlayoutTime(payload.stats);
        statsOverlayModule.update(payload);
        chartModule.handleStats({ data: payload });
    }

    function handleUpdateSourceInit(e) {
        setRule(e.data.rule);
        chartModule.handleUpdateSourceInit(e);
    }

    function handleUpdateSourceSuccess(e) {
        chartModule.handleUpdateSourceCompleted(e);
    }

    function handleUpdateSourceFail(e) {
        chartModule.handleUpdateSourceCompleted(e);
    }

    function handleUpdateSourceAbort(e) {
        chartModule.handleUpdateSourceCompleted(e);
    }

    function handleSwitchStreamInit(e) {
        setRule(e.data.rule);
        chartModule.handleSwitchStreamInit(e);
        let streamname = e.data.entry.h5live.rtmp.streamname;

        let high = configModule.config.source.entries[0].h5live.rtmp.streamname;
        let mid = configModule.config.source.entries[1].h5live.rtmp.streamname;
        let low = configModule.config.source.entries[2].h5live.rtmp.streamname;

        switch(streamname){
            case high:
                blinkText.textContent = "switched to HIGH quality";
                resetBlinkAnimation(blinkText);
                console.log("high");
                break;
            case mid:
                blinkText.textContent = "switched to MEDIUM quality";
                resetBlinkAnimation(blinkText);
                console.log("mid");
                break;
            case low:
                blinkText.textContent = "switched to LOW quality";
                resetBlinkAnimation(blinkText);
                console.log("low");
                break;
        }

        setActiveStreamByStreamname(streamname);
        setStreamStatus(streamname, "live");
        switchModule.renderSwitchMode();
    }

    function handleSwitchStreamSuccess(e) {
        chartModule.handleSwitchStreamCompleted(e);
        log('onSwitchStreamSuccess = ' + JSON.stringify(e));
    }
    
    function handleSwitchStreamFail(e) {
        chartModule.handleSwitchStreamCompleted(e);
    }

    function handleSwitchStreamAbort(e) {
        chartModule.handleSwitchStreamCompleted(e);
    }

    // fixes bug when exiting fullscreen with ESC key
    function handleFullscreenChange() {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            isFullscreen = false;
        }
    }

    function handleVolumeChangeEvents(volume) {
        controlsOverlayModule.setVolumeSlider(volume);
        controlsOverlayModule.setVolumeIcon(volume);
    }

    function togglePlay() {
        isPlaying ? player.pause() : player.play();
    }

    function toggleFullscreen() {
        if (!isFullscreen) {
            if (playerDiv.requestFullscreen) {
                playerDiv.requestFullscreen();
            } else if (playerDiv.mozRequestFullScreen) { /* Firefox */
                playerDiv.mozRequestFullScreen();
            } else if (playerDiv.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                playerDiv.webkitRequestFullscreen();
            } else if (playerDiv.msRequestFullscreen) { /* IE/Edge */
                playerDiv.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        }
        isFullscreen = !isFullscreen;
    }

    function destroy() {
        player.destroy();
    }

    function getPlayer() {
        return player;
    }

    function restartPlayer() {
        clearTimeout(restartPlayerTimeout);

        if (!isPlaying) {
            restartPlayerTimeout = setTimeout(function () {
                togglePlay();
                restartPlayer();
            }, 2000);
        }
    }

    function initStreamStatus() {
        var streams = configModule.getStreams();
        streams.forEach(stream => {
            streamsStatus[stream.h5live.rtmp.streamname] = "ready";
        });
    }

    function setStreamStatus(streamname, newStatus) {
        if (newStatus === 'live') {
            // find old live and set to ready
            Object.keys(streamsStatus).forEach((stream, i) => {
                if (streamsStatus[stream] === 'live') streamsStatus[stream] = "ready";
            })
        }

        if (newStatus === 'init') {
            // find old init and set to ready
            Object.keys(streamsStatus).forEach((stream, i) => {
                if (streamsStatus[stream] === 'init') streamsStatus[stream] = "ready";
            })
        }

        if (streamsStatus[streamname]) {
            streamsStatus[streamname] = newStatus;
        }
    }

    function getStreams() {
        var streams = configModule.getStreams();
        // streams.forEach((stream) => {
        //     stream.status = streamsStatus[stream.h5live.rtmp.streamname] ? streamsStatus[stream.h5live.rtmp.streamname] : "???";
        // });

        return streams;
    }
        
    function getMuteState() {
        return muted;
    }

    function resetBlinkAnimation(){
        $target = $('#blink-text');
        $target.removeClass('blinking');
        setTimeout("$target.addClass('blinking');",100)
    }

    return {
        player: getPlayer,
        init: init,
        getActiveStream: getActiveStream,
        setActiveStreamByStreamname: setActiveStreamByStreamname,
        getStreams: getStreams,
        getMuteState: getMuteState,
        setVolume: setVolume,
        setStatus: setStatus,
        handleMute: handleMute,
        togglePlay: togglePlay,
        toggleFullscreen: toggleFullscreen,
        destroy: destroy,
        updateSource: updateSource,
        switchStream: switchStream
    }
}());