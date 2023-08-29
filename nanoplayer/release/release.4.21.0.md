# **NanoPlayer - Release Overview**

## Please find more about the **media error recovery** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_media_error_recovery/)

## **[4.21.0]**

### **Release Notes**

This release brings a range of enhancements and fixes to improve your experience. We have made adjustments to iOS buffer control to ensure best performance with iOS 17.
All metrics events now include an event counter and an indication of `Document.visibilityState` to provide deeper insights into user interactions.
Furthermore we've worked on enhancing iOS playback recovery. In case of network interruptions or degradations, the iOS playback will be recovered more smoothly.
An issue has been resolved that previously led to a false positive `PLAYING` state on iOS during network interruptions. This will result in more accurate playback status representation.
In addition we've addressed an issue that could occasionally lead to an incomplete or empty `stats` object in the `onPlay` event.

### **Changelog**

### Added

- iOS 17 related adjustment in iOS buffer control
- indication of `Document.visibilityState` in all metrics events
- event counter in all metrics events

### Improved

- iOS playback recovery in case of network interruptions or degradations

### Fixed

- prevent false positive `playing` state in case of iOS network interruptions
- issue that could cause an incomplete or empty `stats` object in the `onPlay` event

### **Release Package 4.21.0**

- [4.21.0](https://files.nanocosmos.de/index.php/s/Wkfr4Egf5F3JCcE)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
