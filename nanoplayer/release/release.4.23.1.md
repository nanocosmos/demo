# **NanoPlayer - Release Overview**

## Please find more about the **latency control modes** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_latency_control_modes/)

## **[4.23.1]**

### **Release Notes**

In this latest release, we're exited to introduce enhanced playback support through the Managed Media Source API (MMSE) for iOS 17.1 and above. By default, this feature provides an upgraded media playback experience in line with desktop and Android platforms, resulting in improved latency, faster start-up times, and an overall enhanced user experience. In the event that MMSE API is unsupported or disabled, H5live-HLS will seamlessly take over on iOS.

Moreover, we've expanded support for the latency control mode `balancedadaptive` across all iOS versions. This empowers users to achieve lower latency while ensuring a smooth playback experience on iOS devices. For more detailed information, refer to our comprehensive feature description in the [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_latency_control_modes#v4231).

Additionally, this version includes a general enhancement to buffer and latency control for H5live-HLS playback on iOS. These improvements contribute to an even more refined and optimized playback experience.

### **Changelog**

### Added

- support for playback via Managed Media Source API (MMSE) on iOS 17.1 and higher
  - media playback workflow similar to desktop and Android
  - replacing h5live-HLS
  - improving: latency, start-up time, general UX
- support for playback with latency control mode `balancedadaptive` on iOS (all versions)
  - configuration fallback from `fastadaptive` to `balancedadaptive` mode
  - improving: latency (control)

### Improved

- buffer and latency control on iOS (all versions)
  - workflow similar to desktop and Android
  
### Fixed

- false positive `warning` event related to `switch.method` configuration on iOS
- reconnect behaviour in `keepConnection` mode
- adaptive bitrate control after error recovery on iOS
- redundant adaptive bitrate control down step attempts

### **Release Package 4.23.1**

- [4.23.1](https://files.nanocosmos.de/index.php/s/R6p8gKXJDirMDRd)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
