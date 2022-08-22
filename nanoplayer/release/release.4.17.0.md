# **NanoPlayer - Release Overview**

## Please find more about the **video access and processing** feature in our [documentation](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_video_access_and_processing/).

## **[4.17.0]**

### **Release Notes**

This version is adding a new public event to the player. The event `onActiveVideoElementChange` is emitted when the active video element for playback has been created and if the element has been changed in case of a stream switch on iOS. The event data is providing the `activeVideoElement` and the complete `videoElementList`.
Having a reference to the `activeVideoElement` simplifies use cases like drawing or rendering images to a canvas or saving snapshots from the video.
See the [api description](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api#onactivevideoelementchange) of the event and our [docs feature entry](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_video_access_and_processing/) for more information.

### **Changelog**

### Added

- new public event `onActiveVideoElementChange`
  - is emitted when the active video element for playback has been created and if the element has been changed in case of a stream switch on iOS
  - provides the `videoElementList` {Array.HTMLVideoElement} and the `activeVideoElement` {HTMLVideoElement} in the event data
  - see the [api description](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api#onactivevideoelementchange)

### **Release Package 4.17.0**

- [4.17.0](https://files.nanocosmos.de/index.php/s/CPdWKpfnAwSnCLe)
- [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
- [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

### **Documentation**

- [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

### **Feature Description**

- [video processing](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_feature_video_access_and_processing/)

### **Release History**

- [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)
