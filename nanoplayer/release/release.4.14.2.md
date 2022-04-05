# **NanoPlayer - Release Overview**

## Please find more about the **latency control modes** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_latency_control_modes/).

## **[4.14.2]**

### **Release Notes**

This release is solving issues related to the center view player controls and the layout in fullscreen mode.
Previously in case the bottom control bar was disabled, the center view player control did not trigger related actions. It occured after a resize of the player e.g. upon entering the fullscreen mode or mobile device rotation.
Furthermore a fullscreen layout issue has been resolved. Before, parts of the player were not being rendered inside of the display area under following circumstances: If CSS padding was set on the player div and the player's aspect ratio did not match the form factor of the screen.

### **Changelog**

### Fixed

- center view player controls not triggering related actions if the bottom control bar was disabled
  - the issue occurred after a resize of the player (e.g. mobile device rotation or entering fullscreen mode)
- potential layout issue in fullscreen mode
  - if CSS padding was set on the player div and the player's aspect ratio did not match the form factor of the screen

### **Release Package 4.14.2**

- [4.14.2](https://files.nanocosmos.de/index.php/s/774Ntq6stFc7KLr)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Feature Description**

- [latency control modes](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_latency_control_modes/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
