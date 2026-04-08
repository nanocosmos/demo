# **NanoPlayer - Release Overview**

## Please find more about the **MOQ playback mode** feature in our [documentation](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_feature_moq/)

## For easy-to-use migration follow our [guide](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_v5_migration_guide)

## **[5.0.7]**

### **Release Notes**

This release improves layout consistency for playback. When the nanoplayer view is disabled (`style.view: false`), the CSS property `object-fit: contain` was added to the MOQ playback `CanvasElement` to align its default video scaling behavior (aspect ratio preservation and letterboxing) with the `HTMLVideoElement`. All playback modes now display consistently without additional configuration.

### **Changelog**

### Fixed

- default `CanvasElement` behavior for MOQ playback with `style.view: false` adjusted to match `HTMLVideoElement` behavior in MSE/HLS playback, ensuring similar display across all playback modes

### **Release Package 5.0.7**

- [5.0.7](https://files.nanocosmos.de/index.php/s/rPtxztnKxc2efdw)
- [latest 5.x](https://files.nanocosmos.de/index.php/s/y4e2axW7s8qEtJb)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.net](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_release_history)
