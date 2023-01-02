# **NanoPlayer - Release Overview**

## **[4.19.2]**

### **Release Notes**

This version is introducing improvements for error handling and automatic recovery on iOS.
Playback interruptions in context of stream switches in iOS low power mode have been fixed.
Furthermore robustness for fullscreen handling in multi-player use cases has been increased.
The improvement for classic playback on iOS 15 to avoid buffer impacts after adjusting latency has now been applied for iOS 16 as well.
This was introduced in version 4.15.0.

### **Changelog**

### Improved

- automatic error recovery during an ongoing stream switch on iOS
- playback speed ~1.0 on iOS 16 as standard to reduce rebuffering effects after latency adjustment

### Fixed

- playback interruptions in context of stream switches in iOS low power mode
- fullscreen handling with multiple player instances
- unreasoned configuration warnings for event handlers `onServerInfo` and `onFullscreenChange`
- added fields `id`, `player`, `version`, `state` in `onFullscreenChange` event object

### **Release Package 4.19.2**

- [4.19.2](https://files.nanocosmos.de/index.php/s/83fx5sKmpeE7M3X)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
