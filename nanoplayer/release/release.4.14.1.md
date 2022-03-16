# **NanoPlayer - Release Overview**

## Please find more about the **latency control modes** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_latency_control_modes/).

## **[4.14.1]**

### **Release Notes**

This feature release is introducing two new latency control modes especially targeting lowest latency use cases like live auctioning.
The latency control mode can be selected via the added `config.playback.latencyControlMode` configuration parameter.
The established latency control mode is available as the `'classic'` option and is remaining the default mode.
Furthermore the new `'balancedadaptive'` and `'fastadaptive'` latency control modes have been added,
which are capable of adjusting the latency adaptively according to the current stream and network conditions,
to achieve lower latency while keeping the playback experience smooth.
Please find further information in our [feature description](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_latency_control_modes/) in the documentation.

### **Changelog**

### Added

- added latency control modes and related configuration parameter
  - configuration parameter: `config.playback.latencyControlMode`
  - string values: `'classic'`, `'balancedadaptive'`, `'fastadaptive'`

### Improved

- improved handling in case of video frames being dropped by the browser

### **Release Package 4.14.1**

- [4.14.1](https://files.nanocosmos.de/index.php/s/3cKSNC9XnWpLfgJ)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Feature Description**

- [latency control modes](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_latency_control_modes/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
