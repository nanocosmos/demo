# Release History

# [3.17.1]

## Release Notes

With this release comes a new feature. We added new error codes and pause reasons. The errors that can occure during 'loading', 'buffering' and 'playing' state are now more specific regarding the root cause.
We added the error code 1009 for playback fail in case of visibility hidden e.g. open a link as unfocused tab (ctrl + click). In this case the pause reason is 'visibilityhidden'.
Further not only error 2001 'stream not found' can happen with the loading timeout. If the stream was already connected and the stream info event was fired but not enough data was received the new error code 2003 will be fired. The new pause reason in this case is 'notenoughdata'.
Another new error code is 2004 that will be fired if the source stream has been stopped. This can happen during 'loading', 'buffering' and 'playing' state and results in a pause with reason 'sourcestreamstopped'. The last new error is 3100, a media error, that will be fired if the media source extension (exclude iOS) changes it's state to 'ended'. The pause reason is 'playbackerror'.
For further informations see the definitions for 'errorcode' (https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/NanoPlayer.html#toc21__anchor) and 'pausereason' (https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/NanoPlayer.html#toc22__anchor).
In addition we improved the h5live support detection and fixed with the behaviour on error code 3003 (MEDIA_DECODE_ERROR). Now the player don't try to replay automatically.

## Changelog

### Added

- new error codes:
    - 1009: Playback failed because the player was in visibility state 'hidden' at load start.
    - 2003: Not enough media data received. The stream was already connected and the stream info event was fired.
    - 2004: The source stream has been stopped.
    - 3100: The media source extension changed the state to 'ended'. NOT AVAILABLE FOR IOS.
- new pause reasons:
    - 'visibilityhidden': Paused because the player was not visible at load start.
    - 'notenoughdata': Paused by loading timeout. The stream was alive and connected but not enough data was received to start playback.
    - 'sourcestreamstopped': Paused because the source stream has been stopped.

### Improved

- h5live support detection

### Fixed

- don't restart on error code 3003 MEDIA_DECODE_ERROR

# [3.16.0]

## Release Notes

This release introduces new features and several patches. Now it's possible to configure playback timeouts via the new 'config.playback.timeouts' object. You can set timeouts for 'loading' and 'buffering' in a range of 10-60 seconds (default: 20) and for 'connecting' in a range of 5-30 seconds (default: 5). If the timeouts are reached, an error will be thrown and the player stops.
Another feature addresses the metrics. Now also the 'LOADING' event will be sent. Furthermore if the player restarts in case of 'updateSource' while in playing state the pause event will be triggered with the new pause reason 'playbackrestart' before the replay attempt.
The new version includes patches for the full screen functionality in general and for Internet Explorer (IE) in special. General the full screen icon changes now if exited by ESC and for IE the size is now correctly measured. Another patch fixes the volume change by the controls in IE.
Two patches address the bintu service. The first one fixes a bug if the view is disabled and the bintu stream is not live or the services rejects. Now no view will be created in case of an bintu error. The other one enables to use 'updateSource' with a bintu source. In general now within the 'updateSource' promise the error handling is improved too. Further there are patches for displaying muted autoplay correctly and hiding the playbutton in the middle if switching streams using 'updateSource' while playing.

## Changelog

### Added

- new object 'config.playback.timeouts' to configure the timeouts for 'loading', 'buffering' and 'connecting' in seconds

~~~~
        config.playback.timeouts = {
            loading: 20,
            buffering: 20,
            connecting: 5
        }
~~~~

- the LOADING event will be sent through metrics
- new pause reason 'playbackrestart' in case of a pause for update source in playing state
- updateSource error handling

### Fixed

- full screen icon change if exited via ESC
- IE full screen sizing
- IE volume change via view controls
- hide view in case of bintu setup error if disabled via 'config.style.view=false'
- enable using a bintu source with 'updateSource'
- hide middle playbutton in case of a playback restart via 'updateSource'
- display muted autoplay icon till first 'unmute'

# [3.15.6]

## Release Notes

This version adresses an issue with the full screen functionality on iOS Safari. The player now can go full screen within nested iframes. NOTE: The iframe(s) must have the attribute 'allowfullscreen="allowfullscreen|true"]' or just 'allowfullscreen'. Another issue adressed is the handling of stable playback after viewport lost on IE/Edge. Here the detection is improved to prevent misbehaviour in case of not related framedropping.

## Changelog

### Fixed

- enable full screen on iOS within nested iframe(s)
- detection of IE/Edge viewport issue for stable playback

# [3.15.5]

## Release Notes

This release patches an issue with the config handling. Now a copy of the config will be used for the setup instead of pointer.

## Changelog

### Fixed

- use only a copy of passed config object for setup

# [3.15.4]

## Release Notes

This release patches an issue with bintu sources. Now after a successful bintu call the parsed rtmp config will be passed correctly. This issue was introduced in version 3.15.3.

## Changelog

### Fixed

- pass rtmp settings correctly in modified config object if bintu source is used

# [3.15.3]

## Release Notes

With this release come new features and some patches. One feature is about firing 'onError' with new error codes in case of a setup error. See the docs for more information (https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/NanoPlayer.html#toc21__anchor). Also a warnings will be fired if config properties are not valid or from wrong type. 
The other introduces a new metrics api which enables internal event logging and data aggregation with a nanocosmos backend. Please contact our sales team (mailto:sales@nanocosmos.de) for more information and see './js/nanoplayer-metrics-config.js' in the 'Demo Package'. This release also includes patches for IE/Edge regarding play stats and stable playback after viewport lost.
Now also 'Windows 10' will be detected correctly and on 'Destroy' pause will be fired only if playing.

## Changelog

### Added

- fire 'onError' if an error occure during setup
    - new error codes:
        - 5001: An exception was thrown during setup.
        - 5002: A forced tech is not supported by your browser.
        - 5003: The players source configuration is malformed or missing.
        - 5004: This browser does not fully support HTML5 and H5Live. Supported are: Chrome >=54 (Windows, MacOSX, Android), Firefox >=48 (Windows, MacOSX, Android), Microsoft Edge (Windows), Microsoft Internet Explorer 11 (at least Windows 8), Safari (MacOSX & at least iOS 10).
        - 5005: Configuration error. Could not create player, the rtmp configuration is missing or incomplete. Add an rtmp url and streamname to the configuration.
        - 5006: Configuration error. Could not create player, with this configuration an security token is required. Add an token to the configuration.
        - 5007: Configuration error. Could not create player, the websocket server configuration is missing.
        - 5008: Configuration error. Could not create player, the hls server configuration is missing.
        - 5009: Configuration error. Could not create player, the websocket server configuration for metadata is missing.
        - 5010: Could not embed player.
        - 5101: Could not find bintu stream. The stream is not live.
        - 5102: No bintu stream id passed.
        - 5103: Bintu service rejected.
        - 5201: Metrics configuration error. No metrics config object passed.
        - 5202: Metrics configuration error. Metrics config is not from type 'object'.
        - 5203: Metrics configuration error. Metrics config is empty.
        - 5204: Metrics configuration error. A custom property has no valid index number, the range is 1 to 10 e.g.'customField1'.
        - 5205: Metrics configuration error. A custom property  is not indexed correctly, the range is 1 to 10 e.g.'customField1'.
        - 5206: Metrics configuration error. A custom property has an index out of range, the range is 1 to 10 e.g.'customField1'.
        - 5207: Metrics configuration error. A property is not valid.
        - 5208: Metrics configuration error. No credentials passed.
    - this codes will also be passed as property 'code' in the reject error object 
    - see https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/NanoPlayer.html#toc21__anchor
- fire 'onWarning' if a config property is not valid or from wrong type
- added a new metrics api
    - enables event logging and data aggregation
    - configurable via the new 'config.metrics' object, see https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/NanoPlayer.html#toc20__anchor
    - disabled by default
    - for more information contact our sales team: mailto:sales@nanocosmos.de
    - NOTE: don't set if you have no account!
    - NOTE: if 'Demo Package' is used see './js/nanoplayer-metrics-config.js'!
~~~~
        config.metrics = {
            accountId: 'myId',
            accountKey: 'sdfhe457zsjhnrtzd8',
            userId: 'myUserId',
            eventId: 'myEventId',
            statsInterval: 10,
            customField1: 'custom',
            customField2: 42,
            customField3: true
        }
~~~~

### Fixed

- stable resume playback on IE/edge if video was out of viewport
- calculate play stats on every 'play' for IE/Edge
- detect Windows 10
- pause on 'Destroy' only if playing

# [3.14.1]

## Release Notes

This version comes with some new features. The first one addresses the public 'onPlay' event. Now some startup stats will be passed in the event object. These values represent the different states during startup from 'connecting', 'connected', 'firstFragmentReceived', 'firstFrameRendered', 'playable' and at least 'playing', the total startup time.
The second feature is the new public event 'onDestroy'. This event is fired when the player is destroyed. In relation to that new feature we introduced the new pause reason 'destroy'. If the player is playing on destroy, the player will be paused with this new reason.

## Changelog

### Added

- add startup stats to the public 'onPlay' event
    - subobject 'stats' in 'event.data'
    - keys: 'connecting', 'connected', 'firstFragmentReceived', 'firstFrameRendered', 'playable', 'playing'
    - times in milliseconds relative to 'connecting'
    - see 'https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/NanoPlayer.html#~event:onPlay'
    - an example 'event.data.stats' object:
~~~~
        {
            "stats": {
                "connecting": 0,
                "connected": 267,
                "firstFragmentReceived": 1865,
                "firstFrameRendered": 2028,
                "playable": 2029,
                "playing": 2448
            }
        }
~~~~

- new public event 'onDestroy'

# [3.13.5]

## Release Notes

This version improves the demo page. One part is to use 'updateSource' for bintu multistream functionality.

## Changelog

### Improved

- clean up demo ui
- use 'updateSource' for bintu multistream switch
- update player only if streams changed

# [3.13.3]

## Release Notes

This version adresses an issue with mimetype changes on 'updateSource'. Now it can be switched between different mimetypes e.g. video/audio and video only.

## Changelog

### Fixed

- enable format (mimetype) changes for 'updateSource', e.g. switch between v/a and video only

# [3.13.2]

## Release Notes

This version brings a new feature. Now it's possible to change the source without call setup again. The new feature is available over the new public function 'player.updateSource', which is a Promise.

## Changelog

### Added

- add new public function 'updateSource'
    - for changing the source at lifetime of the player without destroy/re-setup
    - the video element will be kept
    - pass the subobject 'source' of the config object
    - the Promise return's the new complete config
    - see docs http://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/NanoPlayer.html#updateSource__anchor

~~~~
      player.updateSource(source).then(function (config) {
          console.log('update source ok with config: ' + JSON.stringify(config)));
      }, function (error) {
          console.log(error);
      });
~~~~

# [3.12.5]

## Release Notes

This version corrects two small issues. The playback wasn't stopped on iOS on tab change. Now on every 'focus lost' on mobile devices the playback will be paused with reason 'playbacksuspended'. The second fix addresses the 'playback started' detection on iOS.

## Changelog

### Fixed

- pause with reason 'playbacksuspended' if focus lost during tab change on iOS
- playback started detection on iOS

# [3.12.4]

## Release Notes

In this version an issue with the loading icon is handled. The loading icon didn't disappear on play of video only streams. The issue was introduced with the previous version and only affected video only streams.

## Changelog

### Fixed

- hide loading icon on play for video only streams

# [3.12.3]

## Release Notes

One part of this release adresses the correct indication of an audio symbol in case of muted autoplay or audio only. The second issue that is adressed handles the muted state on reset after an unsuccessful (denied) muted autoplay (automuted) on iOS. The last improvement is related to the behaviour in case of multiple destroy calls.

## Changelog

### Fixed

- display audio symbol correct in case of audio only and muted autoplay
- fire unmute on iOS on reset after not allowed muted autoplay (automuted)
- fix destroy functionality if called multiple times in uninitialized state

# [3.12.2]

## Release Notes

This version fixes the default value of the new config option 'playback.automute'. It is disabled by default.

## Changelog

### Fixed

- set 'config.playback.automute' to 'false' by default

# [3.12.1]

## Release Notes

This version fixes an issue related to repeated setup calls without destroy calls in between. Now during the setup call a destroy/clean up will be performed internally if required.

## Changelog

### Fixed

- destroy player at begining of setup call
- clean destroy

# [3.12.0]

## Release Notes

This version brings a new feature for autoplay. There is a new option 'config.playback.automute' (disabled by default) which enables muted autoplay on browsers with autoplay policies. In case the play call is rejected by a policy the player will be muted to autoplay.
Another feature is the option 'config.style.displayMutedAutoplay' (enabled by default) which shows a muted symbol if playback was started with autoplay and muted. There is also a small fix for detecting playing state on iOS.

## Changelog

### Added

- enable auto muted playback with autoplay set in case of browser autoplay policy restriction 
    - can be set via 'config.playback.automute', default: false
- enable displaying a muted symbol on muted autoplay 
    - can be set via 'config.style.displayMutedAutoplay', default: true

### Fixed

- playing state detection on iOS

# [3.11.0]

## Release Notes

This version introduces a new event 'onStreamInfoUpdate' to indicate stream format changes. The event object is the same like in 'onStreamInfo' with the changed values

## Changelog

### Added

- new h5live event 'onStreamInfoUpdate' to indicate stream format changes

# [3.10.3]

## Release Notes

This version fixes a small bug with building the capabilities array.

## Changelog

### Fixed

- capabilities array

# [3.10.2]

## Release Notes

This version fixes a small bug with es6 syntax.

## Changelog

### Fixed

- remove es6 syntax

# [3.10.1]

## Release Notes

This version improves the config handling and enables setting rtmp values over the params object.

## Changelog

### Fixed

- enable rtmp settings over 'config.source.h5live.params' without the 'config.source.h5live.rtmp' object
- config handling


# [3.10.0]

## Release Notes

This version brings a new config option. It's now possible to add custom query params to the connection string. For this there is the new object 'config.source.h5live.params'. Parameters can be added as key/value pair e.g.:

~~~

config.source.h5live.params = {
    'url': 'rtmp://bintu-play.nanocosmos.de',
    'stream': 'dtHSa-aEWRT',
    'custom_param': 'very_custom'
}

~~~

In this example we pass directly the rtmp settings, 'url' and 'stream'. If a 'config.source.h5live.rtmp' object is declared, it will be overwritten. This will result for websocket in a connection string like this:

~~~

wss://bintu-play.nanocosmos.de/h5live/stream/?url=rtmp%3A%2F%2Fbintu-play.nanocosmos.de%3A80%2Fplay&stream=dtHSa-aEWRT&custom_param=very_custom&cid=405498&pid=43377944190

~~~

This version also contains fixes for a wrong buffering state detection on iOS and one for the view. In the view now a configured 'scaling' mode will be keeped over the whole lifetime of the player.

## Changelog

### Added

- new h5live source object 'params' to pass custom comnnection query parameters
    - can be added as key/value pairs

~~~

config.source.h5live.params = {
    'url': 'rtmp://bintu-play.nanocosmos.de',
    'stream': 'dtHSa-aEWRT',
    'custom_param': 'very_custom'
}

~~~

### Fixed

- buffering state detection on iOS
- keep scaling mode at players lifetime

# [3.9.7]

## Release Notes

This version fixes a bug for secured playback on iOS. In case of an error the pause reason now will be correct.

## Changelog

### Fixed

- correct pause reason for secured streams on iOS

# [3.9.6]

## Release Notes

This version brings several improvements and some fixes. Improvements are a better error message in case of an unsupported browser and the re-enabeling of buffer increase automation
in case of significant frame dropping in Firefox to reach stable playback. Fixed are occasionally stream start problems in Firefox with streams encoded by the Open Broadcaster Software Studio
and a wrong object path of the quality object as part of the stats event object.


## Changelog

### Improved

- optimize setup error message in case that no supported tech is found
- re-enable buffer increase automation for Firefox in case of frame drop

### Fixed

- occasionally start problems in Firefox with streams encoded by the OBS (Open Broadcaster Software Studio)
- fix path of the quality object in the stats event object

# [3.9.2]

## Release Notes

This version fixes a bug for Microsoft IE and Edge. Now connection errors will be parsed correctly.

## Changelog

### Fixed

- correct connection error codes for Microsoft IE and Edge

# [3.9.1]

## Release Notes

This version fixes a bug in Safari Mac OS X. Now black blinking on startup will be prevented.

## Changelog

### Fixed

- prevent black blinking at playback start for Safari Mac OS X

# [3.9.0]

## Release Notes

This version brings a new security option. It's now possible to secure streams and play them back savely with the NanoPlayer.
After a stream is marked as secured, it's only possible to playback by giving the credentials via 'config.h5live.security'.
New errors will thrown if the token is invalid/mismatching (4901), the service is rejected (4900), the credentials are incomplete or expired (4903) and the service is not found (4904).

## Changelog

### Added

- enable stream security for h5live playback
    - for playback of secured nanostream cloud streams
    - can be set via the 'config.h5live.security' object (see doc for further info)
    - new error codes:
        - 4900: The security service has been rejected due an internal server error.
        - 4901: The security service denied access. The authentication token is invalid.
        - 4903: The security service denied access. The url is expired or a token parameter is missing (expires, token, or options).
        - 4904: The security service can not be found.

~~~~
      security: {
          token: 'ewr6tzv345zw4z7ezuw4cf3c', // The security service token.
          expires: '1519819200', // The time the token expires (system time).
          options: '15', // The security options.
          tag: 'anyTag' // The custom tag to decrypt the token.
      }
~~~~

# [3.8.2]

## Release Notes

This version brings a new feature and several patches. We now enable adaptive buffer handling. This can be enabled by setting the new 'config.tweaks.buffewrDynamic'.
In case of short time bufferings the buffer will be stabilized. If stable playback is reached after a defined cooldown time, it will be tried to decrease the buffer till the original values. Please see documentation for further informations.
The patches bring improvements for Microsoft Edge / IE and iOS. Also network related fixes are included.

## Changelog

### Added

- enable adaptive buffer handling (iOS already has one)
    - can be set via the 'config.tweaks.bufferDynamic' object (see doc for further info)
    - disabled if no object is passed
    - detect multiple bufferings and increase buffer if necessary
    - if stable playback is detected a stepwise cooldown will be processed

~~~~
      bufferDynamic: {
          offsetThreshold: 2, //  The threshold time between two bufferings in seconds. If the measured value is lower, the buffer will be increased by offsetStep.
          offsetStep: 0.5, // The step to increase in seconds. Also the step to decrease in cooldown.
          cooldownTime: 10 // The time to check stable playback. If stable playback is detected, the buffer values will be decreased till original buffer values are reached.
      }
~~~~

### Fixed

- reconnectable network error handling
- buffer issue with Microsoft Surface
- handle unexpected time jumps for hls
- proper resuming on Microsoft Edge and Internet Explorer
- only handle gaps in case playback is frozen
- random access point handling for Microsoft Edge
- try restart on media decode error only
- hls stats collecting and buffer controlling

# [3.7.2]

## Release Notes

This version patches a bug. It fixes a loading timeout on second play call.

## Changelog

### Fixed

- fix loading timeout on second play call

# [3.7.1]

## Release Notes

This version patches a bug on iOS. It fixes the pausing in the case that the player losts it's focus.

## Changelog

### Fixed

- pausing on lost focus for iOS

# [3.7.0]

## Release Notes

This version brings new features. A new member variable is added, 'player.id'. Its a unique string of 11 characters to identify the player instance.
Additionally this player id will be passed through the event object of all public events as 'event.id'. Now the player version will be passed as 'event.version' too.
In the stream info event additionally the stream url will be passed as 'event.data.streamInfo.url'.

## Changelog

### Added

- new player member variable 'player.id', a unique string created on instantiation
- pass 'id' and 'version' of the player through every event as 'evt.id' and 'evt.version'
- add the complete stream url as 'url' to the stream info event object ('evt.data.streamInfo.url')

### Fixed

- fire pause normal only once

# [3.6.7]

## Release Notes

This version contains a patch for the reconnection functionality. A reconnect will be done after a calculated delay.

## Changelog

### Fixed

- fix start reconnect after given delay 

# [3.6.6]

## Release Notes

This version contains patches for mobile playback, especially for iOS. 
A potentially performance impairing issue in the internal processing 
on iOS has been removed. 
If config.playback.forceTech is set to 'h5live', 
h5live playback will now be forced for all platforms including iOS.
The nanocosmos logo has been removed from the flash fallback module.
Automatic pausing on lost focus has been added for Android too.

## Changelog

### Added

- handle 'playback suspended' also on Android (iOS since 2.7.1) in case of lost focus / menu by pausing the player

### Changed

- buffer removing (shorter)
- removed 'nano' logo from flash fallback swf file

### Fixed

- prevent multiple event registering on iOS
- play/pause functionality over middle play button on iOS
- stats collection on iOS
- add errorcode for RECONNECTION_CONFIG_INVALID
- disable play recovering for mobile
- fix forcing tech 'h5live' on iOS

# [3.5.2]

## Release Notes

This version contains a patch for the full screen functionality.
Now full screen will only be exited, if the full screen element is the player instance.
Before it exited every full screen on destroy without a check.

## Changelog

### Fixed

- full screen handling

# [3.5.1]

## Release Notes

This release brings new features. There are new statistics available via the 'onStats' event. Now the bitrate in Bit/s will be measured and also the network framerate in fps.
For both it will be measured the current value over one second and the minimum, maximum and average over the last 10 seconds. They are accessable over the 'event.data.stats.bitrate'
and the 'event.data.stats.framerate' objects. This feature is not available on iOS and the values are always '0' in this case.
Another feature is auto rotation for mobile streams from our
nanoStream Mobile Apps. Its enabled if 'playback.metadata' is set to true.

## Changelog

### Added

- new stats objects 'bitrate' and 'framerate' (network framerate) in 'onStats' event (NOT AVAILABLE FOR IOS)
- auto rotation for mobile streams from nanoStream Mobile Apps if 'playback.metadata=true'

### Fixed

- remove unwanted currentTarget from 'event.data' object

# [3.4.1]

## Release Notes

This version contains patches for iOS full screen functionality if meta tag 'viewport' is set and the autoplay policy of Safari 11, where only muted autoplay is allowed.

## Changelog

### Improved

- handle autoplay policy of Safari 11 by checking user gesture requirement (muted autoplay allowed)

### Fixed

- iOS full screen functionality if meta tag 'viewport' is set

# [3.4.0]

## Release Notes

### HIGHLY RECOMMENDED

This version contains improved connectivity and latency for iOS 11 compared to iOS 10, and a workaround for an internal iOS11 system issue.
It is highly recommended to use this version to avoid potentially higher network load and degraded user experience for iOS 11 users.

## Changelog

### Improved

- connectivity and latency for iOS 11

# [3.3.4]

## Release Notes

This version includes a fix for the muted state of the player, if the player will be set up muted. The state wasn't changed and no event was fired.
Now the 'onMuted' event fires immediately with the setuo promise.

## Changelog

### Fixed

- change muted state and 'onMuted' event firing within the setup promise

# [3.3.3]

## Release Notes

This version includes a fix for the flash fallback. It fixes an undefined error  on setuo if container div id is different than 'playerDiv'.

## Changelog

### Fixed

- undefined error with flash fallback player on setuo if container div id is different then 'playerDiv'

# [3.3.2]

## Release Notes

This release brings many features. We introduce the new 'keepConnection' functionality (supported with h5live server 1.8.0.0 and higher).
This enables to have always a connection to the h5live server (websocket only), also if the player is not playing.
Another main feature is the new reconnect logic. It enables reconnects to the h5live server in case of recoverable network errors. If the player is playing, the playback resumes after a successful reconnect.
Related to the reconnect we added the value 'connectDelay' to the event 'onLoading', that if positive and not zero indicates that a reconnect is imminent.
Also now the network error 4503: service unavailable will be dispatched and passed through the 'onError' event.
For diagnostics of the websocket connection we now use 'performance.mark()' to log different states of the connection with timestamps.
In this release are also several fixes. There are fixes for the scaling functionality, the h5live source parsing with bintu rtmp playout object only and at least we removed flash test embed on player load.

## Changelog

### Added

- enable always keep connected for websocket to the h5live server (h5live server 1.8.0.0 and higher)
    - can be set via 'config.playback.keepConnection'
    - default: false
- enable reconnect in case of recoverable network errors (see docs), not supported on iOS with metadata disabled
    - can be set via the 'config.playback.reconnect' object
    - new player states 'RECONNECTION_IMMINENT' (13) and 'CONNECTION_ERROR' (14)
    - default:

~~~~
      reconnect: {
          minDelay: 2, //  The minimum time to reconnect in seconds. The lowest possible value is 1 sec.
          maxDelay: 10, // The maximum time to reconnect in seconds.
          delaySteps: 10, // This number of steps till the maximum delay should reached.
          maxRetries: 10 // The maximum count of reconnect tries. If set to zero no reconnect will be done.
      }
~~~~

- add property 'connectDelay' to the 'event.data' object of 'onLoading'
    - the delay in milliseconds before start connecting to the server
    - positive if a reconnect is imminent, otherwise zero
- dispatch network error 4503: service unavailable
- add performance marks with timestamps (see https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer3/global.html#performancemarks),
  the middle part of the name string is the elementId of the player container (not supported on Safari 11 OSX and iOS):
    - 'nano.[playerDivId].connecting'
    - 'nano.[playerDivId].connected'
    - 'nano.[playerDivId].disconnected'
    - 'nano.[playerDivId].resuming'
    - 'nano.[playerDivId].firstFragmentReceived'
    - 'nano.[playerDivId].firstFrameRendered'
- new public event 'onWarning' with a warning message

### Fixed

- remove flash test embed on player load
- enable h5live source with bintu rtmp playout object only
- fix missing scaling config property

# [3.2.2]

## Changelog

### Improved

- start logic for IE/Edge

# [3.2.1]

## Changelog

### Improved

- buffer removal check

# [3.2.0]

## Release Notes

In this release we added the opportunity to create an audio player without video functionality.
This can be enabled by setting in the style object of the config the new property 'audioPlayer' to 'true',
for example 'config.style.audioPlayer = true'.
Controls can be enabled/disabled. The size can be customized via 'width' and 'height'. Default is 640px * 51px.

## Changelog

### Added

- enable the creation of an audio player without video functionality via 'config.style.audioPlayer = true'
    - controls can be enabled/disabled
    - the size can be customized via 'width' and 'height'
    - default is 640px * 51px

# [3.1.0]

## Release Notes

With this release comes improvements for the playback on iOS devices.
We introduce an adaptive buffer control depending on the buffer requirements of the iOS video element 
to achieve smooth playback while attempting to keep the latency as low possible. 
The adaptive buffer control is enabled by default for iOS clients. 
There is a direct correlation between the integrity of the rtmp source stream and the buffer requirements.

The second improvement is that it's now possible to configure the buffer settings also for iOS devices directly.
If the buffer tweaks will be set via config,
the adaptive buffer control will be disabled and the given value will be used as discret values.

## Changelog

### Added

- adaptive buffer control related to the buffer requirements on iOS
- enable setting buffer tweaks via config for iOS as discret values
- buffering detection for iOS

# [3.0.11]

## Release Notes

The main improvements of this release are getting more stability
in play detection and pausing behaviour.

## Changelog

### Fixed

- user gesture required detection for mobile
- hide media errors if pausing/paused
- enable usage of event handler functions without defining an event object parameter
- video tag destroy

# [3.0.10]

## Changelog

### Fixed

- remove source correctly on pause to disable multiple stream connections (iOS)
- check media source for mime type support
- fix playback suspension with video only streams in Chrome > 57 on lost page focus

# [3.0.9]

## Release Notes

The main improvements of this release are getting more stability
for resuming after pause.

## Changelog

### Improved

- stable playback resuming after pause
- resume playback also if PLAY is called while pausing
- replace deprecated unescape/escape with decodeURIComponent/encodeURIComponent

# [3.0.4]

## Changelog

### Improved

- stream start

# [3.0.3]

## Changelog

### Fixed

- preventing the stream position from moving back in time on iOS devices
- signalling of pause state reasons

# [3.0.2]

## Release Notes

### BREAKING CHANGE
The automatic fallback to the nanoStream Cloud h5live server has been removed. 
As a result providing the h5live.server configuration object is now mandatory, 
except if the server configuration is done through the bintu API by providing a bintu source. 
For playback from the nanoStream Cloud without the bintu API the following values have to be set. 

~~~
source.h5live.server.websocket = 'wss://h5live.nanocosmos.de:443/h5live/stream';
source.h5live.server.hls = 'https://h5live.nanocosmos.de:443/h5live/http/playlist.m3u8';
source.h5live.server.progressive = 'https://h5live.nanocosmos.de:443/h5live/http/stream.mp4';
~~~

For the On-Premise setup this server values have to be replaced with the own server urls.

### BREAKING CHANGE
The seperate configuration of the rtmp url for the fallback to flash player, 
the source.rtmp object, has been removed. Instead the rtmp url and stream name 
from the source.h5live.rtmp object will be used in this case.

Since this version the last video frame can be kept displayed after pausing the player, 
instead of displaying a black frame. The related configuration option is 
'style.keepFrame' = [true/false], which is enabled by default.

Support for playback of audio only streams has been added (at least server version 1.7 required). 
An audio symbol can be displayed during the playback of an audio only stream. 
The related configuration option is 
'style.displayAudioOnly' = [true/false], which is enabled by default.

## Changelog

### Added

- add audio only support
- add new public event 'onStreamInfo' with an streamInfo object about audio/video in the stream
- change player behaviour to always keep frame
- new config flag 'style.keepFrame' (default = true)
- new config flag 'style.displayAudioOnly' (default = true)
- add new state PAUSING to protect pausing phase
- new server event onRandomAccessPoint to enable stable seeking to keyframes in IE/Edge

### Removed

- removed external code from source code incl. config etc.
- removed rtmp source for flash, instead use the rtmp object from h5live source as fallback
- removed nanocosmos server defaults

### Fixed

- adjusted minimum buffer for ie/edge
- more stable start behaviour
- frame drop handling only for Firefox
- destroy player on new setup call

# [2.8.1]

## Release Notes

The main changes of this release are adding quality metrics for firefox
to detect frame dropping and handling by buffer increasing.
Fixed is the user gesture error on playback start by tapping
on the interaction playbutton on Android 5/6.
Fixed is the playback start on start buffer.

* Added quality handler for firefox with frame drop detection/handling.

* Fixed user gesture error on Android 5/6.

* Fixed is the playback start on start buffer.

## Changelog

### Added

- quality handler with quality measuring and frame drop detection/handling (Firefox)

### Fixed

- start playback on start buffer
- removed deprecated single/double tap logic
- added simple click event

# [2.7.1]

## Release Notes

The main changes of this release are improvements for playback on safari.
The stream does not stops anymore in case of large gaps in buffer
or unexpected pause calls. It is added a handling to keep low latency playback
in case of multiple buffered ranges by a seek over buffer gaps (exclude iOS).

* Added a handling to prevent playback stopping on unexpected pause calls.

* Added a handling to seek over buffer gaps to keep low latency playback. This does not apply for iOS.

## Changelog

### Added

- handle 'playback suspended' on iOS in case of lost focus / menu by pausing the player
- added new pause reason, state & errorcode for 'playback suspended'
- tweak buffer times

### Fixed

- google map parsing in multiplayer demo

# [2.4.1]

## Changelog

### Added

- google maps to nanoplayer-multi demo
- player capabilities
- enable video tag re-use

# [2.3.8]

## Changelog

### Added

- remove doubleclick interaction
- click on player let controls appear
- click on playbutton starts playback
- disable mobile autoplay in demo
- buffer value change for stable playback on IE/Edge, framerate dependent

# [2.3.4]

## Changelog

### Added
- add multiplayer
- online flashplayer path for snippet
- buffer improvement for ios
- webpack build
    - native script tag, require, commonjs
- separate demo html's for native and require load
- destroy function
- native hls playback enabled for safari
- remove online dependency for flashplayer (relative path)
- remove online dependency for external code (must load separately else not supported)
- controls
    - play/pause
    - time
    - mute/unmute
    - volume
    - full screen
- config option to set flashplayer path (default is html root)
- events for mute/unmute/volumechange
- buffer control for ios
- general IE/Edge support, more buffer
- playback watcher to detect if playback started (user gesture required on mobile)
- new pause reason/state/error

### Fixed

- ignore force param in demo
- check config for source object
- docs
- removing players in multiplayer
- default server error
- seek instead of increase speed in buffer control for IE/Edge

# [2.0.3]

## Changelog

### Added

- scaling
    - play with different video scaling modes
    - letterbox, crop, fill, original, resize
- responsive
    - view (playbutton/buffersign/errorsign) sizing should depend on player size (small/bigger player -> smaller/bigger signs)
- interaction
    - try to scroll or move while mouse pressed should do nothing
    - play/pause per click/touch
    - full screen per doubleclick/doubletouch
- (ie/edge), more buffer on lower framerates

### Fixed

- interactive handler
- reset connection
- scaling resize
- scaling iOS
- interaction touch/left mouse only

# [1.5.4]

## Changelog

### Added

- ios 10 metadata
- enable/disable metadata
- playbutton, buffersign
- configuration errors

### Fixed

- cross domain load
