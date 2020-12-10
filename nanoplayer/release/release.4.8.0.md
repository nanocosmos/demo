# NanoPlayer - Release Overview

# [4.8.0]

## Release Notes

This version introduces a new error code. In case the media element fires an error event without a specifc error code the new player error code '3200' with the message 'An unspecific media error occurred.' will be passed in the 'onError' event. Furthermore a WebSocket prototype polyfill is removed completely. This finally solves a compatibility issue with connection handling with angular/zone.

## Changelog

### Improved

- add new error code '3200' - 'An unspecific media error occurred.'
- removed WebSocket prototype polyfill

## Release Package 4.8.0

* [4.8.0](https://nextcloud.nanocosmos.de/index.php/s/DE2ZZLT28F4qPND)
* [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
* [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

# Documentation

* [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)
* [demo.nanocosmos.de](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/)
* [demo.nanocosmos.de (until version 3)](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer3/)

# Release History

* [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html) 