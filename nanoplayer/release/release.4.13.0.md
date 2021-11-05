# **NanoPlayer - Release Overview**

Please find more about the **source defaults** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_source_defaults/).

## **[4.13.0]**

### **Release Notes**

This version introduces the new **source defaults** feature that simplifies the source configuration by adding `defaults.service` to the `config.source` object. If a service is set, the `h5live.server` object and the `h5live.rtmp.url` in each entry can be omitted. In this case defaults will be applied internally. Values for `h5live.server` and/or `h5live.rtmp.url` that are defined explicitly in the entry have priority. The available value for `defaults.service` is `'bintu'` for using the standard **nanoStream Cloud**. See our [docs feature entry](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_source_defaults/) for more information.
Furthermore this release includes improvements in preventing exceptions in case of DOM access restrictions or unreachable DOM elements.
A last change is regarding the metrics module of the player. The minimum value of the `metrics.statsInterval` parameter has been raised to `5` seconds.

### **Changelog**

### Added

- new `config.source` parameter `defaults.service` for simplifying configuration if the standard nanoStream Cloud is used

### Improved

- handling of DOM access restrictions or unreachable DOM elements

### Changed

- minimum value of `metrics.statsInterval` set from `1` to `5` seconds

### **Release Package 4.13.0**

- [4.13.0](https://files.nanocosmos.de/index.php/s/8GRnENpnSacrPfQ)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Feature Description**

- [source defaults](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_source_defaults/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
