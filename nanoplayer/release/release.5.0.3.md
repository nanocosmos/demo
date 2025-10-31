# **NanoPlayer - Release Overview**

## Please find more about the **MOQ playback mode** feature in our [documentation](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_feature_moq/)

## For easy-to-use migration follow our [guide](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_v5_migration_guide)

## **[5.0.3]**

### **Release Notes**

This release includes fixes for loading timeout behavior and fast-start buffer management, along with improved screen wake behavior on mobile devices. The loading timeout now properly resets when updating sources during the loading state. Separately, fast-start buffer requests are now prevented during playback to avoid unnecessary buffering. Additionally, mobile devices will stay active during MOQ mode playback, with screen dimming and locking disabled by default through the new playback.enableWakeLock setting.

### **Changelog**

### Fixed

- loading timeout is now correctly reinstated after updateSource is called in the loading state.
- prevent fast-start buffer from being requested by updateSource while in the playing state.

### Improved

- mobile devices no longer dim or lock the screen during playback in MOQ mode, ensuring consistent behavior across browsers and playback modes.
    - controlled via playback.enableWakeLock (default: enabled)

### **Release Package 5.0.3**

- [5.0.3](https://files.nanocosmos.de/index.php/s/tb2aX3H6CjCTBNw)
- [latest 5.x](https://files.nanocosmos.de/index.php/s/y4e2axW7s8qEtJb)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.net](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://docs.nanocosmos.net/docs/nanoplayer/nanoplayer_release_history)
