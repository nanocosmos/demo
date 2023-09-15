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
var controlsOverlayModule = (function () {
    var volumeSliderTimeout;
    var controlsTimeout;

    // cache DOM
    var playerControlsBottom = document.getElementById('playerControlsBottom');
    var controlsPlayoutTime = document.getElementById('controlsPlayoutTime');
    var controlBtnPause = document.getElementById('controlBtnPause');
    var controlsBtnVolumeIcon = document.getElementById('controlsBtnVolumeIcon');
    var controlsBtnFullscreen = document.getElementById('controlsBtnFullscreen');
    var controlIconPlay = document.getElementById('controlIconPlay');
    var controlIconPause = document.getElementById('controlIconPause');
    var controlsIconVolumeUp = document.getElementById('controlsIconVolumeUp');
    var controlsIconVolumeMute = document.getElementById('controlsIconVolumeMute');
    var controlsVolumeSliderTrack = document.getElementById('controlsVolumeSliderTrack');
    var controlsVolumeSliderPosition = document.getElementById('controlsVolumeSliderPosition');

    // bind events
    controlBtnPause.addEventListener('click', handleButtonPauseClick);
    controlsBtnVolumeIcon.addEventListener('click', handleButtonVolumeClick);
    controlsBtnVolumeIcon.addEventListener('mouseenter', function () {
        toggleVolumeSlider(true);
    });
    controlsBtnVolumeIcon.addEventListener('mouseleave', function () {
        toggleVolumeSlider(false);
    });
    controlsVolumeSliderTrack.addEventListener('click', handleVolumeSliderClick);
    controlsVolumeSliderTrack.addEventListener('mouseenter', function () {
        toggleVolumeSlider(true);
    });
    controlsVolumeSliderTrack.addEventListener('mouseleave', function () {
        toggleVolumeSlider(false);
    });
    controlsBtnFullscreen.addEventListener('click', handleButtonFullscreenClick)

    function init() {
        initTooltips();
        showControlsElement(false);
    }

    function initTooltips() {
        $(controlsBtnFullscreen).tooltip({
            placement: 'top',
            title: $(controlsBtnFullscreen).attr("tooltip-title")
        });
    }

    function handleButtonPauseClick() {
        playerModule.togglePlay();
    }

    function handleButtonVolumeClick() {
        var isPlayerMuted = playerModule.getMuteState();
        isPlayerMuted ? playerModule.setVolume(0.4) : playerModule.setVolume(0);
    }

    // volume relative to click position inside volume track
    function handleVolumeSliderClick(e) {
        var volume = ((controlsVolumeSliderTrack.offsetWidth / 100) * e.offsetX) / 100;
        playerModule.setVolume(volume);
    }

    function handleButtonFullscreenClick() {
        playerModule.toggleFullscreen();
        $(controlsBtnFullscreen).tooltip('hide');
    }

    function setVolumeSlider(volume) {
        controlsVolumeSliderPosition.style.width = volume + "%";
    }

    function setVolumeIcon(volume) {
        if (volume === 0) {
            controlsIconVolumeUp.style.display = 'none';
            controlsIconVolumeMute.style.display = 'block';
        } else {
            controlsIconVolumeUp.style.display = 'block';
            controlsIconVolumeMute.style.display = 'none';
        }
    }

    // sets playout time in XX:XX format
    function setPlayoutTime(stats) {
        var time = ~~(stats.currentTime);
        var seconds = (time % 60);
        controlsPlayoutTime.textContent = ~~(time / 60) + ":" + (seconds <= 9 ? '0' + seconds : seconds);
    }

    function toggleVolumeSlider(bool) {
        if (volumeSliderTimeout) clearTimeout(volumeSliderTimeout);
        if (bool) {
            controlsVolumeSliderTrack.classList.remove('width__hidden');
        } else {
            volumeSliderTimeout = setTimeout(function () {
                controlsVolumeSliderTrack.classList.add('width__hidden');
            }, 3000);
        }
    }

    function setPlayIcon(isPlaying) {
        controlIconPlay.style.display = isPlaying ? 'none' : 'block';
        controlIconPause.style.display = isPlaying ? 'block' : 'none';
    }

    function show(bool) {
        if (controlsTimeout) clearTimeout(controlsTimeout);

        if (bool) {
            showControlsElement(true);
        } else {
            controlsTimeout = setTimeout(function () {
                if (playerModule.isPlaying) {
                    showControlsElement(false)
                }
            }, 3000);
        }
    }

    function showControlsElement(show) {
        playerControlsBottom.style.opacity = show ? 1 : 0;
    }

    return {
        init: init,
        setVolumeSlider: setVolumeSlider,
        setVolumeIcon: setVolumeIcon,
        setPlayoutTime: setPlayoutTime,
        show: show,
        setPlayIcon: setPlayIcon
    }
}());