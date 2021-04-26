# **NanoPlayer - Release Overview**

## Please find more about the **media error recovery** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_media_error_recovery/)

## **[4.10.4]**

### **Release Notes**

This version implements an automatic recovery workflow for certain media errors that can occure during playback. Recoverable errors are `3003`, `3100` and `1008`.
The allowed number of recoveries within 60 seconds (default: `3`) can be customized by the new config parameter `playback.mediaErrorRecoveries`.
Further the support of the native HTMLMediaElement attribute `crossOrigin` is added and can be set via the new config parameter `playback.crossOrigin`.
The values can be `'anonymous'`, `'use-credentials'` and `'not-set'` (default).

Part of this release are minor adjustments for metrics and an improvement of the Mac OS version detection.
Also an issue with the interaction of the `style.keepFrame` and the `style.poster` (since 4.9.1) functionality is fixed.
Now after a pause the last frame will be kept instead of displaying the poster image with `keepFrame` enabled.

### **Changelog**

### Added

- automatic recovery workflow for media errors
  - recoverable error codes:
    - `3003` (media decode error)
    - `3100` (media source ended)
    - `1008` (hls playback error)
  - new config parameter (number) `playback.mediaErrorRecoveries`, default: `3`, to set the number of max recoveries within 60 seconds
  - recoveries will be indicated by an [`onWarning`](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api#onwarning) event
  - sample warning message:
    - `'Recovering from media error 3003, recovery 1/3 within the last 60 seconds (12 total).'`
  - if threshold reached the error will be thrown followed by a pause with reason `'playbackerror'`
  - see playback section in [config](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api#nanoplayerconfig--codeobjectcode)
  - see [feature description](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_media_error_recovery/)
- support of native `crossOrigin` attribute for HTMLMediaElements (applies to all player-internal video & image elements)
  - new config parameter (string) `playback.crossOrigin`, default: `'not-set'`
  - sets or disables the native "crossOrigin" attribute for all internal video elements and images (poster)
  - possible values are:
    - `'anonymous'`
    - `'use-credentials'`
    - `'not-set'` (default), if used the attribute will not be added
  - see playback section in [config](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api#nanoplayerconfig--codeobjectcode)

### Improved

- minor adjustment for metrics
- Mac OS version detection

### Fixed

- keepFrame functionality while poster is set (Note: keepFrame is not supported on iOS)

### **Release Package 4.10.4**

- [4.10.4](https://files.nanocosmos.de/index.php/s/4yWDAN4cR9T2wMx)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### Feature Description

- [media error recovery](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_media_error_recovery/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
