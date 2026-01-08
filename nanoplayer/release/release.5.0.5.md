# **NanoPlayer - Release Overview**

## Please find more about the **MOQ playback mode** feature in our [documentation](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_feature_moq/)

## For easy-to-use migration follow our [guide](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_v5_migration_guide)

## **[5.0.5]**

### **Release Notes**

This update resolves a slight audio delay in MOQ playback that could gradually become noticeable after repeated stream switches and improves the robustness of `config.general.serverDomain` parsing for edge cases. In addition, `onReady` metrics have been improved, and an inconsistency in error emission for malformed or missing source configurations has been fixed.

### **Changelog**

### Fixed

- slight audio delay in MOQ playback that could gradually become noticeable after repeated stream switches
- ensure a dedicated error with code 5004 is emitted consistently when the source configuration is missing or incomplete

### Improved

- metrics for the `onReady` event
- robustness of `config.general.serverDomain` parsing for edge cases

### **Release Package 5.0.5**

- [5.0.5](https://files.nanocosmos.de/index.php/s/ysC6C7ZJ2T9niQy)
- [latest 5.x](https://files.nanocosmos.de/index.php/s/y4e2axW7s8qEtJb)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.net](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_release_history)
