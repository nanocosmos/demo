# **NanoPlayer - Release Overview**

## Please find more about the **media error recovery** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_media_error_recovery/)

## **[4.11.0]**

### **Release Notes**

This version is adding improvements to the fullscreen mode in general
and in particular for iOS.  

The player background color can now be customized for standard and
fullscreen mode separately via the new configuration parameter
`config.style.fullScreenBackgroundColor`. The default value
is the standard background color `config.style.backgroundColor`.

The following improvements to the fullscreen mode have been added for iOS Safari and Chrome

- Preventing the page body from becoming visible during orientation changes and zoom gestures
- The fullscreen background color will be applied to the notch areas present on iPhone X/11/12
- Improved up/down swipe handling to hide/show browser address bars
- Improved layout calculation in Chrome iOS
- Restoring the initial page scroll position when exiting fullscreen mode
- Player borders will be hidden in fullscreen mode

### **Changelog**

### Added

- separate fullscreen background color parameter `config.style.fullScreenBackgroundColor`

### Improved

- fullscreen appearance in Safari and Chrome iOS
  - preventing the page body from becoming visible during orientation changes and zoom gestures
  - the fullscreen background color will be applied to the notch areas present on iPhone X/11/12
  - improved up/down swipe to hide/show browser address bars
  - layout calculation in Chrome iOS
  - restoring the initial page scroll position when exiting fullscreen mode
  - player borders will be hidden in fullscreen mode

### Fixed

- script error in nanoplayer-multi demo page

### **Release Package 4.11.0**

- [4.11.0](https://files.nanocosmos.de/index.php/s/AtDJx9DdpZ7pPT7)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### Feature Description

- [media error recovery](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_media_error_recovery/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
