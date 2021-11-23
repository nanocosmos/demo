# **NanoPlayer - Release Overview**

## Please find more about the **source defaults** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_source_defaults/).

## **[4.13.1]**

### **Release Notes**

This version includes a patch regarding the player's `style.scaling` configuration and `updateSource`. If `style.scaling` is set to a different value as default `'letterbox'` e.g. `'crop'` or `'fill'`
this setting will now always be preserved during an `updateSource` call.
Before the player styling was
falling back to default values after an server-side updateSource call if the new target stream name
and the previous stream name were the same.
Further an issue with `updateSource` in `PAUSED` state with `source.options.switch.forcePlay` set to `false` and ABR enabled is solved, preventing unintended switching in `PAUSED` state.

### **Changelog**

### Fixed

- `style.scaling` with non-default value will be preserved during `updateSource` with server-side switch to the same stream
- initial switch up interval with ABR configured `source` will be prevented from starting in `PAUSED` state

### **Release Package 4.13.1**

- [4.13.1](https://files.nanocosmos.de/index.php/s/yd9Py2zznJqJL68)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Feature Description**

- [source defaults](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_source_defaults/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
