# NanoPlayer - Release Overview

## Please find more about the **stream switching & ABR** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_switching/).

# [4.6.1]

## Release Notes

By enabling the `source.options.switch.forcePlay` config property a paused playback starts after the execution of a 'switchStream' or 'updateSource' request. This obviates the need for an additional play call.
To improve the overall switching behavior paused switch completion has been added, meaning a pending 'switchStream' or 'updateSource' request will be completed as the player enters the paused state. 
The related completion event either 'switchStreamSuccess' or 'updateSourceSuccess' will be emitted to the application level.

This version prevents an occasional CPU load issue on Firefox.
To provide additional information to the client metrics the new public event 'onServerInfo' has been added.
Version 4.6.1 implements an updated version of the Bintu-Client API internally.

## Changelog

### Added

- paused switch completion to complete pending 'switchStream' or 'updateSource' request as player enters paused state
- public event 'onServerInfo'

### Improved

- `source.options.switch.forcePlay` config property starts a paused playback after 'switchStream' or 'updateSource' request execution
- prevent an occasional CPU load issue on Firefox
- implement updated version of Bintu-Client API

## Release Package 4.6.1

* [4.6.1](https://files.nanocosmos.de/index.php/s/JXEBqGBFzSNSpS4)
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