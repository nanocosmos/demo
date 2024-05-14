# **NanoPlayer - Release Overview**

## **[4.25.0]**

### **Release Notes**

With this release, we've implemented handling for repeated switch stream failures by introducing cooldown functionality, thereby enhancing the robustness of stream switching.
Additionally, we've strengthened access to video elements, ensuring more reliable and stable functionality.
Furthermore, we've resolved issues related to preventing multiple `2004` errors and event order discrepancies when a bintu stream group is not live during setup.
Lastly, we've addressed a random playback error occurring when `keepConnection` was enabled, ensuring a smoother playback experience.

### **Changelog**

### Added

- handling in case of repeated switch stream fails via cooldown functionality

### Improved

- hardening video element access

### Fixed

- redundant `2004` error in case a bintu streamgroup is not live at setup
- random playback error with `keepConnection` enabled

### **Release Package 4.25.0**

- [4.25.0](https://files.nanocosmos.de/index.php/s/9cN3boijG9xDdtG)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_release_history)
