# **NanoPlayer - Release Overview**

## Please find more about the **stream group configuration** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_group_configuration/).

## Please find more about **secure playback with JWT** in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_token_security/).


## **[4.18.0]**

### **Release Notes**

This version is introducing two new features.

Utilizing the new bintu stream group feature, it is now possible to configure an entire set of ABR streams
by passing only the corresponding bintu stream group id via the player source configuration.
This allows a much easier configuration for ABR playback.
All existing options that are part of the configuration remain unchanged.

Please find more about the **stream group configuration** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_group_configuration/).

Furthermore, this version is adding support for the new secure playback using JSON Web Token (JWT).
The new token type can contain playback permissions for one or more stream names.
This way a single token can be used for all secure use cases.
It can be applied with the current `entries` configuration and with the new `group` configuration.

Please find more about **secure playback with JWT** in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_token_security/).

Since this version, the nanoStream Player will not attempt to autoplay non live streams configured via bintu stream ID or bintu group ID after the `setup` call.
Instead it will pause with reason `'sourcestreamstopped'` and emit the error event 2004 with message `'The source stream has been stopped.'`.
This will enable the nanoStream Player to properly initialize in the setup method and allow users to reattempt playback 
even if the stream was not in `live` state at the time of the initialization.

### **Changelog**

### Added

- stream group configuration via `config.source.group` object
  - see [feature](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_group_configuration/) description
- support for secure playback using JSON Web Token (JWT)
  - see [feature](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_token_security/) description

### Improved

- player setup with bintu stream ID or bintu group ID if the stream in not `live`

### **Release Package 4.18.0**

- [4.18.0](https://files.nanocosmos.de/index.php/s/HwdoADroF3QAc5s)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Feature Description**

- [stream group configuration](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_group_configuration/)

- [secure playback with JWT](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_token_security/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
