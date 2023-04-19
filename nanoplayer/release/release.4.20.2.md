# **NanoPlayer - Release Overview**

## Please find more about the **media error recovery** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_media_error_recovery/)

## **[4.20.2]**

### **Release Notes**

This version is adding further improvements for error handling and automatic recovery on iOS.
The improvements include detection and automatic recovery in cases of stalled video playback due to
decoding issues and in cases of buffering errors that could formerly lead to playback stopping.
For further informations see the [feature description](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_media_error_recovery/) for media error recoveries
and the `errorcode` [definitions](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api#nanoplayererrorcode--codenumbercode) in the documentation.

Another improvement is related to `updateSource` API calls made during LOADING state.
Until now, `updateSource` API calls made during LOADING state could run into a loading timeout,
especially if initiated late in the loading phase. This will now be prevented by removing
the loading timeout in case of an `updateSource` API call during LOADING state.

The current playback time values in `onStats` events are now increasing continuously without setbacks
after stream switches and error recoveries on iOS to be consistent with other platforms.

Furthermore an issue related to failing rejections of unmuted autoplay on iOS has been fixed.
The issue has been introduced in version 4.19.

### **Changelog**

### Added

- detection and automatic recovery of stalled video playback due to decoding issues on iOS
  - related error: `3005` - `'An error occurred while hls playback when decoding video.'`
- detection and automatic recovery of buffering errors on iOS
  - related error: `3101` - `'An error occurred while buffering on hls playback.'`
- see `errorcode` [definitions](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api#nanoplayererrorcode--codenumbercode)
- see [feature](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_media_error_recovery/) description

### Improved

- timeout handling in case of `updateSource` API calls during LOADING state
- current playback time monotonically increasing after stream switches and recoveries on iOS

### Fixed

- failing rejections of unmuted autoplay on iOS

### **Release Package 4.20.2**

- [4.20.2](https://files.nanocosmos.de/index.php/s/baEMfHw22Ptsoyr)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
