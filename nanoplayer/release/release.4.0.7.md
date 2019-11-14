# NanoPlayer - Release Overview

# [4.0.7]

## Release Notes

This version patches an issue with iOS 10 playing state detection and the buffer control for hls playback in general.
Now playback stats will be correctly used for hls playback to indicate PLAYING and to control the buffer.
This issue was introduced with the major player version 4 and doesn't effect older major versions (3 or less).
Also a duplicated module declaration is removed to ensure stable builds and a small scope issue is fixed.

## Changelog

### Fixed

- iOS 10 playing state detection and buffer control for hls in general by correct registering play stats event in buffercontrol
- removed duplicated module declaration in mediasourcemanger
- correct scope issue in onUpdateSourceInit in h5live.js

# [4.0.4]

## Release Notes

This version contains an improvement for the detection of supported browser types and versions.
It furthermore contains an improvement for playback in iPadOS desktop browsing mode,
to correctly detect H5Live MSE or LL-HLS modes for playback.

## Changelog

### Improved

- improved supported browser version detection
- improved playback in desktop browsing mode on iPadOS
- changes applied from 3.18.6/3.18.7

# [4.0.2]

## Release Notes

### BREAKING CHANGE
The new nanoStream H5Live Player version 4 brings an updated stream switch feature. We improved the old 'updateSource' functionality by the possibility to switch to another stream by server-side switch and a better client-side switch.
Now the switch to another source is much more smoother and faster. The old behaviour with stopping the player by reason 'playbackrestart' and restart playback with the new source is removed except for iOS.

Please find more about the new feature in our [documentation]( https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_switching/).

## Changelog

### Improved

- new 'updateSource' methods 'server' and 'client' for smoother and faster behaviour
- 'updateSource' options object as param
- new public events 'onUpdateSourceInit', 'onUpdateSourceInit', 'onUpdateSourceFail' and 'onUpdateSourceAbort'
- new error codes 4005 and 4006

### Removed

- pause/play update behaviour except for iOS

# Release Package Download

## Release Package 4.0.7
* [4.0.7](https://files.nanocosmos.de/index.php/s/oX6HoJP6j2T6taP)
* [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
* [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

# Documentation
* [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)
* [demo.nanocosmos.de](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/)
* [demo.nanocosmos.de (until version 3)](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer3/)

# Release History
* [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)