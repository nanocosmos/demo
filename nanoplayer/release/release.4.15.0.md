# **NanoPlayer - Release Overview**

## **[4.15.0]**

### **Release Notes**

This version is adding improvements for ABR playback. It implements a cooldown mechanism to control the next up-switch.
Too frequent up- & down-switches will be prevented. This improves the user experience especially in case of slight but frequent buffer impacts e.g. in case of limited network ressources.
Furthermore this release includes an improvement for classic playback on iOS 15 to avoid buffer impacts after adjusting latency.
Also the visual switching behaviour on iOS has been improved to prevent a possible black frame effect.

### **Changelog**

### Added

- ABR upswitch cooldown mechanism to avoid too frequent up- & down-switches in certain scenarios

### Improved

- playback speed ~1.0 on iOS 15 as standard to reduce rebuffering effects after latency adjustment
- z-index only for video element switch on iOS to avoid black frame effect

### **Release Package 4.15.0**

- [4.15.0](https://files.nanocosmos.de/index.php/s/H72dYkCwiP7Zj7r)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
