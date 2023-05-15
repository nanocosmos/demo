# **NanoPlayer - Release Overview**

## Please find more about the **media error recovery** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_media_error_recovery/)

## **[4.20.4]**

### **Release Notes**

This version fixes an issue that occurred when attempting media error recovery immediately after a switch stream fail on iOS. The issue was introduced in version 4.20.2. Additionally, an issue related to the `interactionrequired` error with code `1005` on iOS has been resolved. The `onStreamInfo` event will now be fired correctly before the `onError` and `onPause` events. This problem was introduced with the release of version 4.20.3.

Furthermore, a minor issue regarding the automute feature at delayed play attempts without prior or direct user interaction has been fixed. The same applies to unmute attempts without user interaction during playback, that was started in `muted` state. These attempts will now result in muted playback or, in the case of automute being disabled, in error `1005`.

### **Changelog**

### Fixed

- issue in case of a media error recovery immediately after a switch stream fail
- correct emitting of `onStreamInfo` in case of the error `1005` `interactionrequired` on iOS
- automute behaviour at delayed play or unmute attempts without prior or direct user interaction on iOS

### **Release Package 4.20.4**

- [4.20.4](https://files.nanocosmos.de/index.php/s/jJgLQ3a2n3EXWtB)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
