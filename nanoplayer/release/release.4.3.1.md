# NanoPlayer - Release Overview

## Please find more about the **stream switching & ABR** feature in our [documentation]( https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_switching/).

# [4.3.1]

## Release Notes

This version introduces the 'setAdaption' API to switch between adaption rules (ex. enable/disable ABR). 
Furthermore, this version implements optimizations for the ABR feature and minor internal, config and metrics adjustments. Additionally, this version prevents non-critical console errors during initialization and fixes a timeout error during client-side switchStream/updateSource.

Please find more about setAdaption API [here](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/NanoPlayer.html#setAdaption__anchor).

## Changelog

### Added

- 'setAdaption' API:
 - use to switch between adaption rules (ex. enable/disable ABR)

### Improved

- ABR:
 - initial switch up for oscillating source streams
 - handle continuous buffering events
- config:
 - adjust switchStream event registration
 - enable bintu multi-stream configuration
- minor metrics improvement
- prevent non-critical console errors during initialization in 'hidden' state

### Fixed

- timeout error during client-side switchStream/updateSource

## Release Package 4.3.1

* [4.3.1](https://files.nanocosmos.de/index.php/s/Z75fwAckaDdDZDG)
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