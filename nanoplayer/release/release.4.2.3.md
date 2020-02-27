# NanoPlayer - Release Overview

Please find more about the stream switching & ABR feature in our [documentation]( https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_switching/).

# [4.2.3]
 
## Release Notes

This version handles a timestamp offset caused by stream switching to make correct time operations.

## Changelog

### Fixed

- note timestamp offset after stream switch

# [4.2.2]

## Release Notes

This version comes with further ABR and internal improvements and also corrects switch related parts.

## Changelog
 
### Improved

- ABR suggestion performance
- overall internal optimizations

### Fixed

- always set new connection when updating source with new server
- correct error object on initialization error when updating source

# [4.2.1]
 
## Release Notes
 
This version communicates additional switchStream and updateSource API related data to the metrics service.
Furthermore, the ABR prediction cycle is improved to reduce load.
 
## Changelog
 
### Improved
 
- additional switchStream and updateSource API event data to metrics
- optimize ABR prediction cycle

# [4.2.0]

## Release Notes

This version implements the communication of switchStream and updateSource API events and data to the metrics service. 
In addition the internal 'streamInfo' event flow is improved and detailed stream information propagated through the event object.

Please find more about the stream switching & ABR feature in our [documentation]( https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_switching/).

## Changelog

### Added

- communication of switchStream and updateSource API events and data to metrics service

### Improved

- internal 'streamInfo' event flow optimized 
- propagate additional stream information with 'streamInfo' event

# [4.1.4]

## Release Notes

This version contains a fix for an buffering state error on iOS if static buffer tweaks are set. Now higher 'min' values doesn't lead into unrecoverable buffering.

## Changelog

### Fixed

- handle higher buffer tweak 'min' values in buffercontrol

# [4.1.3]

## Release Notes

This version implements a fix for an �Unhandled Promise Rejection� error on iOS in the context of play/pause and updateSource/switchStream interactions. Furthermore, this version fixes a bug on MacOSX Mojave during buffer underrun where the playing state is not changed to �buffering� which then breaks the playback.

## Changelog

### Fixed

- �Unhandled Promise Rejection� error on iOS during play/pause and updateSource/switchStream interactions
- correctly detecting buffer underrun for MacOSX Mojave bug

# [4.1.2]

## Release Notes

This version implements a fix to support the regular config as well as an adaptive config to setup the player.

## Changelog

### Fixed

- config assemble during player setup 

# [4.1.1]

## Release Notes

This version implements fixes to support the initial switchUp on iOS devices.

## Changelog

### Fixed

- handle pause reason 'playbackrestart' differently to fix initial switchUp on iOS 
- set prediction block during initial switchUp

# [4.1.0]

## Release Notes

This version introduces adaptive bitrate (ABR) playback where the player switches between a set of streams with different qualities to accommodate challenging network situations and avoid buffering and frame drops.
A set of stream sources (entries) is expected inside the 'entries' array of the config's 'source' object. Each entry represents an indexed quality step starting with the highest quality at index 0. The 'startIndex' property sets the entry that should be used for inializing the playback.
The config's 'source' object now holds an 'options' object to set the ABR 'rule' (algorithm) inside the 'adaption' object and the switch options inside the 'switch' object.
To manually switch between entries the new 'switchStream' API is used which comes along with 4 new public events and error codes.

Please find more about the stream switching & ABR feature in our [documentation]( https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_switching/).

## Changelog

### Improved

- config object:
    - entries: keeps a set of indexed stream sources which represent a quality step
    - options: 
        - adaption: set ABR rule
        - switch: set switch settings
    - startIndex: sets the entry used for inializing the playback
- 'switchStream' API:
  - use to switch between entries
  - new public events: 'onSwitchStreamInit', 'onSwitchStreamSuccess', 'onSwitchStreamAbort' and 'onSwitchStreamFail'
  - new error code:  
    - 1010: in case an invalid entry index is given as parameter over 'switchStream'
- 'updateSource' API: 
  - use to set a new source (ex. with different entries, adaption/switch options)
  - the updateSource method now uses the switch options set inside the config's source object instead of the parameters supplied via the method call

## Release Package 4.2.3

* [4.2.3](https://files.nanocosmos.de/index.php/s/2ZNrB785oJo9tgd)
* [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
* [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

# Documentation

* [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)
* [demo.nanocosmos.de](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/)
* [demo.nanocosmos.de (until version 3)](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer3/)

# Feature Description

* [stream switching & ABR]( https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_switching/)

# Release History

* [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)