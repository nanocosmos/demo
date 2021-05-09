# **NanoPlayer - Release Overview**

## Please find more about the **media error recovery** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_media_error_recovery/)

## **[4.10.5]**

### **Release Notes**

This version provides a fix for an error related to the player view.
The issue occured in case of a rejected setup call or if 
the `config.playback` object was not defined in the configuration.
The player view is enabled by default (`config.style.view=true`).

### **Changelog**

### Fixed

- prevent view initialization error in case of:
  - setup call rejection with error `5xxx`
  - undefined `config.playback` object

### **Release Package 4.10.5**

- [4.10.5](https://files.nanocosmos.de/index.php/s/3Pb5f56tGbM3ym6)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### Feature Description

- [media error recovery](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_media_error_recovery/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
