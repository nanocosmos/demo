# NanoPlayer - Release Overview

## Please find more about the **stream switching & ABR** feature in our [documentation]( https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_switching/).

# [4.4.3]

## Release Notes

This version implements seamless stream switching for iOS and iPadOS devices which works with 2 video elements internally. 
In special use cases where existing video tags should be used for playback an array of maximal two element Ids can be provided via the `playback.videoId` config property. 
Additionally, this version adjusts the default timeout for the update source request to 20 seconds to improve the overall switching behavior. Furthermore, the `style.displayMutedAutoplay` config property is re-enabled which shows a muted audio symbol in case of muted autoplay. 
The `style.displayMutedAutoplay` option can be disabled to maintain the recent behaviour. 


## Changelog

### Added

- seamless stream switching for iOS devices

### Improved

- iOS & iPadOS seamless stream switching  needs 2 video elements internally. So for special use cases where existing video tags need to be used for playback an array of maximal two element Ids can be provided via the `playback.videoId` config property (NOT mandatory)
  - if 0 Ids are provided 2 video elements will be created internally
  - if 1 Id is provided the other video element will be created internally
- set the default timeout for the update source request to 20 seconds to improve the overall switching behavior 
  - can be configured via the `source.options.switch.timeout` config property (we advise to use default value)
- re-enabled `style.displayMutedAutoplay` config property to show a muted audio symbol in case of muted autoplay

## Release Package 4.4.3

* [4.4.3](https://files.nanocosmos.de/index.php/s/Btn88GAoGic57Sg)
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