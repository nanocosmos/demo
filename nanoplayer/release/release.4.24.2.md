# **NanoPlayer - Release Overview**

## **[4.24.2]**

### **Release Notes**

This patch release addresses an autoplay issue occurring when the application called `player.unmute()` without user interaction context. This issue could result in black frames or errors during playback start if unmuted playback was not permitted. Further we enhanced the smoothness of stream switches specifically in H5Live-HLS mode, providing a better viewing experience for users.

### **Changelog**

### Fixed

- autoplay issue in case of application calling `player.unmute()` without user interaction context that could lead to black frames or errors during playback start if unmuted playback was not permitted

### Improved

- smoothness during stream switches in H5Live-HLS mode

### **Release Package 4.24.2**

- [4.24.2](https://files.nanocosmos.de/index.php/s/457mNxNanLn6WAZ)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_release_history)
