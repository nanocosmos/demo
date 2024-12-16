# **NanoPlayer - Release Overview**

## **[4.29.0]**

### **Release Notes**  

This release introduces a new configuration option for adaptive bitrate (ABR) setups.

You can now omit specific renditions in ABR configurations using the new `config.source.options.adaption.omitRenditions` parameter. This parameter accepts an `array` of predefined quality identifiers (e.g., `"high"`, `"medium"`, `"low"`) or stream entry indexes (e.g., `0`, `1`, `2`, etc.), providing greater flexibility in tailoring adaptive bitrate playback.

Additionally, an issue affecting the `config.source.options.adaption.downStep` value in group configurations has been resolved, ensuring proper functionality.

These updates enhance flexibility and reliability in ABR setups.

### **Changelog**

### **Added**

- introduced an option to omit specific renditions in ABR multi-stream configurations via Bintu stream group or entries:
  - new parameter: `config.source.options.adaption.omitRenditions` (type: `array`)
  - accepted values include predefined quality identifiers (type: `string`) or stream entry indexes (type: `number`):
    - qualities: `"high"`, `"medium-high"`, `"medium"`, `"medium-low"`, `"low"`
    - indexes: `0`, `1`, `2`, etc.
  - see the [feature description](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_switching#advanced-abr-settings) for more details

### **Fixed**

- resolved an issue where the `config.source.options.adaption.downStep` value was not applied correctly when using group configurations

### **Release Package 4.29.0**

- [4.29.0](https://files.nanocosmos.de/index.php/s/Jn3G43zwdQAMi25)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Feature Description**

- [stream switching and abr](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_stream_switching/)

### **Release History**

- [release history](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_release_history)
