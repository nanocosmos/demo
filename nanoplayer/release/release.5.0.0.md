# **NanoPlayer - Release Overview**

## Please find more about the **MoQ playback mode** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_moq/)

## For easy-to-use migration follow our [guide](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_v5_migration_guide)

## **[5.0.0]**

### **Release Notes**

### BREAKING CHANGE

This major release introduces Media over QUIC (MoQ) playback, bringing next-generation streaming with ultra-low latency and real-time playback powered by modern web technologies like QUIC and WebCodecs. This unlocks smoother, more interactive streaming experiences while still maintaining full compatibility with proven playback modes such as WebSocket/MSE and H5Live-HLS.
Playback control has also been improved. You can now set the player volume directly at startup, and the player performs smarter connection checks to ensure QUIC compatibility before playback begins.
We have optimized the default settings to deliver faster startup times, lower latency, and more reliable adaptive streaming. When multiple quality levels are available, the player will automatically use adaptive bitrate (ABR).
Finally, we have cleaned up outdated and rarely used features. Flash player and legacy iOS<=9 native-HLS fallback modes have been removed, configuration options have been simplified, and older scaling modes have been retired to ensure a more consistent playback experience.

### **Changelog**

### Added

- Media over QUIC transport and playback mode
  - utilizing the benefits of latest web technologies including WebTransport/QUIC and WebCodecs
  - pushing the boundaries of interactive real-time streaming
  - keeping full support of production proven playback modes using WebSocket/MSE and H5Live-HLS

- new config setting `playback.enableMediaOverQuic`
  - enabling/disabling the new MoQ playback mode
  - `true`/`false`, default: `true`

- new config setting `playback.enableQuicConnectionProbe`
  - enabling/disabling performing a connection probe at setup call to test WebTransport/QUIC connectivity
  - `true`/`false`, default: `true`

- new config setting `playback.volume`
  - enabling setting the player's volume directly at setup call
  - range between `0.0` and `1.0`, default: `1.0`

### Changed

- default values for improved performance and usability
  - `config.playback.latencyControlMode`: from `"classic"` to `"balancedadaptive"`
  - `config.playback.automute`: from `false` to `true`
  - `config.playback.faststart`: from `false` to `true`
  - `source.startIndex`: from `0/highest` to `n-1/lowest`
  - `source.options.adaption.rule`: from `"none"` to `"deviationOfMean2"`
    - enabling ABR playback if more than one stream/entry is available

### Removed

- flash player fallback mode
- native hls fallback mode (iOS version <= 9)
- deprecated single source configuration via `config.source.h5live` object
  - remaining valid source configurations are `config.source.group` and `config.source.entries`
- scaling modes `"resize"` and `"original"`

### **Release Package 5.0.0**

- [5.0.0](https://files.nanocosmos.de/index.php/s/WoGxRiPCNTq5B2W)
- [latest 5.x](https://files.nanocosmos.de/index.php/s/y4e2axW7s8qEtJb)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_release_history)
