# **NanoPlayer - Release Overview**

## **[4.12.0]**

### **Release Notes**

This version is adding the option to configure the minimum number steps during an ABR initialized switch down via the `adaption.downStep` parameter. Potential related use case are configurations containing a higher number of qualities or configurations with rather close rendition bitrates.
The detection of the available buffer time has been improved for iOS in general and iOS 15 in particular.
A timing related condition that could lead to buffering after a stream switch has been fixed.
The start-buffer calculation in `bufferDynamic` mode has been fixed to prevent out of range values.
Assigning `null` values to non mandatory configuration parameters will no longer lead to a setup error.

### **Changelog**

### Added

- new option `config.source.options.adaption.downStep`
  - for ABR automatic 'deviationOfMean' and 'deviationOfMean2' only
  - allows to define the minimum number of steps during a ABR initialized down switch via the `adaption` object
  - if the number of remaining lower renditions is smaller than the value then the switch will be performed to the lowest rendition
  - default value is `1`
  - e.g.:

    ````javascript
    "adaption": {
        "rule": "deviationOfMean2",
        "downStep": 2
    }
    ````

### Improved

- detection of the available buffer time for iOS in general and iOS 15 in particular
- config warning message in case of wrong configured properties of an entry

### Fixed

- timing related condition that could lead to buffering after a stream switch
- start-buffer calculation in cooldown if `bufferDynamic` is enabled
  - prevent lower values than the original configured start buffer value
- assigning `null` values to non mandatory configuration parameters will no longer lead to a setup error

### **Release Package 4.12.0**

- [4.12.0](https://files.nanocosmos.de/index.php/s/GsGG7HNnNmDkeqs)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)