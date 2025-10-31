/* eslint-disable no-console */
/* global NanoPlayer, getPlayerLocation */

let player;
let isPlaying = false;
let isMuted = false;
let statsData = {
    'buffer': { 'start' : 0,
        'end'   : 0,
        'cur'   : 0,
        'avg'   : 0,
        'min'   : 0,
        'max'   : 0,
        'dev'   : 0 },
    'bitrate': { 'cur' : 0,
        'avg' : 0,
        'min' : 0,
        'max' : 0,
        'dev' : 0 },
    'framerate': { 'cur' : 0,
        'avg' : 0,
        'min' : 0,
        'max' : 0,
        'dev' : 0 },
    'playTime': { 'start' : 0,
        'end'   : 0 },
    'preroll'     : 0,
    'metadata'    : '',
    'deviation'   : 0,
    'currentTime' : 0
};
let buffering = {
    'start'   : 0,
    'stop'    : 0,
    'timeout' : 0,
    'status'  : false
};

let currentStreamQuality = '';
let currentStreamQualityShort = '';
let currentStreamQualityLong = '';
let ongoingSwitches = 0;
let orphanedStateCleanupTimer = null;
let targetSwitchQuality = null; // Track what we're switching to

function logEvent (eventName, eventData) {
    const timestamp = new Date().toLocaleTimeString('en-US', {
        'hour12'                 : false,
        'hour'                   : '2-digit',
        'minute'                 : '2-digit',
        'second'                 : '2-digit',
        'fractionalSecondDigits' : 3
    });
    
    console.log(timestamp, ' *** ' + eventName + ': ', eventData);
}

function updateStreamQuality (index, option, info, label, streamname) {
    // Use entry label if available, otherwise create descriptive name
    if (option.label.length > 0) {
        label = option.label;
    }
    let resolution = '';
    if (label) {
        currentStreamQuality = label;
    }
    else if (info && info.width && info.height) {
        resolution = `${info.width}x${info.height}`;
        // Generate quality name based on resolution
        if (info.height >= 720) {
            currentStreamQuality = 'HD';
        }
        else if (info.height >= 480) {
            currentStreamQuality = 'SD';
        }
        else if (info.height >= 0) {
            currentStreamQuality = 'Low';
        }
        else {
            currentStreamQuality = 'Auto';
        }
    }
    else {
        currentStreamQuality = `Quality Index ${index}`;
        if (index === 0) {
            currentStreamQuality = 'High';
        }
    }

    // Add resolution info in parentheses
    if (info && info.width && info.height) {
        resolution = `${info.width}x${info.height}`;
        currentStreamQuality += ` (${resolution})`;
    }

    // Configure the dropdown option
    option.textContent = currentStreamQuality;
    option.value = streamname;

    return currentStreamQuality;
}

function updateStreamQualities (config) {
    const entries = config.source.entries;

    // Populate qualities dropdown with bitrate and resolution info
    if (!abrQuality) {
        console.error('ABR Quality select element not found');
        return;
    }
    // Populate dropdown with quality options
    if (entries) {
        abrQuality.innerHTML = '';


        if (entries.length > 1) {
            const option = document.createElement('option');
            option.textContent = 'Auto';
            option.value = 'auto';
            option.selected = true;
            abrQuality.appendChild(option);
        }
        const qualities = getQualities(entries);
        entries.forEach((entry, index) => {
            const option = document.createElement('option');

            let i = entry.index !== undefined ? entry.index : index;

            updateStreamQuality(i, option, entry.info, qualities[i], entry.h5live.rtmp.streamname);

            abrQuality.appendChild(option);
        });

        if (entries.length > 1 && config.source.options.adaption.rule === 'none') {
            abrQuality.value = entries[config.source.startIndex || 0].h5live.rtmp.streamname;
        }

        console.log(`Populated qualities dropdown with ${entries.length} entries`);
    }
    else {
        console.warn('No entries found in data.config.source.entries');
    }
}

function getQualities (entries) {
    const numQualities = Math.min(entries.length, 5);
    const qualities = [];

    // Special case: single entry
    if (numQualities === 1) {
        qualities.push('Single');
        return qualities;
    }

    for (let i = 0; i < numQualities; i++) {
        const ratio = i / (numQualities - 1);
        if (ratio < 0.2) {
            qualities.push('High');
        }
        else if (ratio < 0.4) {
            qualities.push('Medium-High');
        }
        else if (ratio < 0.6) {
            qualities.push('Medium');
        }
        else if (ratio < 0.8) {
            qualities.push('Medium-Low');
        }
        else {
            qualities.push('Low');
        }
    }

    return qualities;
}

function getOptionByValue (selectElement, value) {
    return selectElement.querySelector(`option[value="${value}"]`);
}

function showQualitySwitching (switching = true) {
    if (switching) {
        ongoingSwitches++;
        const selectedOption = abrQuality.options[abrQuality.selectedIndex];
        if (selectedOption && !selectedOption.textContent.includes(' - Switching...')) {
            selectedOption.textContent += ' - Switching...';
        }
    }
    else {
        ongoingSwitches = Math.max(0, ongoingSwitches - 1);
        // Only restore when all switches are complete
        if (ongoingSwitches === 0) {
            // Find all options with switching indicator and remove it
            for (let i = 0; i < abrQuality.options.length; i++) {
                const option = abrQuality.options[i];
                if (option.textContent.includes(' - Switching...')) {
                    option.textContent = option.textContent.replace(' - Switching...', '');
                }
            }
        }
    }
}

// Called by onStreamInfo - new stream is playing
// Get video/audio info and fill UI
function updateStreamInfo (streamInfo) {
    let index = 0;
    let streamname = '',
        videoInfoString;

    if (streamInfo) {
        // Use streamInfo to get current stream details
        streamname = streamInfo.rtmp.streamname;
        index = getCurrentQualityIndex(streamname);
        
        if (streamInfo.haveAudio) {
            if (streamInfo.audioInfo) {
                console.log('AudioInfo', streamInfo.audioInfo);
            }
        }
        if (streamInfo.haveVideo) {
            const vi = streamInfo.videoInfo;
            if (vi) {
                console.log('VideoInfo', vi);
                videoInfoString = `${vi.width}x${vi.height}`;
                updateStatusField('videoinfo-value', videoInfoString);
            }
        }

        statsData.preroll = streamInfo.prerollDuration;

        console.log('StreamInfo index, streamname', index, streamname);

        const selectedQuality = getOptionByValue(abrQuality, streamname);
        const autoOption = getOptionByValue(abrQuality, 'auto');
        
        if (selectedQuality) {
            currentStreamQualityShort = selectedQuality.textContent.split(' ')[0] + ' (' + videoInfoString + ')';
            selectedQuality.textContent = currentStreamQualityShort;
            currentStreamQualityLong = selectedQuality.textContent.split(' ')[0] + ' - ' + videoInfoString + ' - ' + selectedQuality.value;
            updateStatus('', currentStreamQualityLong);
        }
        
        if (autoOption) {
            autoOption.textContent = 'Auto (' + videoInfoString + ')';
        }
    }
}

function getCurrentQualityIndex (streamname) {
    if (!config.source.entries) return 0;
    const index = config.source.entries.findIndex((entry) =>
        entry.h5live && entry.h5live.rtmp && entry.h5live.rtmp.streamname === streamname);
    return index >= 0 ? index : 0;
}

// Default player configuration
let config = {
    'source': {
        'defaults': {
            'service': 'bintu'
        },
        'options': {
            'adaption': {
                'rule'     : 'deviationOfMean2',
                'downStep' : 1,
            },
            'switch': {
                'method'       : 'server',
                'pauseOnError' : false,
                'forcePlay'    : true,
                'fastStart'    : false,
                'timeout'      : 20
            }
        },
        'startIndex': 0
    },
    'playback': {
        'autoplay'                  : true,
        'automute'                  : true,
        'muted'                     : false,
        'volume'                    : 1.0,
        'latencyControlMode'        : 'balancedadaptive',
        'enableMediaOverQuic'       : true,
        'enableQuicConnectionProbe' : true
    },
    'style': {
        'controls'             : true,
        'width'                : 'auto',
        'height'               : 'auto',
        'scaling'              : 'letterbox',
        'displayMutedAutoplay' : false
    },
    'metrics': {
        'accountId'     : 'nanocosmos3',
        'accountKey'    : 'nc3tb9eq0bnjburu',
        'userId'        : 'demo1',
        'eventId'       : 'release',
        'statsInterval' : 10,
        'customField1'  : 'release test',
        'customField2'  : 'stage',
        'customField3'  : 'internal'
    },
    'events': {
        'onReady': function (e) {
            logEvent(e.name, e.data);
            updateStatus('Player ready');
            updateStatusField('status-value', 'ready');
            updateStreamQualities(e.data.config);
        },
        'onPlay': function (e) {
            logEvent(e.name, e.data);
            updateStatus('Playing ', currentStreamQualityLong);
            updateStatusField('status-value', 'playing');
            hideStatusElement('error-container');
            hideStatusElement('metadata-container');
            hasSetupError = false;
            checkActualConnection(); // Check actual connection when playback starts
        },
        'onPause': function (e) {
            logEvent(e.name, e.data);
            updateStatus('Paused');
            updateStatusField('status-value', 'paused' + (e.data.reason !== 'normal' ? ' (' + e.data.reason + ')' : ''));
            isPlaying = false;
            updateButtons();
            updateNeutralMOQDisplay();
            cleanupOrphanedStates(); // Clean up orphaned switching states when paused
        },
        'onLoading': function (e) {
            logEvent(e.name, e.data);
            updateStatus('Loading stream...');
            updateStatusField('status-value', 'loading');
            isPlaying = true;
            hasSetupError = false;
            updateButtons();
            hideStatusElement('error-container');
            hideStatusElement('metadata-container');
        },
        'onStartBuffering': function (e) {
            logEvent(e.name, e.data);
            clearTimeout(buffering.timeout);
            buffering.start = new Date();
            buffering.timeout = setTimeout(function () {
                if (buffering.start) {
                    buffering.status = true;
                    updateStatus('Buffering...');
                    updateStatusField('status-value', 'buffering');
                }
            }, 1000);
        },
        'onStopBuffering': function (e) {
            logEvent(e.name, e.data);
            clearTimeout(buffering.timeout);
            buffering.stop = new Date();
            if (buffering.start) {
                var duration = Math.abs(buffering.stop - buffering.start);
                if (duration > 1000) {
                    console.log('Buffering ' + duration + 'ms');
                }
                buffering.stop = buffering.start = 0;
            }
            if (buffering.status) {
                buffering.status = false;
                updateStatus('Playing ', currentStreamQualityLong);
                updateStatusField('status-value', 'playing');
            }
        },
        'onError': function (e) {
            logEvent(e.name, e.data);
            updateStatus('Error: ' + e.data.message);
            showStatusElement('error-container');
            updateStatusField('error-value', e.data.code + ': ' + e.data.message || 'Unknown error');
            updateStatusField('status-value', e.data.code + ': ' + e.data.message || 'Unknown error');
            cleanupOrphanedStates(); // Clean up orphaned switching states on error
            if (e.data.code > 5000) {
                hasSetupError = true;
                updateNeutralMOQDisplay();
            }
        },
        'onWarning': function (e) {
            logEvent(e.name, e.data);
            showStatusElement('warning-container');
            setTimeout(() => {
                hideStatusElement('warning-container');
            }, 5000);
            updateStatusField('warning-value', e.data.message || 'Unknown warning');
        },
        'onMute': function (e) {
            logEvent(e.name, e.data);
            isMuted = true;
            const muteBtn = document.getElementById('mute-btn');
            if (muteBtn) muteBtn.innerHTML = '<span class="material-icons">volume_off</span>';
        },
        'onUnmute': function (e) {
            logEvent(e.name, e.data);
            isMuted = false;
            const muteBtn = document.getElementById('mute-btn');
            if (muteBtn) muteBtn.innerHTML = '<span class="material-icons">volume_up</span>';
        },
        'onVolumeChange': function (e) {
            logEvent(e.name, e.data);
            const volume = Math.round(e.data.volume * 100);
            updateStatusField('volume-value', volume);
            const volumeSlider = document.getElementById('volume-slider');
            volumeSlider.value = volume;
            const volumeValue = document.getElementById('volume-value');
            volumeValue.textContent = volume + '%';
        },
        'onMetaData': function (e) {
            logEvent(e.name, e.data);
            if (e.data) {
                showStatusElement('metadata-container');
                updateStatusField('meta-value', JSON.stringify(e.data, null, 4));
            }
        },
        'onStats': function (e) {
            if (e.data && e.data.stats) {
                const stats = e.data.stats;
                
                // Update latency
                if (stats.buffer) {
                    statsData.buffer = {
                        'start' : stats.buffer.start || 0,
                        'end'   : stats.buffer.end || 0,
                        'cur'   : stats.buffer.delay.current || 0,
                        'avg'   : stats.buffer.delay.avg || 0,
                        'min'   : stats.buffer.delay.min || 0,
                        'max'   : stats.buffer.delay.max || 0,
                        'dev'   : stats.buffer.delay.deviation || 0
                    };

                    updateStatusField('latency-value',
                        `${statsData.buffer.avg.toFixed(1)} / ${statsData.buffer.min.toFixed(1)} / ${statsData.buffer.max.toFixed(1)} / ${statsData.buffer.dev.toFixed(2)}`);
                }
                
                // Update bitrate
                if (stats.bitrate) {
                    statsData.bitrate = {
                        'avg' : stats.bitrate.avg || 0,
                        'min' : stats.bitrate.min || 0,
                        'max' : stats.bitrate.max || 0,
                        'dev' : stats.bitrate.deviation || 0
                    };
                    updateStatusField('bitrate-value',
                        `${Math.round(statsData.bitrate.avg / 1000).toFixed(0)} / ${Math.round(statsData.bitrate.min / 1000).toFixed(0)} / ${Math.round(statsData.bitrate.max / 1000).toFixed(0)} / ${Math.round(statsData.bitrate.dev / 1000).toFixed(0)} `);
                }
                
                // Update framerate
                if (stats.framerate) {
                    statsData.framerate = {
                        'cur' : stats.framerate.current || 0,
                        'avg' : stats.framerate.avg || 0,
                        'min' : stats.framerate.min || 0,
                        'max' : stats.framerate.max || 0,
                        'dev' : stats.framerate.deviation || 0
                    };
                    updateStatusField('framerate-value',
                        `${statsData.framerate.cur.toFixed(0)} / ${statsData.framerate.avg.toFixed(0)} / ${statsData.framerate.min.toFixed(0)} / ${statsData.framerate.max.toFixed(0)} / ${statsData.framerate.dev.toFixed(2)}`);
                }
                
                // Update current time
                if (stats.currentTime !== undefined) {
                    statsData.currentTime = stats.currentTime;
                    updateStatusField('time-value',
                        `${formatTimeString(statsData.currentTime)}`);
                }
            }
        },
        'onStreamInfo': function (e) {
            let streamInfo = e.data.streamInfo;
            logEvent(e.name, e.data);
            updateStreamInfo(streamInfo);
        },
        'onStreamInfoUpdate': function (e) {
            let streamInfo = e.data.streamInfo;
            logEvent(e.name, e.data);
            updateStreamInfo(streamInfo);
        },
        'onDestroy': function (e) {
            logEvent(e.name, e.data);
            updateStatusField('status-value', 'destroyed');
            cleanupOrphanedStates(); // Clean up orphaned switching states when destroyed
            stopOrphanedStateCleanup(); // Stop cleanup timer when player is destroyed
        },
        'onUpdateSourceInit': function (e) {
            logEvent(e.name, e.data);
            updateStatusField('status-value', 'source update init');
        },
        'onUpdateSourceSuccess': function (e) {
            logEvent(e.name, e.data);
            updateStatusField('status-value', 'source update succeed');
        },
        'onUpdateSourceFail': function (e) {
            logEvent(e.name, e.data);
            updateStatusField('error-value', 'source update failed');
            updateStatusField('status-value', 'source update failed');
        },
        'onUpdateSourceAbort': function (e) {
            logEvent(e.name, e.data);
            updateStatusField('error-value', 'source update aborted');
            updateStatusField('status-value', 'source update aborted');
        },
        'onSwitchStreamInit': function (e) {
            logEvent(e.name, e.data);
            updateStatusField('status-value', 'switch init');
            showQualitySwitching(true);
            
            // Store target switch info from event data
            if (e.data) {
                const streamname = e.data.entry && e.data.entry.h5live && e.data.entry.h5live.rtmp && e.data.entry.h5live.rtmp.streamname;
                targetSwitchQuality = {
                    'streamname' : streamname,
                    'tag'        : e.data.tag,
                    'index'      : e.data.index,
                    'entry'      : e.data.entry
                };
            }
        },
        'onSwitchStreamSuccess': function (e) {
            logEvent(e.name, e.data);
            updateStatusField('status-value', 'switch succeed');
            showQualitySwitching(false);
            
            // If paused, update status2 with actual switched quality info
            if (!isPlaying && targetSwitchQuality && targetSwitchQuality.streamname) {
                const abrQuality = document.getElementById('abr-quality');
                if (abrQuality) {
                    // Find option that matches the actual switched streamname
                    let matchingOption = null;
                    for (let i = 0; i < abrQuality.options.length; i++) {
                        if (abrQuality.options[i].value === targetSwitchQuality.streamname) {
                            matchingOption = abrQuality.options[i];
                            break;
                        }
                    }
                    
                    if (matchingOption) {
                        const qualityText = matchingOption.textContent;
                        const quality = qualityText.split(' ')[0];
                        const match = qualityText.match(/\((.*?)\)/);
                        const resolution = match ? match[1] : null;
                        const qualityLong = resolution
                            ? quality + ' - ' + resolution + ' - ' + targetSwitchQuality.streamname
                            : quality + ' - ' + targetSwitchQuality.streamname;
                        updateStatus('', qualityLong);
                        
                        // Update Auto option with current resolution if Auto is selected
                        if (abrQuality.value === 'auto') {
                            const autoOption = abrQuality.querySelector('option[value="auto"]');
                            if (autoOption) {
                                autoOption.textContent = resolution ? 'Auto (' + resolution + ')' : 'Auto';
                            }
                        }
                    }
                }
                
                // Clear the target after use
                targetSwitchQuality = null;
            }
        },
        'onSwitchStreamFail': function (e) {
            logEvent(e.name, e.data);
            updateStatusField('error-value', 'switch failed');
            updateStatusField('status-value', 'switch failed');
            showQualitySwitching(false);
            if (abrQuality.selectedIndex !== 0) {
                // Revert dropdown to current quality on switch failure
                var arr = currentStreamQualityLong.split(' - ');
                abrQuality.value = arr[arr.length - 1];
            }
        },
        'onSwitchStreamAbort': function (e) {
            logEvent(e.name, e.data);
            updateStatusField('error-value', 'switch aborted');
            updateStatusField('status-value', 'switch aborted');
            showQualitySwitching(false);
            if (abrQuality.selectedIndex !== 0) {
            // Revert dropdown to current quality on switch abort
                var arr = currentStreamQualityLong.split(' - ');
                abrQuality.value = arr[arr.length - 1];
            }
        },
        'onActiveVideoElementChange': function (e) {
            logEvent(e.name, e.data);
            checkActualConnection(); // Check actual connection when video element changes
        },
        'onServerInfo': function (e) {
            logEvent(e.name, e.data);
        },
        'onFullscreenChange': function (e) {
            logEvent(e.name, e.data);
        }
    }
};

function updateLatencyModeDropdown () {
    const latencyModeSelect = document.getElementById('latency-mode');
    const currentMode = config.playback.latencyControlMode;
    
    if (latencyModeSelect && currentMode) {
        latencyModeSelect.value = currentMode;
    }
}

function resetMuteButton () {
    isMuted = false;
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
        muteBtn.innerHTML = '<span class="material-icons">volume_up</span>';
    }
}

// Initialize player
function initializePlayer () { // eslint-disable-line no-unused-vars
    try {
        player = new NanoPlayer('nanoplayer-div');
        document.getElementById('version').textContent = 'nanoPlayer v' + player.version;
        config = mergeDeep(deepCopy(config), parseConfigFromQuery(window.location.search).config);
        
        // Update latency mode dropdown to reflect current config
        updateLatencyModeDropdown();
        
        // Reset mute button to default state
        resetMuteButton();
        
        createCodeSnippet(config);
        updateMoQIndicator(); // Update MoQ indicator after config is set
        startOrphanedStateCleanup(); // Start cleanup timer for orphaned states
        player.setup(config).then(function (config) {
            console.log('Setup success');
            console.log('Config: ' + JSON.stringify(config, undefined, 4));
        }, function (error) {
            console.log('Setup error: ' + error.code + ' - ' + error.message);
            updateStatus('Setup error: ' + error.code + ' - ' + error.message);
        });
    }
    catch (error) {
        console.log('Error creating player: ' + error.code + ' - ' + error.message);
        updateStatus('Error creating player: ' + error.code + ' - ' + error.message);
        updateStatusField('error-value', 'Error creating player: ' + error.code + ' - ' + error.message);
    }
}

// Control functions
function playStream () {
    if (player) {
        player.play();
    }
}

function pauseStream () {
    if (player) {
        player.pause();
    }
}

function muteStream () {
    if (player) {
        if (isMuted) {
            player.unmute();
        }
        else {
            player.mute();
        }
    }
}

function setVolume (volume) {
    if (player) {
        player.setVolume(volume / 100);
    }
}

function fullscreenStream () {
    if (player) {
        player.requestFullscreen();
    }
}

// UI helper functions
function updateStatus (message, message2 = '') {
    if (message.length > 0) {
        document.getElementById('status').textContent = message;
    }
    if (message2.length > 0) {
        document.getElementById('status2').textContent = message2;
    }
}

// Status field queue system - maintains a queue of status values with persistence
const statusFieldQueues = {};

// Constants
const DIRECT_UPDATE_FIELDS = new Set(['meta-value', 'warning-value', 'error-value', 'time-value', 'latency-value', 'bitrate-value', 'framerate-value', 'videoinfo-value']);
const REAL_STATES = new Set(['ready', 'loading', 'playing', 'paused', 'buffering', 'destroyed']);
const TIMER_DELAY = 3000;

// Helper functions
const getBaseState = (value) => String(value || '').toLowerCase().split(/[\s(]/)[0];
const isRealState = (value) => REAL_STATES.has(getBaseState(value));
const clearItemTimer = (item, timers) => {
    if (!item.timer) return;
    clearTimeout(item.timer);
    const idx = timers.indexOf(item.timer);
    if (idx > -1) timers.splice(idx, 1);
    item.timer = null;
};

const createContainer = function (isValue) {
    const container = document.createElement('div');
    const baseStyles = {
        'display'       : 'flex',
        'flexDirection' : 'row',
        'alignItems'    : 'center',
        'gap'           : isValue ? '4px' : '8px',
        'overflow'      : 'hidden',
        'width'         : '100%',
        'minHeight'     : '1.2em',
        'maxHeight'     : '1.2em',
        'flexShrink'    : '0',
        'flexGrow'      : '0'
    };
    
    if (isValue) {
        baseStyles.whiteSpace = 'nowrap';
    }
    else {
        baseStyles.height = '100%';
    }
    
    Object.assign(container.style, baseStyles);
    return container;
};

function updateStatusField (elementId, value) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Direct update for rapid-change fields
    if (DIRECT_UPDATE_FIELDS.has(elementId)) {
        element.textContent = value;
        return;
    }
    
    // Initialize queue data
    let queueData = statusFieldQueues[elementId];
    if (!queueData) {
        const isValue = element.classList.contains('value');
        const container = createContainer(isValue);
        element.innerHTML = '';
        element.appendChild(container);
        
        queueData = statusFieldQueues[elementId] = {
            'queue'     : [],
            'timers'    : [],
            'container' : container
        };
    }
    
    const now = Date.now();
    const itemIsReal = isRealState(value);
    const baseState = getBaseState(value);
    const valueStr = String(value || '').toLowerCase();
    
    // Start timers for existing real states when new item arrives
    const startTimersForRealStates = (isNewItemReal) => {
        for (let i = queueData.queue.length - 1; i >= 0; i--) {
            const item = queueData.queue[i];
            if (item.isRealState && !item.timer) {
                const timer = setTimeout(() => {
                    if (queueData.queue.indexOf(item) === -1) return;
                    const realCount = queueData.queue.filter((q) => q.isRealState).length;
                    if (realCount > 1) removeStatusValue(elementId, item);
                    else clearItemTimer(item, queueData.timers);
                }, TIMER_DELAY);
                
                item.timer = timer;
                queueData.timers.push(timer);
                if (!isNewItemReal) break; // Only handle most recent for non-real states
            }
        }
    };
    startTimersForRealStates(itemIsReal);
    
    // Create new item
    const newItem = {
        'value'       : value,
        'timestamp'   : now,
        'element'     : null,
        'isRealState' : itemIsReal
    };
    
    // Handle duplicate prevention - prevent any duplicate real states
    let duplicateFound = false;
    
    if (itemIsReal) {
        // Check if last item is the same (prevent sibling duplicates only)
        const lastItem = queueData.queue[queueData.queue.length - 1];
        const isLastItemSameState = lastItem && lastItem.isRealState && getBaseState(lastItem.value) === baseState;
        
        if (isLastItemSameState) {
            // Prevent sibling duplicate - just refresh timer on last item
            clearItemTimer(lastItem, queueData.timers);
            
            const timer = setTimeout(function () {
                const currentIndex = queueData.queue.indexOf(lastItem);
                if (currentIndex === -1) return; // Already removed
                
                const realStateCount = queueData.queue.filter(function (item) {
                    return item.isRealState;
                }).length;
                const canRemove = realStateCount > 1;
                
                if (canRemove) {
                    removeStatusValue(elementId, lastItem);
                }
                else {
                    clearItemTimer(lastItem, queueData.timers);
                }
            }, TIMER_DELAY);
            
            lastItem.timer = timer;
            queueData.timers.push(timer);
            lastItem.timestamp = now; // Update timestamp
            
            return; // Exit early - don't add new item
        }
        
        // Check if same state exists anywhere (non-sibling) - immediately remove old instance
        const existingMatchIndex = queueData.queue.findIndex((item) =>
            item.isRealState && getBaseState(item.value) === baseState
        );
        
        if (existingMatchIndex !== -1) {
            // Remove old instance immediately (don't wait for timer)
            const existingItem = queueData.queue[existingMatchIndex];
            clearItemTimer(existingItem, queueData.timers);
            removeStatusValue(elementId, existingItem);
        }
        
        // Add the new real state (check MAX 3 limit first)
        if (!duplicateFound || queueData.queue.filter(function (item) {
            return item.isRealState;
        }).length === 0) {
            // Before adding, ensure we don't exceed MAX 3
            let needsDelayedAdd = false;
            if (queueData.queue.length >= 3) {
                // For real states: Keep NRS, drop oldest real state (ease out → ease in)
                const realStates = queueData.queue.filter(function (item) {
                    return item.isRealState;
                });
                if (realStates.length >= 2) {
                    // Remove oldest real state to make room for new one
                    removeStatusValue(elementId, realStates[0]);
                    needsDelayedAdd = true; // Wait for ease-out to complete
                }
            }
            
            const addNewRealState = function () {
                // Find the last real state and insert after it (REAL FIRST rule)
                let insertIndex = queueData.queue.length;
                for (let i = queueData.queue.length - 1; i >= 0; i--) {
                    if (queueData.queue[i].isRealState) {
                        insertIndex = i + 1;
                        break;
                    }
                }
                queueData.queue.splice(insertIndex, 0, newItem);
                
                // Render the new value
                renderStatusValue(elementId, newItem);
                
                // New states are "last man standing" - no timer
            };
            
            if (needsDelayedAdd) {
                // Wait for ease-out transition (300ms) before ease-in
                setTimeout(addNewRealState, 300);
                // Skip normal rendering since we'll do it delayed
                return;
            }
            else {
                // Add immediately but still skip normal rendering at end
                addNewRealState();
                return;
            }
        }
    }
    else {
        // For non-real states: Only allow ONE non-real state at a time (OVERRIDE)
        // Check if there's already a non-real state to reuse its element
        let existingNonRealItem = null;
        for (let i = queueData.queue.length - 1; i >= 0; i--) {
            const item = queueData.queue[i];
            if (!item.isRealState) {
                existingNonRealItem = item;
                break;
            }
        }
        
        if (existingNonRealItem) {
            console.log('Non-real state override: reusing element - old text fade out → new text fade in');
            
            // Clean up timer
            if (existingNonRealItem.timer) {
                clearTimeout(existingNonRealItem.timer);
                const timerIndex = queueData.timers.indexOf(existingNonRealItem.timer);
                if (timerIndex > -1) {
                    queueData.timers.splice(timerIndex, 1);
                }
            }
            
            // Update queue item with new value but reuse the DOM element
            existingNonRealItem.value = value;
            existingNonRealItem.timestamp = now;
            
            // Fade out old text, then fade in new text
            if (existingNonRealItem.element) {
                existingNonRealItem.element.style.transition = 'opacity 0.3s ease-out';
                existingNonRealItem.element.style.opacity = '0';
                
                setTimeout(() => {
                    // Update text content
                    existingNonRealItem.element.textContent = value;
                    
                    // Fade in new text
                    existingNonRealItem.element.style.transition = 'opacity 0.3s ease-in';
                    existingNonRealItem.element.style.opacity = '1';
                }, 300);
            }
            
            // Add 3-second timer for non-real states (except "switch init")
            if (!valueStr.includes('switch init')) {
                const timer = setTimeout(() => {
                    // Check if this item is still in the queue
                    const currentIndex = queueData.queue.indexOf(existingNonRealItem);
                    if (currentIndex === -1) return; // Already removed
                    
                    removeStatusValue(elementId, existingNonRealItem);
                }, 3000);
                
                existingNonRealItem.timer = timer;
                queueData.timers.push(timer);
            }
            
            // Don't add newItem to queue since we're reusing existing
            return;
        }
        
        // No existing non-real state, add the new one normally
        // Before adding, ensure we don't exceed MAX 3
        if (queueData.queue.length >= 3) {
            // Remove oldest real state (but keep at least 1)
            const realStates = queueData.queue.filter((item) => item.isRealState);
            if (realStates.length > 1) {
                removeStatusValue(elementId, realStates[0]);
            }
        }
        
        // Ensure REAL FIRST rule: NRS goes after all real states
        let insertIndex = queueData.queue.length;
        for (let i = queueData.queue.length - 1; i >= 0; i--) {
            if (queueData.queue[i].isRealState) {
                insertIndex = i + 1;
                break;
            }
        }
        queueData.queue.splice(insertIndex, 0, newItem);
        
        // Render the new non-real state
        renderStatusValue(elementId, newItem);
        
        // Set timer if not "switch init"
        if (!valueStr.includes('switch init')) {
            const timer = setTimeout(function () {
                const currentIndex = queueData.queue.indexOf(newItem);
                if (currentIndex === -1) return; // Already removed
                removeStatusValue(elementId, newItem);
            }, 3000);
            
            newItem.timer = timer;
            queueData.timers.push(timer);
        }
    }
}

function renderStatusValue (elementId, item) {
    const queueData = statusFieldQueues[elementId];
    if (!queueData || !queueData.container) return;
    
    const element = document.getElementById(elementId);
    const isValueElement = element && element.classList.contains('value');
    
    // Create span for the value
    const span = document.createElement('span');
    span.textContent = item.value;
    span.style.opacity = '0';
    span.style.whiteSpace = 'nowrap';
    span.style.lineHeight = '1.2em';
    span.style.maxHeight = '1.2em';
    span.style.overflow = 'hidden';
    span.style.textOverflow = 'ellipsis';
    span.style.flexShrink = '1';
    span.style.minWidth = '0';
    
    // Special transition for real states
    if (item.isRealState) {
        span.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-out';
        span.style.transform = 'translateX(-5px)';
    }
    else {
        // Enhanced smooth ease-in transition for non-real states (particularly overrides)
        span.style.transition = 'opacity 0.3s ease-in';
    }
    
    // For grid items, add additional constraints
    if (isValueElement) {
        span.style.maxWidth = '100%';
        span.style.display = 'inline-block';
    }
    
    // Find correct DOM insertion position based on queue order
    const itemIndex = queueData.queue.indexOf(item);
    let insertBeforeElement = null;
    
    // Find the next item in queue that already has a DOM element
    for (let i = itemIndex + 1; i < queueData.queue.length; i++) {
        const nextItem = queueData.queue[i];
        if (nextItem.separator) {
            insertBeforeElement = nextItem.separator;
            break;
        }
        else if (nextItem.element) {
            insertBeforeElement = nextItem.element;
            break;
        }
    }
    
    // Add separator if not the first item (check logical queue, not DOM)
    if (queueData.queue.length > 1) {
        const separator = document.createElement('span');
        separator.textContent = '•';
        separator.style.opacity = '0';
        separator.style.transition = 'opacity 0.3s ease-in-out';
        separator.style.color = 'rgba(255, 255, 255, 0.5)';
        separator.style.flexShrink = '0';
        separator.style.lineHeight = '1.2em';
        separator.style.maxHeight = '1.2em';
        separator.style.overflow = 'hidden';
        
        if (isValueElement) {
            separator.style.margin = '0 2px';
        }
        else {
            separator.style.margin = '0 4px';
        }
        
        // Insert separator at correct position
        if (insertBeforeElement) {
            queueData.container.insertBefore(separator, insertBeforeElement);
        }
        else {
            queueData.container.appendChild(separator);
        }
        
        // Fade in separator
        setTimeout(() => {
            separator.style.opacity = '1';
        }, 10);
        
        // Store separator reference
        item.separator = separator;
    }
    
    // Add the value span at correct position
    if (insertBeforeElement) {
        queueData.container.insertBefore(span, insertBeforeElement);
    }
    else {
        queueData.container.appendChild(span);
    }
    item.element = span;
    
    // Fade in the value
    setTimeout(() => {
        span.style.opacity = '1';
        if (item.isRealState) {
            span.style.transform = 'translateX(0)';
        }
        else {
            // Smooth fade-in for non-real states - no movement
        }
    }, 10);
}

function removeStatusValue (elementId, item) {
    const queueData = statusFieldQueues[elementId];
    if (!queueData) return;
    
    const index = queueData.queue.indexOf(item);
    if (index === -1) return;
    
    // Remove from queue
    queueData.queue.splice(index, 1);
    
    // Clean up timer if it exists
    if (item.timer) {
        clearTimeout(item.timer);
        const timerIndex = queueData.timers.indexOf(item.timer);
        if (timerIndex > -1) {
            queueData.timers.splice(timerIndex, 1);
        }
    }
    
    // Fade out and remove element
    if (item.element) {
        item.element.style.opacity = '0';
        if (item.separator) {
            item.separator.style.opacity = '0';
        }
        
        setTimeout(() => {
            if (item.element && item.element.parentNode) {
                item.element.parentNode.removeChild(item.element);
            }
            if (item.separator && item.separator.parentNode) {
                item.separator.parentNode.removeChild(item.separator);
            }
            
            // Clean up orphaned separators
            if (queueData.container) {
                // Remove any separator that has become the first child (orphaned)
                while (queueData.container.firstChild && queueData.container.firstChild.textContent === '•') {
                    queueData.container.removeChild(queueData.container.firstChild);
                }
                
                // Remove any consecutive separators
                const children = Array.from(queueData.container.children);
                for (let i = 0; i < children.length - 1; i++) {
                    const current = children[i];
                    const next = children[i + 1];
                    if (current.textContent === '•' && next.textContent === '•') {
                        queueData.container.removeChild(next);
                    }
                }
            }
        }, 300);
    }
    
    // Don't clear if queue is empty - the last value should stay visible
}


function updateButtons () {
    document.getElementById('play-btn').disabled = isPlaying;
    document.getElementById('pause-btn').disabled = !isPlaying;
}


function showStatusElement (elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.opacity = '0';
        element.classList.remove('hidden');
        element.style.transition = 'opacity 0.3s ease-in-out';
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    }
}

function hideStatusElement (elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.transition = 'opacity 0.3s ease-in-out';
        element.style.opacity = '0';
        setTimeout(() => {
            element.classList.add('hidden');
        }, 300);
    }
}

function formatTimeString (timeInSeconds) {
    const totalMs = Math.floor(timeInSeconds * 1000);
    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const ms = Math.floor((totalMs % 1000) / 100); // Get 1-digit milliseconds
    
    let timeStr = '';
    
    if (hours >= 10) {
        // hh:mm:ss.ms
        timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms}`;
    }
    else if (hours >= 1) {
        // h:mm:ss.ms
        timeStr = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms}`;
    }
    else if (minutes >= 10) {
        // mm:ss.ms
        timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms}`;
    }
    else {
        // m:ss.ms
        timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}.${ms}`;
    }
    
    return timeStr;
}

// Event listeners
document.getElementById('play-btn').addEventListener('click', playStream);
document.getElementById('pause-btn').addEventListener('click', pauseStream);
document.getElementById('mute-btn').addEventListener('click', muteStream);
document.getElementById('fullscreen-btn').addEventListener('click', fullscreenStream);

// Volume slider event listener
document.getElementById('volume-slider').addEventListener('input', function (e) {
    setVolume(e.target.value);
});

// Quality dropdown change listener
const abrQuality = document.getElementById('abr-quality');

abrQuality.addEventListener('change', function () {
    const value = this.value; // Gets streamname
    const index = this.selectedIndex - 1; // Gets 0, 1, or 2

    if (player) {
        if (value === 'auto') {
            player.setAdaption({
                'rule'     : config.source.options.adaption.rule !== 'none' ? config.source.options.adaption.rule : 'deviationOfMean2',
                'downStep' : config.source.options.adaption.downStep || 1,
            });
        }
        else if (isNaN(index)) {
            console.error('Cannot switch quality', index);
        }
        else {
            player.switchStream(index).then(function () {
                console.log('switchStream initialized');
            }, function error (_err) {
                console.error('switchStream aborted with error ' + _err.code + ': ' + _err.message);
            });
        }
    }
});

const latencyMode = document.getElementById('latency-mode');

latencyMode.addEventListener('change', function () {
    const value = this.value; // Gets latency mode
    if (player) {
        config.playback.latencyControlMode = value;
        
        // Reset mute button to default state
        resetMuteButton();
        
        createCodeSnippet(config);
        updateMoQIndicator(); // Update MoQ indicator when config changes
        player.setup(config).then(function (config) {
            console.log('Setup success');
            console.log('Config: ' + JSON.stringify(config, undefined, 4));
        }, function (error) {
            console.log('Setup error: ' + error.code + ' - ' + error.message);
            updateStatus('Setup error: ' + error.code + ' - ' + error.message);
            updateStatusField('error-value', 'Setup error: ' + error.code + ' - ' + error.message);
        });
    }
});

/**
 * Validates a config path against NanoPlayer valid configs
 * @param {Array} path - The config path as an array (e.g., ['playback', 'autoplay'])
 * @param {boolean} isEntry - Whether this is an entry config
 * @returns {Object} - { valid: boolean, reason?: string, expectedType?: string }
 */
function isValidConfigPath (path, isEntry = false) {
    // Get the appropriate valid config
    const validConfig = isEntry && NanoPlayer && NanoPlayer.entryValidConfig
        ? NanoPlayer.entryValidConfig
        : (NanoPlayer && NanoPlayer.validConfig ? NanoPlayer.validConfig : null);
    
    if (!validConfig) {
        // No validation available, allow all
        return { 'valid': true };
    }
    
    // Navigate through the valid config structure
    let current = validConfig;
    for (let i = 0; i < path.length; i++) {
        const key = path[i];
        
        if (!Object.prototype.hasOwnProperty.call(current, key)) {
            // Not in standard config - won't be used for player configuration
            return {
                'valid'  : false,
                'reason' : 'not recognized in config structure'
            };
        }
        
        current = current[key];
        
        // If the valid config defines this as 'object' string, any nested values are allowed
        if (current === 'object') {
            return {
                'valid': true
            };
        }
        
        // If current is an object at a non-terminal position, continue navigating
        if (i < path.length - 1) {
            if (typeof current !== 'object' || current === null) {
                // Unexpected structure - won't be used for player configuration
                return {
                    'valid'  : false,
                    'reason' : `unexpected structure at '${key}'`
                };
            }
        }
    }
    
    // If the valid config defines this as an object with no specific type,
    // any nested key/values are allowed
    if (typeof current === 'object' && current !== null && Object.keys(current).length === 0) {
        // This is an open object that accepts any nested values
        return {
            'valid'        : true,
            'expectedType' : 'object'
        };
    }
    
    // Return the expected type from validConfig
    if (typeof current === 'string') {
        return {
            'valid'        : true,
            'expectedType' : current
        };
    }
    
    return { 'valid': true };
}

/**
 * Parse a value according to the expected type from validConfig
 * @param {string} value - The raw string value to parse
 * @param {string} expectedType - The expected type from validConfig
 * @returns {*} - The parsed value in the correct type
 */
function parseValueWithType (value, expectedType) {
    // For generic/wildcard types, use original parseValue logic (auto-detect)
    // But handle comma-separated values as arrays
    if (!expectedType || expectedType === '*' || expectedType === 'object') {
        if (value.includes(',')) {
            // Split comma-separated values into array with auto-detection for each element
            return value.split(',').map((v) => parseValue(v.trim()));
        }
        return parseValue(value);
    }
    
    // For explicit types, use type-specific parsing (no comma splitting)
    switch (expectedType) {
        case 'number':
            if (!isNaN(parseFloat(value)) && isFinite(value)) {
                const trimmedValue = value.trim();
                const parsedFloat = parseFloat(trimmedValue);
                // Verify it's a complete number (not partial like "123abc")
                if (trimmedValue === parsedFloat.toString()) {
                    return parsedFloat;
                }
                // Handle decimal numbers with potential precision issues
                if (trimmedValue.includes('.')) {
                    const parts = trimmedValue.split('.');
                    const decimalPlaces = parts[1] ? parts[1].length : 0;
                    const fixedValue = parsedFloat.toFixed(decimalPlaces);
                    if (trimmedValue === fixedValue) {
                        return parsedFloat;
                    }
                }
            }
            // Return as string if not a valid number
            return value;
            
        case 'boolean':
            if (value === 'true') return true;
            if (value === 'false') return false;
            // Return as string if not a valid boolean
            return value;
            
        case 'string':
            return value !== '' ? value : undefined;
            
        case 'function':
            // Functions can't be parsed from query strings, return as string
            return value;
            
        default:
            // For any other type, use original parseValue logic
            return parseValue(value);
    }
}

/**
 * Validates a parsed value against the expected type
 * @param {*} parsedValue - The parsed value
 * @param {string} expectedType - The expected type from validConfig
 * @returns {Object} - { valid: boolean, reason?: string }
 */
function validateParsedValue (parsedValue, expectedType) {
    if (!expectedType || expectedType === '*') {
        return { 'valid': true };
    }
    
    switch (expectedType) {
        case 'number':
            if (typeof parsedValue !== 'number' || isNaN(parsedValue)) {
                return {
                    'valid'  : false,
                    'reason' : `expected number but got ${typeof parsedValue}`
                };
            }
            return { 'valid': true };
            
        case 'boolean':
            if (typeof parsedValue !== 'boolean') {
                return {
                    'valid'  : false,
                    'reason' : `expected boolean but got ${typeof parsedValue}`
                };
            }
            return { 'valid': true };
            
        case 'function':
            if (typeof parsedValue !== 'function') {
                return {
                    'valid'  : false,
                    'reason' : `expected function but got ${typeof parsedValue}`
                };
            }
            return { 'valid': true };
            
        case 'object':
            if (typeof parsedValue !== 'object' && !Array.isArray(parsedValue)) {
                return {
                    'valid'  : false,
                    'reason' : `expected object but got ${typeof parsedValue}`
                };
            }
            return { 'valid': true };
            
        case 'string':
            if (typeof parsedValue !== 'string') {
                return {
                    'valid'  : false,
                    'reason' : `expected string but got ${typeof parsedValue}`
                };
            }
            return { 'valid': true };
            
        default:
            return { 'valid': true };
    }
}

function parseConfigFromQuery (queryString) {
    console.log('Parse key/value pairs from query: ', queryString);
    const query = { 'config': { 'source': {} } };
    const queryParams = (queryString.indexOf('?') === 0 ? queryString.substring(1) : queryString).split('&').filter((param) => param.length > 0 && param.indexOf('=') > 0);

    const entries = [];
    
    // Determine indexing mode
    let indexingMode = 'direct'; // default
    
    queryParams.forEach((param) => {
        const key = param.split('=')[0];
        const path = key.split('.');
        // Remove config. and source. prefixes if present
        if (path[0].startsWith('config.')) path.shift();
        if (path[0].startsWith('source.')) path.shift();
        
        if (path[0] === 'entry') {
            // 'entry' without number = legacy mode
            indexingMode = 'legacy';
        }
        else if (path[0] === 'entry0') {
            // 'entry0' = direct mode
            indexingMode = 'direct';
        }
    });
    
    // If neither 'entry' nor 'entry0' found, check for entry1+ and use offset mode
    if (indexingMode === 'direct') {
        const hasEntry0 = queryParams.some((param) => {
            const key = param.split('=')[0];
            const path = key.split('.');
            if (path[0].startsWith('config.')) path.shift();
            if (path[0].startsWith('source.')) path.shift();
            return path[0] === 'entry0';
        });
        
        const hasEntryWithoutNumber = queryParams.some((param) => {
            const key = param.split('=')[0];
            const path = key.split('.');
            if (path[0].startsWith('config.')) path.shift();
            if (path[0].startsWith('source.')) path.shift();
            return path[0] === 'entry';
        });
        
        if (!hasEntry0 && !hasEntryWithoutNumber) {
            indexingMode = 'offset'; // entry1 → 0, entry2 → 1, etc.
        }
    }

    queryParams.forEach((param) => {
        const [key, encodedValue] = param.split('=');
        const value = decodeURIComponent(encodedValue);
        console.log('Parameter: ', key, 'Value: ', value);
        const path = key.split('.');

        // Add config. prefix support
        if (path[0] === 'config') {
            path.shift(); // remove the config. prefix
        }

        // Add source. prefix support
        if (path[0] === 'source') {
            path.shift(); // remove the source. prefix
        }

        if (path[0].startsWith('entry')) {
            const entryIndex = path[0].replace('entry', '');
            let index;
            
            if (entryIndex === '') {
                // 'entry' without number = index 0
                index = 0;
            }
            else {
                const num = parseInt(entryIndex, 10);
                if (indexingMode === 'legacy') {
                    // Legacy mode: entry2 → 1, entry3 → 2, etc.
                    index = num - 1;
                }
                else if (indexingMode === 'offset') {
                    // Offset mode: entry1 → 0, entry2 → 1, entry3 → 2, etc.
                    index = num - 1;
                }
                else {
                    // Direct mode: entry0 → 0, entry1 → 1, entry2 → 2, etc.
                    index = num;
                }
            }
            
            // Ensure entries array is large enough and fill gaps with empty objects
            while (entries.length <= index) {
                entries.push({});
            }
            
            let entry = entries[index];
            if (!entry || Object.keys(entry).length === 0) {
                entries[index] = {};
                entry = entries[index];
            }

            // Generic nested structure handling - skip 'entry' and navigate through remaining path
            let current = entry;
            let entryPath = path.slice(1); // Remove 'entry' from path
            
            // Auto-wrap certain properties under h5live
            if (entryPath.length > 0 && (['rtmp', 'server', 'security', 'params', 'token'].includes(entryPath[0]))) {
                entryPath = ['h5live', ...entryPath];
            }
            
            // Validate entry config path first
            const entryValidation = isValidConfigPath(entryPath, true);
            if (!entryValidation.valid) {
                console.info(`Parameter 'entry${entryIndex}.${entryPath.join('.')}' ${entryValidation.reason || 'not recognized'} - will not be added to player config`);
                return; // Skip this parameter in forEach
            }
            
            // Parse the value according to the expected type from validConfig
            const parsedValue = parseValueWithType(value, entryValidation.expectedType);
            
            // Validate the parsed value matches expected type
            const valueValidation = validateParsedValue(parsedValue, entryValidation.expectedType);
            if (!valueValidation.valid) {
                console.info(`Parameter 'entry${entryIndex}.${entryPath.join('.')}' ${valueValidation.reason} - will not be added to player config`);
                return; // Skip this parameter in forEach
            }
            
            // Create nested objects for all path segments except the last one
            for (let i = 0; i < entryPath.length - 1; i++) {
                if (!current[entryPath[i]]) {
                    current[entryPath[i]] = {};
                }
                current = current[entryPath[i]];
            }
            
            // Set the final value
            current[entryPath[entryPath.length - 1]] = parsedValue;
            
            // Add the real index to the entry object
            entry.index = index;
        }
        else if (['startIndex', 'options', 'defaults', 'general', 'group'].includes(path[0])) {
            // Validate source config path first
            const sourcePath = ['source', ...path];
            const sourceValidation = isValidConfigPath(sourcePath, false);
            if (!sourceValidation.valid) {
                console.info(`Parameter '${path.join('.')}' ${sourceValidation.reason || 'not recognized'} - will not be added to player config`);
                return; // Skip this parameter in forEach
            }
            
            // Parse value according to expected type and special cases
            let parsedValue;
            const lastKey = path[path.length - 1];
            
            if (value.includes(',')) {
                // All comma-separated values become arrays with mixed data types
                parsedValue = value.split(',').map((v) => parseValueWithType(v.trim(), sourceValidation.expectedType));
            }
            else if (lastKey === 'omitRenditions') {
                // OmitRenditions should always be an array
                parsedValue = [parseValueWithType(value.trim(), sourceValidation.expectedType)];
            }
            else {
                parsedValue = parseValueWithType(value, sourceValidation.expectedType);
            }
            
            // Validate the parsed value matches expected type (skip for arrays as they have mixed types)
            if (!Array.isArray(parsedValue)) {
                const valueValidation = validateParsedValue(parsedValue, sourceValidation.expectedType);
                if (!valueValidation.valid) {
                    console.info(`Parameter '${path.join('.')}' ${valueValidation.reason} - will not be added to player config`);
                    return; // Skip this parameter in forEach
                }
            }
            
            let currentObj = query.config.source;
            for (let i = 0; i < path.length - 1; i++) {
                if (!currentObj[path[i]]) {
                    currentObj[path[i]] = {};
                }
                currentObj = currentObj[path[i]];
            }

            currentObj[lastKey] = parsedValue;
        }
        else {
            // Validate general config path first
            const generalValidation = isValidConfigPath(path, false);
            if (!generalValidation.valid) {
                console.info(`Parameter '${path.join('.')}' ${generalValidation.reason || 'not recognized'} - will not be added to player config`);
                return; // Skip this parameter in forEach
            }
            
            // Parse value according to expected type and special cases
            let parsedValue;
            const lastKey = path[path.length - 1];
            
            if (!['style', 'metrics'].includes(path[0]) && value.includes(',')) {
                // All comma-separated values become arrays with mixed data types
                parsedValue = value.split(',').map((v) => parseValueWithType(v.trim(), generalValidation.expectedType));
            }
            else if (lastKey === 'videoId') {
                // VideoId should always be an array
                parsedValue = [parseValueWithType(value.trim(), generalValidation.expectedType)];
            }
            else {
                parsedValue = parseValueWithType(value, generalValidation.expectedType);
            }
            
            // Validate the parsed value matches expected type (skip for arrays as they have mixed types)
            if (!Array.isArray(parsedValue)) {
                const valueValidation = validateParsedValue(parsedValue, generalValidation.expectedType);
                if (!valueValidation.valid) {
                    console.info(`Parameter '${path.join('.')}' ${valueValidation.reason} - will not be added to player config`);
                    return; // Skip this parameter in forEach
                }
            }
            
            // Prevent primitive values at the top level of config (only objects allowed)
            if (path.length === 1) {
                console.info(`Parameter '${path.join('.')}' cannot be set at top level - top level keys must be objects`);
                return; // Skip this parameter in forEach
            }
            
            let currentObj = query.config;
            for (let i = 0; i < path.length - 1; i++) {
                if (!currentObj[path[i]]) {
                    currentObj[path[i]] = {};
                }
                currentObj = currentObj[path[i]];
            }

            currentObj[lastKey] = parsedValue;
        }
    });

    if (entries.length > 0) {
        entries.sort(function (a, b) {
            return a.index - b.index;
        });
        query.config.source.entries = [];
        for (let i = 0; i < entries.length; i++) {
            query.config.source.entries.push(entries[i]);
        }
    }

    return query;
}

function parseValue (value) {
    if (value === 'true') {
        return true;
    }
    else if (value === 'false') {
        return false;
    }
    else if (!isNaN(parseFloat(value)) && isFinite(value)) {
        // Check if the original string represents a valid number
        const trimmedValue = value.trim();
        const parsedFloat = parseFloat(trimmedValue);
        // Verify it's a complete number (not partial like "123abc")
        if (trimmedValue === parsedFloat.toString()) {
            return parsedFloat;
        }
        // Handle decimal numbers with potential precision issues
        if (trimmedValue.includes('.')) {
            const parts = trimmedValue.split('.');
            const decimalPlaces = parts[1] ? parts[1].length : 0;
            const fixedValue = parsedFloat.toFixed(decimalPlaces);
            if (trimmedValue === fixedValue) {
                return parsedFloat;
            }
        }
        return value; // Return as string if not a pure number
    }
    else if (value !== '') {
        return value;
    }
    else {
        return undefined; // ignore empty strings
    }
}

function deepCopy (obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    const copy = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }

    return copy;
}

function mergeDeep (target, source) {
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (typeof target[key] === 'object' && typeof source[key] === 'object') {
                mergeDeep(target[key], source[key]);
            }
            else {
                target[key] = source[key];
            }
        }
    }
    return target;
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function () {
    if (document.hidden && player && isPlaying) {
        // Optionally pause when tab is hidden
        console.log('Tab hidden');
    }
    else if (!document.hidden && player) {
        console.log('Tab visible');
    }
});

// Code Snippet Generation Functions
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

function createCodeSnippet (_config) {
    // Create codesnippet
    var codeContainer = document.getElementById('code-snippet');
    codeContainer.innerHTML = '';
    var line = '<div id="playerDiv"></div>\r\n';
    line += '<script src="' + getPlayerLocation() + '"></script>\r\n';
    line += '<script>\r\n';
    line += '    var player;\r\n';

    // Prepare config for parsing
    // Copy config
    var configCopy = JSON.parse(JSON.stringify(_config));
    // Remove events
    delete configCopy.events;
    // Remove runtime properties that shouldn't be in user config
    delete configCopy.mediaplaybackapi;
    delete configCopy.id;
    delete configCopy.url;
    delete configCopy.type;
    delete configCopy.latencyControlMode; // duplicate of playback.latencyControlMode
    // Remove empty objects, arrays & undefined keys
    removeFromConfig(configCopy);
    
    // Transform old to new
    var i, len, entry, entryType, entryTypes = ['bintu', 'h5live'], commonServer, commonUrl;
    for (i = 0, len = entryTypes.length; i < len; i += 1) {
        entryType = entryTypes[i];
        if (configCopy.source[entryType]) {
            entry = {
                'index': 0
            };
            entry[entryType] = JSON.parse(JSON.stringify(configCopy.source[entryType]));
            configCopy.source.entries = [
                entry
            ];
            delete configCopy.source[entryType];
            break;
        }
        entryType = undefined;
    }

    // Check if is redundant code snippet
    var isSameServer, isSameUrl, hasNoServer, hasNoUrl, hasReducedStreamConfig;

    if (configCopy.source.entries && configCopy.source.entries.length) {
        if (!entryType) {
            for (i = 0, len = entryTypes.length; i < len; i += 1) {
                entryType = entryTypes[i];
                if (configCopy.source.entries[0][entryType]) {
                    break;
                }
                entryType = undefined;
            }
        }
        var filtered = configCopy.source.entries.filter(function (entry) {
            return !!entry[entryType];
        });
        if (filtered.length === configCopy.source.entries.length) {
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
            hasReducedStreamConfig = (isSameServer || isSameUrl) || (hasNoServer && hasNoUrl);
        }
        var _asArray = true;
        // Add defaults
        if (isSameUrl) {
            commonUrl = configCopy.source.entries[0].h5live.rtmp.url;
            line += '    var commonUrl = "' + commonUrl + '"; \r\n';
        }
        if (isSameServer) {
            commonServer = configCopy.source.entries[0].h5live.server;
            line += '    var commonServer = ' + JSON.stringify(commonServer, undefined, 4) + '; \r\n';
        }
        if (hasReducedStreamConfig) {
            _asArray && (line += '    var ' + (entryType === 'h5live' ? 'streamNames' : 'bintuStreamIds') + ' = [ \r\n');
        }
        for (i = 0, len = configCopy.source.entries.length; i < len; i++) {
            entry = configCopy.source.entries[i];
            // Add stream name
            if (hasReducedStreamConfig) {
                if (_asArray) {
                    line += '        "' + (entryType === 'h5live' ? entry.h5live.rtmp.streamname : entry.bintu.streamid) + '"';
                    (i !== len - 1) && (line += ',');
                }
                else {
                    line += '    var ' + (entryType === 'h5live' ? 'streamName' : 'bintuStreamId') + (i + 1) + ' = "' + (entryType === 'h5live' ? entry.h5live.rtmp.streamname : entry.bintu.streamid) + '";';
                }
                line += ' \r\n';
            }
            // Set placeholders
            if (isSameUrl) {
                entry.h5live.rtmp.url = '___commonUrl___';
            }
            if (isSameServer) {
                entry.h5live.server = '___commonServer___';
            }
            if (hasReducedStreamConfig) {
                if (entry.h5live && entry.h5live.rtmp && entry.h5live.rtmp.streamname) {
                    entry.h5live.rtmp.streamname = '___streamName' + (_asArray ? 's[' + i + ']' : (i + 1)) + '___';
                }
                if (entry.bintu && entry.bintu.streamid) {
                    entry.bintu.streamid = '___bintuStreamId' + (_asArray ? 's[' + i + ']' : i) + '___';
                }
            }
        }
        if (hasReducedStreamConfig) {
            _asArray && (line += '    ]; \r\n');
        }
    }

    configCopy = JSON.stringify(configCopy, null, 4);
    configCopy = removePlaceholders(configCopy);

    // Add code snippet end - fix indentation for config object
    const configLines = configCopy.split('\n');
    line += '    var config = ' + configLines[0] + '\r\n';
    for (let i = 1; i < configLines.length; i++) {
        line += '    ' + configLines[i] + '\r\n';
    }
    // Remove the last \r\n and add semicolon properly
    line = line.slice(0, -2) + ';\r\n';
    line += '    \r\n';
    line += '    document.addEventListener(\'DOMContentLoaded\', function () {\r\n';
    line += '        player = new NanoPlayer("playerDiv");\r\n';
    line += '        \r\n';
    line += '        player.setup(config).then(function (config) {\r\n';
    line += '            console.log("setup success");\r\n';
    line += '            console.log("config: " + JSON.stringify(config, undefined, 4));\r\n';
    line += '        }, function (error) {\r\n';
    line += '            alert(error.message);\r\n';
    line += '        });\r\n';
    line += '    });\r\n';
    line += '</script>\r\n';
    // Apply syntax highlighting
    codeContainer.innerHTML = applySyntaxHighlighting(line);
    document.getElementById('code-snippet-container').style.display = 'block';
    
    // Store original code for copying (without HTML tags)
    codeContainer.setAttribute('data-original-code', line);
    
    // Add copy button functionality
    setupCopyButton();
}

function applySyntaxHighlighting (code) {
    // Escape HTML entities first
    code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Convert line breaks to <br> tags
    code = code.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>').replace(/\r/g, '<br>');
    
    // Simple sequential highlighting - strings first, then everything else
    
    // 1. Comments (require at least one space after //)
    code = code.replace(/\/\/\s+.*?(?=&lt;br&gt;|$)/g, '<span class="comment">$&</span>');
    
    // 2. JSON property keys (strings followed by colon)
    code = code.replace(/(&quot;[^&]*?&quot;)\s*:/g, '<span class="property">$1</span>:');
    
    // 3. JSON string values (strings after colon)
    code = code.replace(/:\s*(&quot;[^&]*?&quot;)/g, ': <span class="string">$1</span>');
    
    // 4. Remaining strings (HTML attributes, etc.) - exclude already highlighted strings
    code = code.replace(/(&quot;[^&]*?&quot;)(?![^<]*<\/span>)/g, function (match, p1, offset, string) {
        // Check if this string is already inside a span
        var beforeMatch = string.substring(0, offset);
        var lastSpanOpen = beforeMatch.lastIndexOf('<span');
        var lastSpanClose = beforeMatch.lastIndexOf('</span>');
        
        // If we're inside a span, don't highlight
        if (lastSpanOpen > lastSpanClose) {
            return match;
        }
        
        return '<span class="string">' + p1 + '</span>';
    });
    
    // 5. Boolean and null values
    code = code.replace(/:\s*(true|false|null)\b/g, ': <span class="keyword">$1</span>');
    
    // 6. Numbers
    code = code.replace(/:\s*(-?\d+\.?\d*)/g, ': <span class="number">$1</span>');
    code = code.replace(/\[(\d+)\]/g, '[<span class="number">$1</span>]');
    
    // 7. Keywords
    code = code.replace(/\b(var|let|const|function|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|new|this|typeof|instanceof|in|of|delete|void|undefined)\b(?![^<]*<\/span>)/g, '<span class="keyword">$1</span>');
    
    // 8. Function calls
    code = code.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()(?![^<]*<\/span>)/g, '<span class="function">$1</span>');
    
    // 9. Variable declarations and assignments
    code = code.replace(/\b(var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)(?![^<]*<\/span>)/g, '<span class="keyword">$1</span> <span class="variable">$2</span>');
    
    // 9b. Variable assignments (for cases not caught above)
    code = code.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*)(?==)(?![^<]*<\/span>)/g, '<span class="variable">$1</span>$2');
    
    // 10. Brackets and braces
    code = code.replace(/([{}[\]])/g, '<span class="bracket">$1</span>');
    
    // 11. Object properties after dot - completely skip this for now
    // Let's not highlight dots at all to avoid the string issue
    
    return code;
}

function setupCopyButton () {
    var copyBtn = document.getElementById('copy-code-btn');
    if (copyBtn) {
        copyBtn.onclick = function () {
            var codeContainer = document.getElementById('code-snippet');
            var originalCode = codeContainer.getAttribute('data-original-code');
            
            // Create a temporary textarea to copy the text
            var textarea = document.createElement('textarea');
            textarea.value = originalCode;
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, 99999); // For mobile devices
            
            try {
                document.execCommand('copy');
                // Visual feedback
                copyBtn.innerHTML = '<span class="material-icons">check</span> Copied!';
                copyBtn.classList.add('copied');
                setTimeout(function () {
                    copyBtn.innerHTML = '<span class="material-icons">content_copy</span> Copy';
                    copyBtn.classList.remove('copied');
                }, 2000);
            }
            catch (err) {
                console.error('Failed to copy text: ', err);
                copyBtn.innerHTML = '<span class="material-icons">error</span> Failed';
                copyBtn.classList.add('failed');
                setTimeout(function () {
                    copyBtn.innerHTML = '<span class="material-icons">content_copy</span> Copy';
                    copyBtn.classList.remove('failed');
                }, 2000);
            }
            
            document.body.removeChild(textarea);
        };
    }
}


// Toggle code snippet section
function toggleCodeSnippet () {
    const container = document.getElementById('code-snippet-container');
    const arrow = document.getElementById('code-snippet-arrow');
    
    if (container.classList.contains('collapsed')) {
        // Expanding: set max-height to content height
        container.style.maxHeight = container.scrollHeight + 'px';
        container.classList.remove('collapsed');
        arrow.textContent = 'expand_less';
        
        // Scroll to config section when opening snippet
        setTimeout(() => {
            const configSection = container.closest('.config-section');
            if (configSection) {
                configSection.scrollIntoView({ 'behavior' : 'smooth',
                    'block'    : 'start' });
            }
        }, 400);
    }
    else {
        // Collapsing: set max-height to 0
        container.style.maxHeight = '0px';
        container.classList.add('collapsed');
        arrow.textContent = 'expand_more';
        
        // Scroll back to top when closing snippet
        setTimeout(() => {
            window.scrollTo({ 'top'      : 0,
                'behavior' : 'smooth' });
        }, 100);
    }
}

var hasSetupError = false;

function checkActualConnection () {
    if (hasSetupError) return;

    const indicator = document.getElementById('moq-indicator-config');
    const text = document.getElementById('moq-text-config');
    const dot = indicator.querySelector('.dot');
    
    var isMoQEnabled = config && config.playback && config.playback.enableMediaOverQuic;
    
    var hasWebTransport = !!window.WebTransport;
    var hasVideoDecoder = !!window.VideoDecoder;
    var hasAudioDecoder = !!window.AudioDecoder;
    var isMediaOverQuicSupported = hasWebTransport && hasVideoDecoder && hasAudioDecoder;
    
    dot.classList.remove('dot-green', 'dot-orange', 'dot-red');
    
    text.textContent = 'Checking connection type...';
    dot.classList.add('dot-white');

    function check () {
        updateMoQDisplay(isMoQEnabled, isMediaOverQuicSupported, player ? player.mediaplaybackapi : 'default');
    }

    if (player && player.mediaplaybackapi === 'default') {
        setTimeout(function () {
            checkActualConnection();
        }, 100);
    }
    else {
        check();
    }
}

function updateMoQDisplay (isMoQEnabled, isMediaOverQuicSupported, connectionType) {
    const indicator = document.getElementById('moq-indicator-config');
    const text = document.getElementById('moq-text-config');
    const dot = indicator ? indicator.querySelector('.dot') : null;
    
    if (!dot || !text) return;
    
    // Remove existing color classes
    dot.classList.remove('dot-green', 'dot-orange', 'dot-red', 'dot-white');
    
    if (isMoQEnabled) {
        if (connectionType === 'moq') {
            // Green: MoQ is active
            dot.classList.add('dot-green');
            text.textContent = 'MOQ: Active (WebTransport)';
        }
        else if (connectionType === 'hls') {
            // Orange: MoQ enabled but using HLS fallback
            dot.classList.add('dot-orange');
            text.textContent = 'MOQ: Inactive (HTTP/HLS Fallback)';
        }
        else if (connectionType === 'default') {
            dot.classList.add('dot-white');
            text.textContent = 'MOQ status';
        }
        else {
            // Orange: MoQ enabled but using fallback
            dot.classList.add('dot-orange');
            text.textContent = 'MOQ: Inactive (WebSocket Fallback)';
        }
    }
    else if (isMediaOverQuicSupported) {
        // Orange: Supported but not enabled
        dot.classList.add('dot-orange');
        text.textContent = 'MOQ: Supported but not enabled';
    }
    else {
        // Red: Not supported
        dot.classList.add('dot-red');
        text.textContent = 'MOQ: Not supported';
    }
}

function updateNeutralMOQDisplay () {
    const indicator = document.getElementById('moq-indicator-config');
    const text = document.getElementById('moq-text-config');
    const dot = indicator ? indicator.querySelector('.dot') : null;
    
    if (!dot || !text) return;
    
    indicator.style.display = 'inline-flex';
    
    dot.classList.remove('dot-green', 'dot-orange', 'dot-red', 'dot-white');
    
    dot.classList.add('dot-white');
    text.textContent = 'MOQ Status';
}

// Update MoQ indicator when config changes
function updateMoQIndicator () {
    checkActualConnection();
}

// Cleanup orphaned states and switching indicators
function cleanupOrphanedStates () {
    const ORPHANED_STATE_TIMEOUT = 10000; // 10 seconds
    const now = Date.now();
    let foundOrphanedSwitchInit = false;
    
    // Check all status field queues for orphaned NRS states
    Object.keys(statusFieldQueues).forEach((elementId) => {
        const queueData = statusFieldQueues[elementId];
        if (!queueData || !queueData.queue) return;
        
        // Find orphaned "switch init" states that are older than timeout
        const orphanedItems = queueData.queue.filter((item) => {
            if (!item.isRealState && String(item.value || '').toLowerCase().includes('switch init')) {
                const age = now - item.timestamp;
                return age > ORPHANED_STATE_TIMEOUT;
            }
            return false;
        });
        
        // Remove orphaned switch init states
        orphanedItems.forEach((item) => {
            console.log('Cleaning up orphaned switch init state:', item.value);
            foundOrphanedSwitchInit = true;
            removeStatusValue(elementId, item);
        });
    });
    
    // If we found orphaned switch init, clean up switching indicators
    if (foundOrphanedSwitchInit && ongoingSwitches > 0) {
        console.log('Cleaning up orphaned switching indicators');
        
        // Reset switching counter and remove all switching indicators
        ongoingSwitches = 0;
        const abrQuality = document.getElementById('abr-quality');
        if (abrQuality) {
            for (let i = 0; i < abrQuality.options.length; i++) {
                const option = abrQuality.options[i];
                if (option.textContent.includes(' - Switching...')) {
                    option.textContent = option.textContent.replace(' - Switching...', '');
                }
            }
        }
    }
}

function startOrphanedStateCleanup () {
    // Clear existing timer if any
    if (orphanedStateCleanupTimer) {
        clearInterval(orphanedStateCleanupTimer);
    }
    
    // Start periodic cleanup every 5 seconds
    orphanedStateCleanupTimer = setInterval(cleanupOrphanedStates, 5000);
}

function stopOrphanedStateCleanup () {
    if (orphanedStateCleanupTimer) {
        clearInterval(orphanedStateCleanupTimer);
        orphanedStateCleanupTimer = null;
    }
}


// Initialize MoQ check when page loads
document.addEventListener('DOMContentLoaded', function () {
    checkActualConnection();
    startOrphanedStateCleanup(); // Start cleanup timer on page load
    // Event listeners for code snippet functionality
    document.getElementById('code-snippet-toggle').addEventListener('click', toggleCodeSnippet);
});

// Stop cleanup timer when page unloads
window.addEventListener('beforeunload', function () {
    stopOrphanedStateCleanup();
});
