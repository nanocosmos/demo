# **NanoPlayer - Release Overview**

## Please find more about the **fast playback start** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_fast_start/)

## **[4.22.2]**

### **Release Notes**

This release introduces crucial improvements and fixes to elevate your streaming experience. We have addressed issues that had impacted playback on iOS devices, ensuring a smoother experience across various scenarios. This update focuses on improving playback latencies, stream switch buffering on iOS, fullscreen layout issues, and occasional exceptions during player destruction on iOS.

### **Changelog**

### Improved

- preventing higher playback latencies of some webrtc ingest streams that show frequent resolution adaptions

### Fixed

- randomly occurring issue that could lead to repeated buffering after stream switches on iOS
- fullscreen layout issue after entering fullscreen mode more than one time
  - affected screens with display ratios higher/wider than the player including mobile landscape orientation
  - the bottom of the video was partially out of the display area
  - (the issue has been introduced in v4.22.0)
- non critical exception occurring occasionally during `player.destroy` on iOS

### **Release Package 4.22.2**

- [4.22.2](https://files.nanocosmos.de/index.php/s/2LNiXaetkw8wzB3)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
