# **NanoPlayer - Release Overview**

## Please find more about the **fast playback start** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_fast_start/)

## **[4.22.0]**

### **Release Notes**

This version is introducing the new Fast Start Mode feature that enhances playback start-up times with nanoStream Cloud.
This cutting-edge addition allows you to significantly reduce startup times when initiating playback.
Fast Start Mode can be enabled using the configuration setting `config.playback.faststart`.
Please note that it is disabled by default, so you have full control over its activation.
The unused option `config.source.options.switch.fastStart` has been deprecated.

Furthermore we have improved the Adaptive Bitrate (ABR) initial switch-up behavior in case of degraded network conditions.
In addition, a layout issue that occured after exiting fullscreen mode in Safari 16.5 macOS has been fixed.

### **Changelog**

### Added

- fast start mode feature for improved playback start-up times with nanoStream Cloud
  - can be enabled via boolean `config.playback.faststart`, disabled by default
  - fast start related values in `onStreamInfo` and `onPlay` event

### Improved

- initial ABR switch up behaviour in case of degraded network conditions

### Fixed

- layout issue after exiting fullscreen mode in Safari 16.5 macOS

## Removed

- deprecated unused option `config.source.options.switch.fastStart`

### **Release Package 4.22.0**

- [4.22.0](https://files.nanocosmos.de/index.php/s/yMLjK43fsnHotwe)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
