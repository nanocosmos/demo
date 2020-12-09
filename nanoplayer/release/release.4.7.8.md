# NanoPlayer - Release Overview

## Please find more about the **fullscreen API** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_fullscreen_api/).

# [4.7.8]

## Release Notes

This version patches minor issues. One patch addresses a compatibility issue with angular zone.js. The other one improves the behaviour of internal iframe handling on iOS in case of unavailability.

## Changelog

### Improved

- check for WebSocket event listener manipulation, use default 'on' syntax internally
- improved internal iframe handling on iOS in case of unavailibility

# [4.7.6]

## Release Notes

This version implements minor internal improvements for config validation and playback start.
It also contains a fix related to playback suspension on iOS devices running Safari with activated desktop mode.

Furthermore, the default overlay controls are displayed properly on smaller screen widths.

## Changelog

### Improved

- config validation and playback start
- playback suspension on iOS devices and Safari with activated desktop mode
- display of default overlay controls on smaller screen widths

# [4.7.1]

## Release Notes

This version implements the fullscreen API which enables to request and exit the player's fullscreen mode. The new public event 'onFullscreenChange' indicates that the fullscreen mode has been changed.

The animations and icons in the center of the player can now be independently enabled or disabled by setting the new `style.centerView` config property to either true or false.

## Changelog

### Added

- fullscreen API
  - new public methods: 'requestFullscreen()' , 'exitFullscreen()'
  - new public event: 'onFullscreenChange'
- enable / disable animations and icons in the center of the player independently with `style.centerView` config property

## Release Package 4.7.8

* [4.7.8](https://nextcloud.nanocosmos.de/index.php/s/QCwfjNbEgggNBeF)
* [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
* [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

# Documentation

* [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)
* [demo.nanocosmos.de](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/)
* [demo.nanocosmos.de (until version 3)](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer3/)

# Feature Description

* [fullscreen API](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_fullscreen_api/)

# Release History

* [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html) 