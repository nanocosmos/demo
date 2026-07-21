# **NanoPlayer - Release Overview**

## Please find more about the **MoQ playback mode** feature in our [documentation](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_feature_moq/)

## For easy-to-use migration follow our [guide](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_v5_migration_guide)

## **[5.0.11]**

### **Release Notes**

This release focuses on improvements for MoQ playback mode, enabling unmuted audio playback when the iOS silent switch/mode is active and speeding up the initial ABR switch-up.

### **Changelog**

### Added

- option to keep audio playing in MoQ playback mode when the iOS silent switch/mode is enabled
  - controlled via configuration option `playback.manageAudioSessionType`, enabled by default
  - ensures the underlying `AudioSession.type` is set to either `playback` or `play-and-record` so audio continues when the iOS silent switch/mode is active

### Improved

- faster initial ABR switch-up in MoQ mode

### **Release Package 5.0.11**

- [5.0.11](https://files.nanocosmos.de/index.php/s/nWyiEetsrrZ6LKF)
- [latest 5.x](https://files.nanocosmos.de/index.php/s/y4e2axW7s8qEtJb)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.net](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_release_history)