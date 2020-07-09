# NanoPlayer - Release Overview

## Please find more about the **stream switching & ABR** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_switching/).

# [4.5.6]

## Release Notes

Version 4.5 implements seamless ABR and stream switching for iOS and iPadOS devices which works with 2 video elements internally. 
In special use cases where external video elements are used for playback an array of maximal two external video element IDs can be provided via the `playback.videoId` config property. 
**Important note:** On iOS devices the default z-index of the video layer had to be changed from 0 to 1. In case of using custom controls or overlays please make sure to use a z-index > 1.

The new ABR mode, adaption rule, 'deviationOfMean2' has been added. The new rule is slightly less strict and especially recommended for streams that are already more volatile on the source/ingest side.  

This version adjusts the default timeout for stream switch request to 20 seconds to improve the overall switching behavior. 

The `style.displayMutedAutoplay` config property is re-enabled which shows a muted audio symbol in case of muted autoplay. 
The `style.displayMutedAutoplay` option can be disabled to maintain the recent behaviour. 
The handling of mute states and autoplay has been improved.

Version 4.5.6 is adding internal improvements for stream swiching and connection handling on iOS.

## Changelog

### [4.5.6]

### Improved

- stability of general stream switching
- validation of buffering metrics
- connection flags setting

### [4.5.2]

### Improved

- minor metrics adjustment

### [4.5.1]

### Added

- seamless ABR and stream switching for iOS and iPadOS devices
- new adaption rule 'deviationOfMean2'

### Improved

- iOS & iPadOS seamless stream switching  needs 2 video elements internally. So for special use cases where existing video tags need to be used for playback an array of maximal two element Ids can be provided via the `playback.videoId` config property (NOT mandatory)
  - if 0 Ids are provided 2 video elements will be created internally
  - if 1 Id is provided the other video element will be created internally
- set the default timeout for stream switch requests to 20 seconds to improve the overall switching behavior 
  - can be configured via the `source.options.switch.timeout` config property (we advise to use default value)
- re-enabled `style.displayMutedAutoplay` config property to show a muted audio symbol in case of muted autoplay
- handling of mute states and autoplay

## Release Package 4.5.6

* [4.5.6](https://files.nanocosmos.de/index.php/s/oAxiYa5eB2N3HeA)
* [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
* [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

# Documentation

* [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)
* [demo.nanocosmos.de](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/)
* [demo.nanocosmos.de (until version 3)](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer3/)

# Feature Description

* [stream switching & ABR](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_switching/)

# Release History

* [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html) 