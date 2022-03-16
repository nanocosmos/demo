/* eslint-disable no-undef, no-console, no-unused-vars */
var events = {};

events.onReady = function () {
    log('ready');
    document.getElementById('status').innerText = 'ready';
};
events.onPlay = function (e) {
    log('playing');
    log('play stats: ' + JSON.stringify(e.data));
    document.getElementById('status').innerText = 'playing';
    hideErrorWarning();
};
events.onPause = function (e) {
    var reason = (e.data.reason !== 'normal') ? ' ($reason$)'.replace('$reason$', e.data.reason) : '';
    log('pause' + reason);
    document.getElementById('status').innerText = 'paused' + reason;
};
events.onLoading = function () {
    log('loading');
    document.getElementById('status').innerText = 'loading';
};
events.onStartBuffering = function () {
    buffering.start = new Date();
    setTimeout(function () {
        if (buffering.start) {
            document.getElementById('status').innerText = 'buffering';
        }
    }, 2000);
};
events.onStopBuffering = function () {
    buffering.stop = new Date();
    if (buffering.start) {
        var duration = Math.abs(buffering.stop - buffering.start);
        if (duration > 1000) {
            log('buffering ' + duration + 'ms');
        }
        buffering.stop = buffering.start = 0;
    }
    document.getElementById('status').innerText = 'playing';
};
events.onError = function (e) {
    try {
        var err = JSON.stringify(e);
        if (err === '{}') {
            err = e.message;
        }
        e = err;
    }
    catch (err) { }
    log('Error = ' + e);
    document.getElementById('error').innerText = e;
    document.getElementById('error-container').style.display = 'block';
};
events.onWarning = function (e) {
    log('Warning = ' + e.data.message);
    document.getElementById('warning').innerText = e.data.message;
    document.getElementById('warning-container').style.display = 'block';
};
events.onMetaData = function (e) {
    var metadata = JSON.stringify(e.data, undefined, 4);
    document.getElementById('metadata').textContent = metadata;
    document.getElementById('metadata-container').style.display = 'block';
    document.getElementById('metadata').style.display = 'block';
    clearTimeout(metaDataTimeout);
    metaDataTimeout = setTimeout(function () {
        document.getElementById('metadata-container').style.display = 'none';
        document.getElementById('metadata').style.display = 'none';
        if (document.getElementById('timestamp-container')) {
            document.getElementById('timestamp-container').style.display = 'none';
            document.getElementById('timestamp').style.display = 'none';
        }
    }, 10000);
    log(e, true);
    if (e.data.message.st && document.getElementById('timestamp-container')) {
        document.getElementById('timestamp').textContent = e.data.message.st;
        document.getElementById('timestamp-container').style.display = 'block';
        document.getElementById('timestamp').style.display = 'block';
    }
    //log(e, true);
};
events.onStats = function (e) {
    var stats = e.data.stats;
    document.getElementById('currentTime').textContent = stats.currentTime.toFixed(1);
    document.getElementById('playTimeStart').textContent = stats.playout.start.toFixed(1);
    document.getElementById('playTimeEnd').textContent = stats.playout.end.toFixed(1);
    document.getElementById('bufferTimeStart').textContent = stats.buffer.start.toFixed(2);
    document.getElementById('bufferTimeEnd').textContent = stats.buffer.end.toFixed(2);
    document.getElementById('bufferTimeDelay').textContent = stats.buffer.delay.avg.toFixed(2);
    document.getElementById('bufferTimeDelayMin').textContent = stats.buffer.delay.min.toFixed(2);
    document.getElementById('bufferTimeDelayMax').textContent = stats.buffer.delay.max.toFixed(2);
    if (document.getElementById('bufferTimeDelayDeviation')) document.getElementById('bufferTimeDelayDeviation').textContent = stats.buffer.delay.deviation.toFixed(2);
    if (stats.bitrate) {
        document.getElementById('bitrateAvg').textContent = (stats.bitrate.avg / 1000).toFixed(0) + ' kbps';
        document.getElementById('bitrateMin').textContent = (stats.bitrate.min / 1000).toFixed(0) + ' kbps';
        document.getElementById('bitrateMax').textContent = (stats.bitrate.max / 1000).toFixed(0) + ' kbps';
        if (document.getElementById('bitrateDeviation')) document.getElementById('bitrateDeviation').textContent = (stats.bitrate.deviation / 1000).toFixed(0) + ' kbps';
    }
    if (stats.framerate) {
        document.getElementById('framerateCurrent').textContent = stats.framerate.current + ' fps';
        document.getElementById('framerateAvg').textContent = (stats.framerate.avg).toFixed(1) + ' fps';
        document.getElementById('framerateMin').textContent = stats.framerate.min + ' fps';
        document.getElementById('framerateMax').textContent = stats.framerate.max + ' fps';
        if (document.getElementById('framerateDeviation')) document.getElementById('framerateDeviation').textContent = stats.framerate.deviation.toFixed(2) + ' fps';
    }
    if (stats.adaptive && (stats.adaptive.deviationOfMean || stats.adaptive.deviationOfMean2) && document.getElementById('adaptiveBufferTimeDelayDeviation')) {
        document.getElementById('adaptiveBufferTimeDelayDeviation').textContent = stats.adaptive.deviationOfMean ? stats.adaptive.deviationOfMean.buffer.delay.deviation.toFixed(2) : stats.adaptive.deviationOfMean2.buffer.delay.deviation.toFixed(2);
    }
};
events.onMute = function () {
    log('onMute');
};
events.onUnmute = function () {
    log('onUnmute');
};
events.onVolumeChange = function (e) {
    log('onVolumeChange ' + e.data.volume * 100);
};
events.onStreamInfo = function (e) {
    var streamInfo = JSON.stringify(e.data.streamInfo);
    log('onStreamInfo: ' + streamInfo);
};
events.onStreamInfoUpdate = function (e) {
    var streamInfo = JSON.stringify(e.data.streamInfo);
    log('onStreamInfoUpdate: ' + streamInfo);
};
events.onDestroy = function () {
    log('destroy');
    document.getElementById('status').innerText = 'destroy';
};
events.onUpdateSourceInit = function (e) {
    var data = JSON.stringify(e.data);
    log('onUpdateSourceInit: ' + data);
    var updateSourceInit = document.getElementById('updateSourceInit');
    if (updateSourceInit !== null) {
        updateSourceInit.textContent = parseInt(updateSourceInit.textContent, 10) + 1;
    }
};
events.onUpdateSourceSuccess = function (e) {
    var data = JSON.stringify(e.data);
    log('onUpdateSourceSuccess: ' + data);
    var updateSourceSuccess = document.getElementById('updateSourceSuccess');
    if (updateSourceSuccess !== null) {
        updateSourceSuccess.textContent = parseInt(updateSourceSuccess.textContent, 10) + 1;
        updateSourceCompleted.textContent = parseInt(updateSourceCompleted.textContent, 10) + 1;
    }
};
events.onUpdateSourceFail = function (e) {
    var data = JSON.stringify(e.data);
    log('onUpdateSourceFail: ' + data);
    var updateSourceFail = document.getElementById('updateSourceFail');
    if (updateSourceFail !== null) {
        updateSourceFail.textContent = parseInt(updateSourceFail.textContent, 10) + 1;
        updateSourceCompleted.textContent = parseInt(updateSourceCompleted.textContent, 10) + 1;
    }
};
events.onUpdateSourceAbort = function (e) {
    var data = JSON.stringify(e.data);
    log('onUpdateSourceAbort: ' + data);
    var updateSourceAbortEqual = document.getElementById('updateSourceAbortEqual');
    var updateSourceAbortFrequency = document.getElementById('updateSourceAbortFrequency');
    var updateSourceAbortSuperseded = document.getElementById('updateSourceAbortSuperseded');
    if (updateSourceAbortEqual !== null && e.data.reason === 'equalsource') {
        updateSourceAbortEqual.textContent = parseInt(updateSourceAbortEqual.textContent, 10) + 1;
        updateSourceCompleted.textContent = parseInt(updateSourceCompleted.textContent, 10) + 1;
    }
    if (updateSourceAbortFrequency !== null && e.data.reason === 'updatefrequency') {
        updateSourceAbortFrequency.textContent = parseInt(updateSourceAbortFrequency.textContent, 10) + 1;
        updateSourceCompleted.textContent = parseInt(updateSourceCompleted.textContent, 10) + 1;
    }
    if (updateSourceAbortSuperseded !== null && e.data.reason === 'superseded') {
        updateSourceAbortSuperseded.textContent = parseInt(updateSourceAbortSuperseded.textContent, 10) + 1;
        updateSourceCompleted.textContent = parseInt(updateSourceCompleted.textContent, 10) + 1;
    }
};
events.onSwitchStreamInit = function (e) {
    var data = JSON.stringify(e.data);
    log('onSwitchStreamInit: ' + data);
};
events.onSwitchStreamSuccess = function (e) {
    var data = JSON.stringify(e.data);
    log('onSwitchStreamSuccess: ' + data);
};
events.onSwitchStreamFail = function (e) {
    var data = JSON.stringify(e.data);
    log('onSwitchStreamFail: ' + data);
};
events.onSwitchStreamAbort = function (e) {
    var data = JSON.stringify(e.data);
    log('onSwitchStreamAbort: ' + data);
};
events.onFullscreenChange = function (e) {
    ___isFullscreen___ = e.data.entered;
    var selects = document.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
        var item = selects[i];
        if (item && item.style) {
            item.style.visibility = ___isFullscreen___ ? 'hidden' : 'visible';
        }
    }
    var data = JSON.stringify(e.data);
    log('onFullscreenChange: ' + data);
};
events.onFullscreenError = function (e) {
    ___isFullscreen___ = false;
    var data = JSON.stringify(e.data);
    log('onFullscreenError: ' + data);
};
events.onServerInfo = function (e) {
    var serverInfo = JSON.stringify(e.data.serverInfo);
    log('onServerInfo: ' + serverInfo);
};

['change', 'blur', 'input', 'focus', 'keyup'].forEach(function () {
    // ['inputUrl', 'inputStreamname'].forEach(function (input) {
    //     document.getElementById(input).addEventListener(event, function (e) {
    //         if (config && config.source && config.source.h5live && e.currentTarget.value.length > 0) {
    //             config.source.h5live.rtmp = config.source.h5live.rtmp || {};
    //             config.source.h5live.rtmp[e.currentTarget.dataset.prop] = e.currentTarget.value;
    //         }
    //     });
    // });
    // document.getElementById('inputServer').addEventListener(event, function (e) {
    //     if (config && config.source && config.source.h5live && e.currentTarget.value.length > 0) {
    //         checkH5Live(e.currentTarget.value);
    //     }
    // });
});


