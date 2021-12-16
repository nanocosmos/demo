# **NanoPlayer - Release Overview**

## Please find more about the **source defaults** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_source_defaults/).

## **[4.13.2]**

### **Release Notes**

This version provides an improvement for iOS metadata processing. The new mode is preventing occasionally delayed metadata on iOS and is enabled by default.
To go back to legacy mode it can be disabled by setting the new parameter `config.playback.metadataLowDelay` to `false`.
Also an issue with changing the metadata connection at stream switch on iOS with switch method `'client'` has been solved.
Further this patch includes a fix for a potential css related layout issue in iOS fullscreen mode.

### **Changelog**

### Improved

- modified metadata processing to prevent occasionally delayed metadata on iOS
  - can be disabled via new parameter `config.playback.metadataLowDelay` set to `false`
  - default: `true`

### Fixed

- change metadata connection on iOS at stream switch with switch method `'client'`
- prevent iOS fullscreen layout issue by adding `!important` flag to position

### **Release Package 4.13.2**

- [4.13.2](https://files.nanocosmos.de/index.php/s/w4BRJmsqAKEZmQe)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Feature Description**

- [source defaults](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_source_defaults/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
