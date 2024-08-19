# **NanoPlayer - Release Overview**

## **[4.26.0]**

### **Release Notes**

This version includes several improvements. Playback attempts on mobile devices failing due to visibility state hidden at load start will now result in a dedicated event `1009`. This allows for clearer differentiation from other startup errors, such as network or stream issues `2003 Not enough media data received`. Further we improved playback start behavior in iOS WebView apps, which require user interaction for video playback in their WebView settings. Now, if a playback attempt is rejected due to missing user interaction, the player will emit error `1005` early on, allowing the application to prompt the user for interaction more quickly. Refer to recommended settings for iOS WebView: <https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_webview#ios>. In general find more information about error codes here: <https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api#NanoPlayer..errorcode>.

### **Changelog**

### Improved

- playback attempts on mobile devices failing due to visibility state `hidden` will now result in a dedicated error event with code `1009` and message `Playback failed because the player was in visibility state 'hidden' at load start.`
  - allowing to distinguish from network or stream related startup errors, e.g. `2003 Not enough media data received.`

### Fixed

- playback start behaviour in iOS WebView apps requiring user interaction for video playback `mediaTypesRequiringUserActionForPlayback`
  - in case of a playback attempt rejected due to missing user interaction, the player will now emit error `1005 Playback must be initialized by user gesture.` early on
  - this enables the application to handle the condition faster by asking the user to interact
  - see recommended settings for iOS WebView: <https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_webview#ios>

### **Release Package 4.26.0**

- [4.26.0](https://files.nanocosmos.de/index.php/s/tXzzWke6C2Rw95p)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Release History**

- [release history](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_release_history)
