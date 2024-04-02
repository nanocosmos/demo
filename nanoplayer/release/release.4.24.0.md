# **NanoPlayer - Release Overview**

## **[4.24.0]**

### **Release Notes**

This release comes with several improvements. We added the use of a new lean response option via the Bintu API, which improves response times.
Further we improved the latency recovery during playback on desktop platforms when transitioning from a hidden to visible state, enhancing user experience.
Moreover, we implemented measures to prevent buffering when quality adaptations occur in streams ingested via WebRTC, ensuring smoother streaming experiences.
Additionally we improved the detection of iOS desktop mode and application of background suspension, ensuring consistent behavior across browsers and modes on iOS devices.
Also we addressed a bug where stream switching failed while in a paused state with `keepConnection` and `forcePlay` options enabled, improving overall functionality and stability.
We added a fix regarding the unintended fallback behavior in latency control mode `fastadaptive` to `balancedadaptive` for Safari versions 17.4 and above on MacOS Sonoma. The fallback was introduced in version 4.23.1.
As a last point we enabled H5Live-HLS fallbacks when access to ManagedMediaSource API is denied for locally loaded webpages in iOS WKWebView.

### **Changelog**

### Improved

- utilizing new lean response option for configuration via bintu API for a faster response
- faster latency recovery of playback via desktop when returning from hidden to visible state
- prevent buffering in case of quality adaptions in streams ingested via webrtc
- iOS desktop mode detection and application of background suspension to ensure consisent behaviour across browsers and modes on iOS
- use H5Live-HLS fallback in case of a denied access to the ManagedMediaSource API for locally loaded webpages in iOS WKWebView

### Fixed

- stream switch failing in paused state with `keepConnection` and `forcePlay` options enabled
- remove unintended fallback for latency control mode `fastadaptive` to `balancedadaptive` for Safari 17.4+ on MacOS Sonoma (introduced in 4.23.1)

### **Release Package 4.24.0**

- [4.24.0](https://files.nanocosmos.de/index.php/s/K4akoYPnP8WWoky)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
