# **NanoPlayer - Release Overview**

## **[4.9.2]**

### **Release Notes**

This version comes with several small improvements and fixes. An infinite loop related to error code `1004` is now prevented. It occurred if play or pause was triggered before the player setup was finished. This non-critical error `1004` has been changed now to a warning. Further providing the correct Mac OS X version for player metrics has been improved and a wrong detection of unsupported Chromium browsers on Mac OS X has been fixed (introduced in 4.9.1). Also an error on iOS with the `keepConnection` option enabled has been fixed.

For the view a small fix for the style option `config.style.audioPlayer` related to the displayed height on mobile devices has been done.

### **Changelog**

### Improved

- change non-critical error `1004` to warning `"A pause call has been ignored since the player has not been set up successfully."`
- provide correct Mac OS X version to player metrics
- correct player height on mobile devices if `config.style.audioPlayer` set to `true`

### Fixed

- prevent infinite loop related to error code `1004` in case of play/pause before player is ready
- unsupported browser detection for Chromium on Mac OS X if codecs not present (introduced in 4.9.1)
- playback starts on iOS with `config.playback.keepConnection` set to `true`

### **Release Package 4.9.2**

- [4.9.2](https://files.nanocosmos.de/index.php/s/5rZ7Bko2dcWZM4L)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
