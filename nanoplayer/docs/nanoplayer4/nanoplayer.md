---
id: nanoplayer_api
title: NanoPlayer
sidebar_label: NanoPlayer
---

<a name="NanoPlayer"></a>

## NanoPlayer
NanoPlayer (H5Live) Public API Class 4.14.2

**Kind**: global class  
**Version**: 4.14.2  
<a name="new_NanoPlayer_new"></a>

### new NanoPlayer(playerDivId)
The constructor. The source can be loaded via script tag, AMD (requirejs) or CommonJS

<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>playerDivId</td><td><code>string</code></td><td><p>The div element the player will be embedded into.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```xml
{}
<!-- Example: load player with new video element into playerDiv -->
<div id="playerDiv"></div>
<script type="text/javascript" src="nanoplayer.4.min.js"></script>
<script type="text/javascript">
    var player;
    var config = {
        "source": {
            "entries": [
                    {
                        "h5live": {
                             // your rtmp stream
                            "rtmp": {
                                "url": "rtmp://bintu-play.nanocosmos.de/play",
                                "streamname": "XXXXX-YYYYY"
                            },
                            "server": {
                                "websocket": "wss://bintu-h5live.nanocosmos.de:443/h5live/stream.mp4",
                                "hls": "https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8",
                                "progressive": "https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4"
                            }
                        }
                    }
            ]
        }
    };
    function initPlayer() {
        player = new NanoPlayer('playerDiv');
        player.setup(config).then(function (config) {
            console.log('setup ok with config: ' + JSON.stringify(config));
        }, function (error) {
            console.log(error);
        });
    }
    // load player from playerDiv
    document.addEventListener('DOMContentLoaded', function () {
        initPlayer();
    });
</script>
```
**Example**  
```xml
{}
<!-- Example: load player with existing html video element -->
<div id="playerDiv">
    <video id="myPlayer"></video>
    <!-- iOS ONLY uses 2 video elements for playback if more than one stream is configured, required for seamless stream switching -->
    <video id="myPlayer2"></video>
</div>
<script>
    var player;
    var config = {
        "source": {
            "entries": [
                    {
                        "h5live": {
                             // your rtmp stream
                            "rtmp": {
                                "url": "rtmp://bintu-play.nanocosmos.de/play",
                                "streamname": "XXXXX-YYYYY"
                            },
                            "server": {
                                "websocket": "wss://bintu-h5live.nanocosmos.de:443/h5live/stream.mp4",
                                "hls": "https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8",
                                "progressive": "https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4"
                            }
                        }
                    }
            ]
        },
        "playback": {
            "videoId": ["myPlayer", "myPlayer2"]
        }
    };
    function initPlayer() {
        player = new NanoPlayer('playerDiv');
        player.setup(config).then(function (config) {
            console.log('setup ok with config: ' + JSON.stringify(config));
        }, function (error) {
            console.log(error);
        });
    }
    document.addEventListener('DOMContentLoaded', function () {
        initPlayer();
    });
</script>
```
**Example**  
```xml
{}
<!-- Example: load player with require.js -->
<script type="text/javascript" src="require.js"></script>
<script type="text/javascript">
    var player;
    requirejs.config({
        paths: {
            // loads the player ...
            // for a local copy of the minified player use a relative path e.g. 'js/nanoplayer.4.min'
            // if 'baseUrl' is defined a local path have to be relative to the base path
            nanoplayer: '//demo.nanocosmos.de/nanoplayer/api/release/nanoplayer.4.min.js'
        },
        waitSeconds: 20, // timeout for loading modules
    });
    require('nanoplayer', function() {
        initPlayer();
    });
</script>
```
<a name="NanoPlayer+version"></a>

### nanoPlayer.version : <code>string</code>
The version of the player.

**Kind**: instance property of [<code>NanoPlayer</code>](#NanoPlayer)  
<a name="NanoPlayer+coreversion"></a>

### nanoPlayer.coreversion : <code>string</code>
The version of the core.

**Kind**: instance property of [<code>NanoPlayer</code>](#NanoPlayer)  
<a name="NanoPlayer+viewversion"></a>

### nanoPlayer.viewversion : <code>string</code>
The version of the view.

**Kind**: instance property of [<code>NanoPlayer</code>](#NanoPlayer)  
<a name="NanoPlayer+type"></a>

### nanoPlayer.type : <code>string</code>
The type of the player.

**Kind**: instance property of [<code>NanoPlayer</code>](#NanoPlayer)  
<a name="NanoPlayer+id"></a>

### nanoPlayer.id : <code>string</code>
The unique id of the player.

**Kind**: instance property of [<code>NanoPlayer</code>](#NanoPlayer)  
<a name="NanoPlayer+capabilities"></a>

### nanoPlayer.capabilities : <code>Array.&lt;string&gt;</code>
The supported tech names of the player.

**Kind**: instance constant of [<code>NanoPlayer</code>](#NanoPlayer)  
<a name="NanoPlayer+setup"></a>

### nanoPlayer.setup(config) ⇒ <code>Promise.&lt;(config\|error)&gt;</code>
Initializes the player with a given config object.

**Kind**: instance method of [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>config</td><td><code><a href="#NanoPlayer..config">config</a></code></td><td><p>The config object for the player including sources, events, styles.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayerplayer.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer+destroy"></a>

### nanoPlayer.destroy()
Cleans up the player and removes all nested elements from the container div.

**Kind**: instance method of [<code>NanoPlayer</code>](#NanoPlayer)  
**Example**  
```js
// player instance of NanoPlayerplayer.destroy();player.setup(config);
```
<a name="NanoPlayer+play"></a>

### nanoPlayer.play()
Plays the player.

**Kind**: instance method of [<code>NanoPlayer</code>](#NanoPlayer)  
**Example**  
```js
// player instance of NanoPlayerplayer.play();
```
<a name="NanoPlayer+pause"></a>

### nanoPlayer.pause()
Pauses the player.

**Kind**: instance method of [<code>NanoPlayer</code>](#NanoPlayer)  
**Example**  
```js
// player instance of NanoPlayerplayer.pause();
```
<a name="NanoPlayer+mute"></a>

### nanoPlayer.mute()
Mutes the player.

**Kind**: instance method of [<code>NanoPlayer</code>](#NanoPlayer)  
**Example**  
```js
// player instance of NanoPlayerplayer.mute();
```
<a name="NanoPlayer+unmute"></a>

### nanoPlayer.unmute()
Unmutes the player.

**Kind**: instance method of [<code>NanoPlayer</code>](#NanoPlayer)  
**Example**  
```js
// player instance of NanoPlayerplayer.unmute();
```
<a name="NanoPlayer+setVolume"></a>

### nanoPlayer.setVolume(volume)
Sets the volume of the player.

**Kind**: instance method of [<code>NanoPlayer</code>](#NanoPlayer)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>volume</td><td><code>number</code></td><td><p>The volume to set in a range from 0.0 to 1.0.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayerplayer.setVolume(0.3);
```
<a name="NanoPlayer+updateSource"></a>

### nanoPlayer.updateSource(source) ⇒ <code>Promise.&lt;(config\|error)&gt;</code>
Updates the source of the player.

**Kind**: instance method of [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>source</td><td><code>object</code></td><td></td><td><p>The object to configure the source to play, one of the following properties have to be set.</p>
</td>
    </tr><tr>
    <td>[source.entries]</td><td><code><a href="#NanoPlayer..entry">Array.&lt;entry&gt;</a></code></td><td></td><td><p>The source entries array for a set of streams. USE INSTEAD OF SOURCE.H5LIVE. Used to configure stream entries. Can have one to many &#39;entry&#39; objects. Only one existing entry is similar than a single source. In this case no entries options are needed.</p>
</td>
    </tr><tr>
    <td>[source.startIndex]</td><td><code>number</code></td><td><code>0</code></td><td><p>The index of the entry to start playback with. Can be in the range from 0 to &#39;entries.length-1&#39;.</p>
</td>
    </tr><tr>
    <td>[source.options]</td><td><code>object</code></td><td></td><td><p>The object to configure the source entries options.</p>
</td>
    </tr><tr>
    <td>[source.options.switch]</td><td><code>object</code></td><td></td><td><p>The object to configure the stream switch options like method etc.</p>
</td>
    </tr><tr>
    <td>[source.options.switch.method]</td><td><code>string</code></td><td><code>&quot;server&quot;</code></td><td><p>The update method. Possible values are &#39;server&#39; (default) and &#39;client&#39;.</p>
</td>
    </tr><tr>
    <td>[source.options.switch.pauseOnError]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If set the player stops if an error occure during the stream switch. Default is false.</p>
</td>
    </tr><tr>
    <td>[source.options.switch.forcePlay]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If set the player starts playback in case the player is paused. Default is true.</p>
</td>
    </tr><tr>
    <td>[source.options.switch.fastStart]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>Only if method is &#39;server&#39;. Tries to accelerate the startup time of the new source. Default is false.</p>
</td>
    </tr><tr>
    <td>[source.options.switch.timeout]</td><td><code>number</code></td><td><code>20</code></td><td><p>The timeout for the update source request in seconds. If reached the error 4006 will thrown in the <a href="NanoPlayer#~event:onUpdateSourceFail">&#39;onUpdateSourceFail&#39;</a> event. Default is 10 seconds, valid range is between 5 and 30.</p>
</td>
    </tr><tr>
    <td>[source.options.switch.tag]</td><td><code>string</code></td><td></td><td><p>A custom field that can be any string like &#39;stream-800k&#39; or &#39;720p&#39;. This tag will be returned in any completion event of the &#39;updateSource&#39; request like &#39;onUpdateSourceSuccess&#39;, &#39;onUpdateSourceFail&#39; and &#39;onUpdateSourceAbort&#39;.</p>
</td>
    </tr><tr>
    <td>[source.options.adaption]</td><td><code>object</code></td><td></td><td><p>The object to set an adaption for switching.</p>
</td>
    </tr><tr>
    <td>[source.options.adaption.rule]</td><td><code>string</code></td><td><code>&quot;none&quot;</code></td><td><p>The switch rule if multiple entries are defined. Possible values are &#39;deviationOfMean&#39; (ABR automatic), &#39;deviationOfMean2&#39; (ABR automatic) and &#39;none&#39; (default, means only manual stream switch via &#39;switchStream&#39; possible).</p>
</td>
    </tr><tr>
    <td>[source.options.adaption.downStep]</td><td><code>number</code></td><td><code>1</code></td><td><p>The minimum number of steps during a ABR down switch (&#39;deviationOfMean&#39; and &#39;deviationOfMean2&#39; only).</p>
</td>
    </tr><tr>
    <td>[source.h5live]</td><td><code>object</code></td><td></td><td><p>DEPRECATED. PLEASE USE ENTRIES!!! WILL BE OVERWRITTEN IN CASE AT LEAST ONE &#39;ENTRY&#39; IS DEFINED IN &#39;ENTRIES&#39; ARRAY. The h5live object to configure the h5live connection.</p>
</td>
    </tr><tr>
    <td>source.h5live.server</td><td><code>object</code></td><td></td><td><p>The h5live server object.</p>
</td>
    </tr><tr>
    <td>[source.h5live.server.websocket]</td><td><code>string</code></td><td></td><td><p>The h5live websocket url.</p>
</td>
    </tr><tr>
    <td>[source.h5live.server.progressive]</td><td><code>string</code></td><td></td><td><p>The h5live progressive download url.</p>
</td>
    </tr><tr>
    <td>[source.h5live.server.hls]</td><td><code>string</code></td><td></td><td><p>The h5live hls url. Have to be set for playback on iOS 10 or higher. iOS 9 or lower is not supported.</p>
</td>
    </tr><tr>
    <td>[source.h5live.token]</td><td><code>string</code></td><td></td><td><p>The h5live server token.</p>
</td>
    </tr><tr>
    <td>[source.h5live.rtmp]</td><td><code>object</code></td><td></td><td><p>The rtmp playout object for h5live playback.</p>
</td>
    </tr><tr>
    <td>source.h5live.rtmp.url</td><td><code>string</code></td><td></td><td><p>The rtmp playout url. Have to include the domain, port and application e.g. &#39;rtmp://example.com:80/live&#39;.</p>
</td>
    </tr><tr>
    <td>source.h5live.rtmp.streamname</td><td><code>string</code></td><td></td><td><p>The rtmp streamname.</p>
</td>
    </tr><tr>
    <td>[source.h5live.security]</td><td><code>object</code></td><td></td><td><p>The h5live security object for h5live playback.</p>
</td>
    </tr><tr>
    <td>source.h5live.security.token</td><td><code>string</code></td><td></td><td><p>The security service token.</p>
</td>
    </tr><tr>
    <td>source.h5live.security.expires</td><td><code>string</code></td><td></td><td><p>The time the token expires (system time).</p>
</td>
    </tr><tr>
    <td>source.h5live.security.options</td><td><code>string</code></td><td></td><td><p>The security options.</p>
</td>
    </tr><tr>
    <td>source.h5live.security.tag</td><td><code>string</code></td><td></td><td><p>The custom tag to decrypt the token.</p>
</td>
    </tr><tr>
    <td>[source.h5live.params]</td><td><code>object</code></td><td></td><td><p>The params object to pass custom query parameters over the h5live server connection. Parameters can be passed as key/value pairs.</p>
</td>
    </tr><tr>
    <td>[source.bintu]</td><td><code>object</code></td><td></td><td><p>DEPRECATED. PLEASE USE ENTRIES!!! WILL BE OVERWRITTEN IN CASE AT LEAST ONE &#39;ENTRY&#39; IS DEFINED IN &#39;ENTRIES&#39; ARRAY. An bintu object to get sources.</p>
</td>
    </tr><tr>
    <td>source.bintu.streamid</td><td><code>string</code></td><td></td><td><p>The bintu stream id.</p>
</td>
    </tr><tr>
    <td>[source.bintu.apiurl]</td><td><code>string</code></td><td><code>&quot;https://bintu.nanocosmos.de&quot;</code></td><td><p>The bintu api url.</p>
</td>
    </tr><tr>
    <td>[source.hls]</td><td><code>string</code></td><td></td><td><p>DEPRECATED. PLEASE USE ENTRIES!!! WILL BE OVERWRITTEN IN CASE AT LEAST ONE &#39;ENTRY&#39; IS DEFINED IN &#39;ENTRIES&#39; ARRAY. An hls playout url as string.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
var source = {    "entries": [            {                "index": 0,                "label": "high",                "tag": "this is a high quality stream",                "info": {                    "bitrate": 1200,                    "width": 1280,                    "height": 720,                    "framerate": 30                },                "hls": "",                "h5live": {                    "rtmp": {                        "url": "rtmp://bintu-play.nanocosmos.de/play",                        "streamname": "XXXXX-YYYY1"                    },                    "server": {                        "websocket": "wss://bintu-h5live.nanocosmos.de:443/h5live/stream.mp4",                        "hls": "https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8",                        "progressive": "https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4"                    },                    "token": "",                    "security": {}                },                "bintu": {}            },            {                "index": 1,                "label": "medium",                "tag": "this is a medium quality stream",                "info": {                    "bitrate": 800,                    "width": 864,                    "height": 480,                    "framerate": 30                },                "hls": "",                "h5live": {                    "rtmp": {                        "url": "rtmp://bintu-play.nanocosmos.de/play",                        "streamname": "XXXXX-YYYY2"                    },                    "server": {                        "websocket": "wss://bintu-h5live.nanocosmos.de:443/h5live/stream.mp4",                        "hls": "https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8",                        "progressive": "https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4"                    },                    "token": "",                    "security": {}                },                "bintu": {}            },            {                "index": 2,                "label": "low",                "tag": "this is a low quality stream",                "info": {                    "bitrate": 400,                    "width": 426,                    "height": 240,                    "framerate": 15                },                "hls": "",                "h5live": {                    "rtmp": {                        "url": "rtmp://bintu-play.nanocosmos.de/play",                        "streamname": "XXXXX-YYYY3"                    },                    "server": {                        "websocket": "wss://bintu-h5live.nanocosmos.de:443/h5live/stream.mp4",                        "hls": "https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8",                        "progressive": "https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4"                    },                    "token": "",                    "security": {}                },                "bintu": {}            }    ],    "options": {        "adaption": {            "rule": "deviationOfMean2",            "downStep": 1        },        "switch": {            'method': 'server',            'pauseOnError': false,            'forcePlay': true,            'fastStart': false,            'timeout': 20        }    },    "startIndex": 2 // lowest};// player instance of NanoPlayerplayer.updateSource(source).then(function (config) {    console.log('update source ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
**Example**  
```js
var source = {    "entries": [            {                "index": 0,                "label": "high", // optional                "tag": "this is a high quality stream", // optional                "info": { // optional                    "bitrate": 1200,                    "width": 1280,                    "height": 720,                    "framerate": 30                },                "h5live": {                     // your rtmp stream                    "rtmp": {                        "url": "rtmp://bintu-play.nanocosmos.de/play",                        "streamname": "XXXXX-YYYYY"                    },                    "server": {                        "websocket": "wss://bintu-h5live.nanocosmos.de:443/h5live/stream.mp4",                        "hls": "https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8",                        "progressive": "https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4"                    },                    // optional (secure token)                    "security": {                        "token": 'awe456b367g4e6rm8f56hbe6gd8f5m8df6n8idf6tf8mfd68ndi',                        "expires": '1519819200',                        "options": '15',                        "tag": 'anyTag'                    }                }            }    ]};// player instance of NanoPlayerplayer.updateSource(source).then(function (config) {    console.log('update source initialized with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer+switchStream"></a>

### nanoPlayer.switchStream(index) ⇒ <code>Promise.&lt;(config\|error)&gt;</code>
Switch to a stream given over source entries.

**Kind**: instance method of [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [entry](#NanoPlayer..entry)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>index</td><td><code>number</code></td><td><p>The index of the stream in the given stream set to switch to.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayerplayer.switchStream(1).then(function (config) {    console.log('switch stream initialized with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer+setAdaption"></a>

### nanoPlayer.setAdaption(adaption)
Set a desired adaption rule or disable adaption on the fly.

**Kind**: instance method of [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>adaption</td><td><code>object</code></td><td><p>The adaption object similar than the object &#39;config.source.options.adaption&#39;.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar adaption = {    "rule": "deviationOfMean2",    "downStep": 2}if (!useAdaption) {    adaption.rule = "none";}player.setAdaption(adaption);
```
<a name="NanoPlayer+requestFullscreen"></a>

### nanoPlayer.requestFullscreen() ⇒ <code>Promise.&lt;(undefined\|error)&gt;</code>
Request fullscreen mode for the player if not entered.

**Kind**: instance method of [<code>NanoPlayer</code>](#NanoPlayer)  
**Example**  
```js
// player instance of NanoPlayerplayer.requestFullscreen()   .then(function (){       console.log('requestFullscreen resolved');   })   .catch(function(err) {       // error reasons can be 'denied' or 'disabled' (e.g. in audio player mode)       console.log('requestFullscreen rejected: ' + err.reason);   });
```
<a name="NanoPlayer+exitFullscreen"></a>

### nanoPlayer.exitFullscreen() ⇒ <code>Promise.&lt;(undefined\|error)&gt;</code>
Exit fullscreen mode if entered.

**Kind**: instance method of [<code>NanoPlayer</code>](#NanoPlayer)  
**Example**  
```js
// player instance of NanoPlayerplayer.exitFullscreen()   .then(function (){       console.log('exitFullscreen resolved');   })   .catch(function(err) {       // error reasons can be 'denied' or 'disabled' (e.g. in audio player mode)       console.log('exitFullscreen rejected: ' + err.reason);   });
```
<a name="NanoPlayer..event_onReady"></a>

### "onReady"
The ready event to pass in the 'config.events' object at the setup call. Fires if the player is ready to play after successful setup.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.config</td><td><code>config</code></td><td><p>The config object.</p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onReady = function (event) {    console.log('Ready: ' + JSON.stringify(event.data.config));}config.events.onReady = onReady;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onPlay"></a>

### "onPlay"
The play event to pass in the 'config.events' object at the setup call. Fires if playout is started.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.stats</td><td><code>object</code></td><td><p>The startup stats object.</p>
</td>
    </tr><tr>
    <td>data.stats.connecting</td><td><code>number</code></td><td><p>The time when &#39;player.play()&#39; is just called in ms (always zero).</p>
</td>
    </tr><tr>
    <td>data.stats.connected</td><td><code>number</code></td><td><p>The time when the connection is established in ms (relative to &#39;connecting&#39;).</p>
</td>
    </tr><tr>
    <td>data.stats.firstFragmentReceived</td><td><code>number</code></td><td><p>The time when the first fragment is received in ms (relative to &#39;connecting&#39;).</p>
</td>
    </tr><tr>
    <td>data.stats.firstFrameRendered</td><td><code>number</code></td><td><p>The time when the first frame is rendered in ms (relative to &#39;connecting&#39;).</p>
</td>
    </tr><tr>
    <td>data.stats.playable</td><td><code>number</code></td><td><p>The time when the buffer has enough data to start in ms (relative to &#39;connecting&#39;).</p>
</td>
    </tr><tr>
    <td>data.stats.playing</td><td><code>number</code></td><td><p>The time when the playback is started in ms (relative to &#39;connecting&#39;). It&#39;s the total startup time.</p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onPlay = function (event) {    console.log('Playing');    console.log('play stats: ' + JSON.stringify(event.data.stats));};config.events.onPlay = onPlay;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onPause"></a>

### "onPause"
The pause event to pass in the 'config.events' object at the setup call. Fires if playout is paused.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.reason</td><td><code><a href="#NanoPlayer..pausereason">pausereason</a></code></td><td><p>The reason of pausing.</p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onPause = function (event) {    console.log('Pause');    if (event.data.reason !== 'normal') {         alert('Paused with reason: ' + event.data.reason);    }};config.events.onPause = onPause;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onLoading"></a>

### "onLoading"
The load event to pass in the 'config.events' object at the setup call. Fires if playout was stopped or player is ready after setup and tries to play.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.connectDelay</td><td><code>number</code></td><td><p>The time in milliseconds to wait for initializing the connection to the server to get the stream. Is zero if no reconnect is imminent.</p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onLoading = function (event) {    console.log('Loading with delay of ' + event.data.connectDelay + ' milliseconds');};config.events.onLoading = onLoading;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onStartBuffering"></a>

### "onStartBuffering"
The start buffering event to pass in the 'config.events' object at the setup call. Fires if playout is started but no media is available.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object (empty).</p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onStartBuffering = function (event) {    console.log('Buffering');};config.events.onStartBuffering = onStartBuffering;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onStopBuffering"></a>

### "onStopBuffering"
The stop buffering event to pass in the 'config.events' object at the setup call. Fires if playout resumes after buffering.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object (empty).</p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onStopBuffering = function (event) {    console.log('Resume');};config.events.onStopBuffering = onStopBuffering;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onError"></a>

### "onError"
The error event to pass in the 'config.events' object at the setup call. Fires if any kind of error occures.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.code</td><td><code><a href="#NanoPlayer..errorcode">errorcode</a></code></td><td><p>The error code.</p>
</td>
    </tr><tr>
    <td>data.message</td><td><code>string</code></td><td><p>The error cause as human readable string.</p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onError = function (event) {    alert('Error: ' + event.data.code + ' ' + event.data.message);};config.events.onError = onError;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onStats"></a>

### "onStats"
The stats event to pass in the 'config.events' object at the setup call. Fires if the player has measured statistics.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.stats</td><td><code>object</code></td><td><p>The stats object.</p>
</td>
    </tr><tr>
    <td>data.stats.currentTime</td><td><code>number</code></td><td><p>The current time of the video.</p>
</td>
    </tr><tr>
    <td>data.stats.playout</td><td><code>object</code></td><td><p>The playout object.</p>
</td>
    </tr><tr>
    <td>data.stats.playout.start</td><td><code>number</code></td><td><p>The start play time of the video.</p>
</td>
    </tr><tr>
    <td>data.stats.playout.end</td><td><code>number</code></td><td><p>The end play time of the video.</p>
</td>
    </tr><tr>
    <td>data.stats.buffer</td><td><code>object</code></td><td><p>The buffer object.</p>
</td>
    </tr><tr>
    <td>data.stats.buffer.start</td><td><code>number</code></td><td><p>The start buffer time of the video.</p>
</td>
    </tr><tr>
    <td>data.stats.buffer.end</td><td><code>number</code></td><td><p>The end buffer time of the video.</p>
</td>
    </tr><tr>
    <td>data.stats.buffer.delay</td><td><code>object</code></td><td><p>The delay buffer object.</p>
</td>
    </tr><tr>
    <td>data.stats.buffer.delay.current</td><td><code>number</code></td><td><p>The current delay time.</p>
</td>
    </tr><tr>
    <td>data.stats.buffer.delay.avg</td><td><code>number</code></td><td><p>The average delay time over the last second.</p>
</td>
    </tr><tr>
    <td>data.stats.buffer.delay.min</td><td><code>number</code></td><td><p>The minimum delay time over the last second.</p>
</td>
    </tr><tr>
    <td>data.stats.buffer.delay.max</td><td><code>number</code></td><td><p>The maximum delay time over the last second.</p>
</td>
    </tr><tr>
    <td>data.stats.bitrate</td><td><code>object</code></td><td><p>The bitrate object.</p>
</td>
    </tr><tr>
    <td>data.stats.bitrate.current</td><td><code>number</code></td><td><p>The current bitrate in Bit/s. Is &#39;0&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>data.stats.bitrate.avg</td><td><code>number</code></td><td><p>The average bitrate in Bit/s over the last 10 seconds. Is &#39;0&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>data.stats.bitrate.min</td><td><code>number</code></td><td><p>The minimum bitrate in Bit/s over the last 10 seconds. Is &#39;0&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>data.stats.bitrate.max</td><td><code>number</code></td><td><p>The maximum bitrate in Bit/s over the last 10 seconds. Is &#39;0&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>data.stats.framerate</td><td><code>object</code></td><td><p>The framerate object.</p>
</td>
    </tr><tr>
    <td>data.stats.framerate.current</td><td><code>number</code></td><td><p>The current network framerate. Is &#39;0&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>data.stats.framerate.avg</td><td><code>number</code></td><td><p>The average network framerate over the last 10 seconds. Is &#39;0&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>data.stats.framerate.min</td><td><code>number</code></td><td><p>The minimum network framerate over the last 10 seconds. Is &#39;0&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>data.stats.framerate.max</td><td><code>number</code></td><td><p>The maximum network framerate over the last 10 seconds. Is &#39;0&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>data.stats.playbackrate</td><td><code>object</code></td><td><p>The playbackrate object. (since 4.14.1)</p>
</td>
    </tr><tr>
    <td>data.stats.playbackrate.current</td><td><code>number</code></td><td><p>The current video playbackrate. (since 4.14.1)</p>
</td>
    </tr><tr>
    <td>data.stats.playbackrate.avg</td><td><code>number</code></td><td><p>The average video playbackrate over the last 10 seconds. (since 4.14.1)</p>
</td>
    </tr><tr>
    <td>data.stats.playbackrate.min</td><td><code>number</code></td><td><p>The minimum video playbackrate over the last 10 seconds. (since 4.14.1)</p>
</td>
    </tr><tr>
    <td>data.stats.playbackrate.max</td><td><code>number</code></td><td><p>The maximum video playbackrate over the last 10 seconds. (since 4.14.1)</p>
</td>
    </tr><tr>
    <td>data.stats.buffergoal</td><td><code>object</code></td><td><p>The buffergoal object. Values used by the latency control (since 4.14.1)</p>
</td>
    </tr><tr>
    <td>data.stats.buffergoal.base</td><td><code>number</code></td><td><p>The suggested calculated buffergoal value depending on the latency control mode and playback conditions (since 4.14.1)</p>
</td>
    </tr><tr>
    <td>data.stats.buffergoal.real</td><td><code>number</code></td><td><p>The final calculated buffergoal value including offsets (since 4.14.1)</p>
</td>
    </tr><tr>
    <td>data.stats.buffergoal.min</td><td><code>number</code></td><td><p>The minimum possible buffergoal value. (since 4.14.1)</p>
</td>
    </tr><tr>
    <td>data.stats.buffergoal.max</td><td><code>number</code></td><td><p>The maximum possible buffergoal value. (since 4.14.1)</p>
</td>
    </tr><tr>
    <td>data.stats.quality</td><td><code>object</code></td><td><p>The video playback quality object.</p>
</td>
    </tr><tr>
    <td>data.stats.quality.corruptedVideoFrames</td><td><code>number</code></td><td><p>The total number of corrupted video frames.</p>
</td>
    </tr><tr>
    <td>data.stats.quality.corruptedVideoFramesCurrent</td><td><code>number</code></td><td><p>The number of corrupted video frames within the last second.</p>
</td>
    </tr><tr>
    <td>data.stats.quality.creationTime</td><td><code>number</code></td><td><p>The time in miliseconds since the start of the navigation and the creation of the video element.</p>
</td>
    </tr><tr>
    <td>data.stats.quality.droppedVideoFrames</td><td><code>number</code></td><td><p>The total number of dropped video frames.</p>
</td>
    </tr><tr>
    <td>data.stats.quality.droppedVideoFramesCurrent</td><td><code>number</code></td><td><p>The number of dropped video frames within the last second.</p>
</td>
    </tr><tr>
    <td>data.stats.quality.totalVideoFrames</td><td><code>number</code></td><td><p>The total number of created and dropped video frames since creation of the video element.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onStats = function (event) {    console.log('Stats: ' + JSON.stringify(event.data.stats));};config.events.onStats = onStats;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onMetaData"></a>

### "onMetaData"
The metadata event to pass in the 'config.events' object at the setup call. The config param 'playback.metadata' have to be set to true. Fires if the player receives metadata.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.handlerName</td><td><code>string</code></td><td><p>The name of the metadata handler.</p>
</td>
    </tr><tr>
    <td>data.message</td><td><code>*</code></td><td><p>The metadata message.</p>
</td>
    </tr><tr>
    <td>data.streamTime</td><td><code>number</code></td><td><p>The timestamp of the metadata in relation to currentTime.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onMetaData = function (event) {    console.log('MetaData: ' + JSON.stringify(event.data));};config.events.onMetaData = onMetaData;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onMute"></a>

### "onMute"
The mute event to pass in the 'config.events' object at the setup call. Fires if the player is muted.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.volume</td><td><code>number</code></td><td><p>The current volume in a range from 0.0 to 1.0.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onMute = function (event) {    console.log('Muted with volume: ' + event.data.volume);};config.events.onMute = onMute;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onUnmute"></a>

### "onUnmute"
The unmute event to pass in the 'config.events' object at the setup call. Fires if the player is unmuted.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.volume</td><td><code>number</code></td><td><p>The current volume in a range from 0.0 to 1.0.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onUnmute = function (event) {    console.log('Unmuted with volume: ' + event.data.volume);};config.events.onUnmute = onUnmute;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onVolumeChange"></a>

### "onVolumeChange"
The volume change event to pass in the 'config.events' object at the setup call. Fires if the player's volume has changed.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.volume</td><td><code>number</code></td><td><p>The current volume in a range from 0.0 to 1.0.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onVolumeChange = function (event) {    console.log('Volume: ' + event.data.volume);};config.events.onVolumeChange = onVolumeChange;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onStreamInfo"></a>

### "onStreamInfo"
The stream info event to pass in the 'config.events' object at the setup call. Fires if informations about a stream is available right before playback starts.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.streamInfo</td><td><code>object</code></td><td><p>The stream info object.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.url</td><td><code>string</code></td><td><p>The complete stream url with parameters.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.rtmp</td><td><code>object</code></td><td><p>The rtmp stream object.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.rtmo.url</td><td><code>string</code></td><td><p>The rtmp stream url.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.rtmp.streamname</td><td><code>string</code></td><td><p>The rtmp streamname.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.haveAudio</td><td><code>boolean</code></td><td><p>Indicates if the stream contains audio.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.haveVideo</td><td><code>boolean</code></td><td><p>Indicates if the stream contains video.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.audioInfo</td><td><code>object</code> | <code>null</code></td><td><p>The audio info object. Is &#39;null&#39; if the stream contains no audio.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.audioInfo.bitsPerSample</td><td><code>number</code> | <code>null</code></td><td><p>The bits per sample. Is &#39;null&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.audioInfo.sampleRate</td><td><code>number</code> | <code>null</code></td><td><p>The audio sample rate. Is &#39;null&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.audioInfo.channels</td><td><code>number</code> | <code>null</code></td><td><p>The number of audio channels. Is &#39;null&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.videoInfo</td><td><code>object</code> | <code>null</code></td><td><p>The stream info object. Is &#39;null&#39; if the stream contains no video.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.videoInfo.width</td><td><code>number</code> | <code>null</code></td><td><p>The width of the video. Is &#39;null&#39; if not available.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.videoInfo.height</td><td><code>number</code> | <code>null</code></td><td><p>The height of the video. Is &#39;null&#39; if not available.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.videoInfo.frameRate</td><td><code>number</code> | <code>null</code></td><td><p>The video frame rate. Is &#39;null&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onStreamInfo = function (event) {    console.log('StreamInfo: ' + JSON.stringify(event.data.streamInfo));};config.events.onStreamInfo = onStreamInfo;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onStreamInfoUpdate"></a>

### "onStreamInfoUpdate"
The stream info event to pass in the 'config.events' object at the setup call. Fires if the stream format has changed during playback.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.streamInfo</td><td><code>object</code></td><td><p>The stream info object.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.url</td><td><code>string</code></td><td><p>The complete stream url with parameters.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.haveAudio</td><td><code>boolean</code></td><td><p>Indicates if the stream contains audio.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.haveVideo</td><td><code>boolean</code></td><td><p>Indicates if the stream contains video.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.audioInfo</td><td><code>object</code> | <code>null</code></td><td><p>The audio info object. Is &#39;null&#39; if the stream contains no audio.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.audioInfo.bitsPerSample</td><td><code>number</code> | <code>null</code></td><td><p>The bits per sample. Is &#39;null&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.audioInfo.sampleRate</td><td><code>number</code> | <code>null</code></td><td><p>The audio sample rate. Is &#39;null&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.audioInfo.channels</td><td><code>number</code> | <code>null</code></td><td><p>The number of audio channels. Is &#39;null&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.videoInfo</td><td><code>object</code> | <code>null</code></td><td><p>The stream info object. Is &#39;null&#39; if the stream contains no video.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.videoInfo.width</td><td><code>number</code> | <code>null</code></td><td><p>The width of the video. Is &#39;null&#39; if not available.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.videoInfo.height</td><td><code>number</code> | <code>null</code></td><td><p>The height of the video. Is &#39;null&#39; if not available.</p>
</td>
    </tr><tr>
    <td>data.streamInfo.videoInfo.frameRate</td><td><code>number</code> | <code>null</code></td><td><p>The video frame rate. Is &#39;null&#39; if not available. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onStreamInfoUpdate = function (event) {    console.log('StreamInfo updated: ' + JSON.stringify(event.data.streamInfo));};config.events.onStreamInfoUpdate = onStreamInfoUpdate;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onWarning"></a>

### "onWarning"
The error event to pass in the 'config.events' object at the setup call. Fires if something is not as expected, but functionality works.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.message</td><td><code>string</code></td><td><p>The warning as human readable string.</p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onWarning = function (event) {    console.log('Warning: ' + event.data.message);};config.events.onWarning = onWarning;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onDestroy"></a>

### "onDestroy"
The destroy event to pass in the 'config.events' object at the setup call. Fires if the player is destroyed.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object (empty).</p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onDestroy = function (event) {    console.log('player destroy');};config.events.onDestroy = onDestroy;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onUpdateSourceInit"></a>

### "onUpdateSourceInit"
The event to signal that the update source request is initialized. This is always the start event, an completion event will follow.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.source</td><td><code>object</code></td><td><p>The current source object.</p>
</td>
    </tr><tr>
    <td>data.entry</td><td><code>object</code></td><td><p>The current source entry.</p>
</td>
    </tr><tr>
    <td>data.rule</td><td><code>string</code></td><td><p>The adaption switch rule.</p>
</td>
    </tr><tr>
    <td>data.options</td><td><code>object</code></td><td><p>The switch options object.</p>
</td>
    </tr><tr>
    <td>data.tag</td><td><code>string</code></td><td><p>The custom tag string given in the options object of the <a href="#NanoPlayer+updateSource">&#39;updateSource&#39;</a> call. Is an empty string if not set.</p>
</td>
    </tr><tr>
    <td>data.count</td><td><code>number</code></td><td><p>The count of the update source request to identify the paired start and completion event. The start event is <a href="#NanoPlayer..event_onUpdateSourceInit">&#39;onUpdateSourceInit&#39;</a> and completion events are <a href="NanoPlayer~events:onUpdateSourceSuccess">&#39;onUpdateSourceSuccess&#39;</a>, <a href="NanoPlayer#~events:onUpdateSourceFail">&#39;onUpdateSourceFail&#39;</a> and <a href="NanoPlayer#~events:onUpdateSourceAbort">&#39;onUpdateSourceAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>data.type</td><td><code>string</code></td><td><p>The switch type. Here always &#39;update&#39;.</p>
</td>
    </tr><tr>
    <td>data.id</td><td><code>number</code></td><td><p>The id of the update source request to identify the paired start and completion event. The start event is <a href="#NanoPlayer..event_onUpdateSourceInit">&#39;onUpdateSourceInit&#39;</a> and completion events are <a href="NanoPlayer~events:onUpdateSourceSuccess">&#39;onUpdateSourceSuccess&#39;</a>, <a href="NanoPlayer#~events:onUpdateSourceFail">&#39;onUpdateSourceFail&#39;</a> and <a href="NanoPlayer#~events:onUpdateSourceAbort">&#39;onUpdateSourceAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onUpdateSourceInit = function (event) {    console.log('update source init with source: ' + JSON.stringify(event.data.source) + ' and options: ' + JSON.stringify(event.data.options));    console.log('update source tag: ' + event.data.tag);    console.log('update source count: ' + event.data.count);};config.events.onUpdateSourceInit = onUpdateSourceInit;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onUpdateSourceSuccess"></a>

### "onUpdateSourceSuccess"
The event to signal that the update source request is succeeded. Fires if the source is updated. This is an completion event that follows on an start event.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.source</td><td><code>object</code></td><td><p>The current source object.</p>
</td>
    </tr><tr>
    <td>data.entry</td><td><code>object</code></td><td><p>The current source entry.</p>
</td>
    </tr><tr>
    <td>data.rule</td><td><code>string</code></td><td><p>The adaption switch rule.</p>
</td>
    </tr><tr>
    <td>data.tag</td><td><code>string</code></td><td><p>The custom tag string given in the options object of the <a href="#NanoPlayer+updateSource">&#39;updateSource&#39;</a> call. Is an empty string if not set.</p>
</td>
    </tr><tr>
    <td>data.count</td><td><code>number</code></td><td><p>The count of the update source request to identify the paired start and completion event. The start event is <a href="#NanoPlayer..event_onUpdateSourceInit">&#39;onUpdateSourceInit&#39;</a> and completion events are <a href="NanoPlayer~events:onUpdateSourceSuccess">&#39;onUpdateSourceSuccess&#39;</a>, <a href="NanoPlayer#~events:onUpdateSourceFail">&#39;onUpdateSourceFail&#39;</a> and <a href="NanoPlayer#~events:onUpdateSourceAbort">&#39;onUpdateSourceAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>data.type</td><td><code>string</code></td><td><p>The switch type. Here always &#39;update&#39;.</p>
</td>
    </tr><tr>
    <td>data.id</td><td><code>number</code></td><td><p>The id of the update source request to identify the paired start and completion event. The start event is <a href="#NanoPlayer..event_onUpdateSourceInit">&#39;onUpdateSourceInit&#39;</a> and completion events are <a href="NanoPlayer~events:onUpdateSourceSuccess">&#39;onUpdateSourceSuccess&#39;</a>, <a href="NanoPlayer#~events:onUpdateSourceFail">&#39;onUpdateSourceFail&#39;</a> and <a href="NanoPlayer#~events:onUpdateSourceAbort">&#39;onUpdateSourceAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onUpdateSourceSuccess = function (event) {    console.log('update source success with entry: ' + JSON.stringify(event.data.entry) + ', with tag: ' + event.data.tag + ' and count: ' + event.data.count);};config.events.onUpdateSourceSuccess = onUpdateSourceSuccess;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onUpdateSourceFail"></a>

### "onUpdateSourceFail"
The event to signal that the update source request is failed. Fired if an error occure during the update. This is an completion event that follows on an start event.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data.source</td><td><code>object</code></td><td><p>The current source object.</p>
</td>
    </tr><tr>
    <td>data.entry</td><td><code>object</code></td><td><p>The current source entry.</p>
</td>
    </tr><tr>
    <td>data.rule</td><td><code>string</code></td><td><p>The adaption switch rule.</p>
</td>
    </tr><tr>
    <td>data.code</td><td><code>object</code></td><td><p>The error code. Similar to the <a href="#NanoPlayer..errorcode">errorcodes</a>.</p>
</td>
    </tr><tr>
    <td>data.message</td><td><code>object</code></td><td><p>The error message.</p>
</td>
    </tr><tr>
    <td>data.tag</td><td><code>string</code></td><td><p>The custom tag string given in the options object of the <a href="#NanoPlayer+updateSource">&#39;updateSource&#39;</a> call. Is an empty string if not set.</p>
</td>
    </tr><tr>
    <td>data.count</td><td><code>number</code></td><td><p>The count of the update source request to identify the paired start and completion event. The start event is <a href="#NanoPlayer..event_onUpdateSourceInit">&#39;onUpdateSourceInit&#39;</a> and completion events are <a href="NanoPlayer~events:onUpdateSourceSuccess">&#39;onUpdateSourceSuccess&#39;</a>, <a href="NanoPlayer#~events:onUpdateSourceFail">&#39;onUpdateSourceFail&#39;</a> and <a href="NanoPlayer#~events:onUpdateSourceAbort">&#39;onUpdateSourceAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>data.type</td><td><code>string</code></td><td><p>The switch type. Here always &#39;update&#39;.</p>
</td>
    </tr><tr>
    <td>data.id</td><td><code>number</code></td><td><p>The id of the update source request to identify the paired start and completion event. The start event is <a href="#NanoPlayer..event_onUpdateSourceInit">&#39;onUpdateSourceInit&#39;</a> and completion events are <a href="NanoPlayer~events:onUpdateSourceSuccess">&#39;onUpdateSourceSuccess&#39;</a>, <a href="NanoPlayer#~events:onUpdateSourceFail">&#39;onUpdateSourceFail&#39;</a> and <a href="NanoPlayer#~events:onUpdateSourceAbort">&#39;onUpdateSourceAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onUpdateSourceFail = function (event) {    console.log('update source fail with entry: ' + JSON.stringify(event.data.entry) + ', with error code: ' + event.data.code + ' and error message: ' + event.data.message);    console.log('update source tag: ' + event.data.tag);    console.log('update source count: ' + event.data.count);};config.events.onUpdateSourceFail = onUpdateSourceFail;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onUpdateSourceAbort"></a>

### "onUpdateSourceAbort"
The event to signal that the update source request is aborted. Reasons can be an equal source ('equalsource'), a superseding ('superseded') or an to less time range between two 'updateSource' calls ('frequency'). This is an completion event that follows on an start event.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.source</td><td><code>object</code></td><td><p>The current source object.</p>
</td>
    </tr><tr>
    <td>data.entry</td><td><code>object</code></td><td><p>The current source entry.</p>
</td>
    </tr><tr>
    <td>data.rule</td><td><code>string</code></td><td><p>The adaption switch rule.</p>
</td>
    </tr><tr>
    <td>data.reason</td><td><code>string</code></td><td><p>The abort reason. Possible values are &#39;equalsource&#39;, &#39;superseded&#39; and &#39;frequency&#39;.</p>
</td>
    </tr><tr>
    <td>data.tag</td><td><code>string</code></td><td><p>The custom tag string given in the options object of the <a href="#NanoPlayer+updateSource">&#39;updateSource&#39;</a> call. Is an empty string if not set.</p>
</td>
    </tr><tr>
    <td>data.count</td><td><code>number</code></td><td><p>The count of the update source request to identify the paired start and completion event. The start event is <a href="NanoPlayer#~events:onUpdateSourceInit">&#39;onUpdateSourceInit&#39;</a>  and completion events are <a href="NanoPlayer#~events:onUpdateSourceSuccess">&#39;onUpdateSourceSuccess&#39;</a>, <a href="NanoPlayer#~events:onUpdateSourceFail">&#39;onUpdateSourceFail&#39;</a> and <a href="NanoPlayer#~events:onUpdateSourceAbort">&#39;onUpdateSourceAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>data.type</td><td><code>string</code></td><td><p>The switch type. Here always &#39;update&#39;.</p>
</td>
    </tr><tr>
    <td>data.id</td><td><code>number</code></td><td><p>The id of the update source request to identify the paired start and completion event. The start event is <a href="#NanoPlayer..event_onUpdateSourceInit">&#39;onUpdateSourceInit&#39;</a> and completion events are <a href="NanoPlayer~events:onUpdateSourceSuccess">&#39;onUpdateSourceSuccess&#39;</a>, <a href="NanoPlayer#~events:onUpdateSourceFail">&#39;onUpdateSourceFail&#39;</a> and <a href="NanoPlayer#~events:onUpdateSourceAbort">&#39;onUpdateSourceAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onUpdateSourceAbort = function (event) {    console.log('update source abort with entry: ' + JSON.stringify(event.data.entry) + ' and reason: ' + event.data.reason);    console.log('tag: ' + event.data.tag);    console.log('count: ' + event.data.count);};config.events.onUpdateSourceAbort = onUpdateSourceAbort;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onSwitchStreamInit"></a>

### "onSwitchStreamInit"
The event to signal that an stream switch request is initialized. Can be triggered by an adaptive rule (ABR) request or via ['switchStream'](#NanoPlayer+switchStream). This is always the start event, an completion event will follow.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.source</td><td><code>object</code></td><td><p>The current source object.</p>
</td>
    </tr><tr>
    <td>data.entry</td><td><code>object</code></td><td><p>The current source entry.</p>
</td>
    </tr><tr>
    <td>data.rule</td><td><code>string</code></td><td><p>The adaption switch rule.</p>
</td>
    </tr><tr>
    <td>data.options</td><td><code>object</code></td><td><p>The switch options object.</p>
</td>
    </tr><tr>
    <td>data.tag</td><td><code>string</code></td><td><p>A static string in format: {data.entry.h5live.rtmp.streamname} + &#39; streamSwitch &#39; + {data.id}.</p>
</td>
    </tr><tr>
    <td>data.count</td><td><code>number</code></td><td><p>The count of the switch stream request to identify the paired start and completion event. The start event is <a href="#NanoPlayer..event_onSwitchStreamInit">&#39;onSwitchStreamInit&#39;</a> and completion events are <a href="NanoPlayer~events:onSwitchStreamSuccess">&#39;onSwitchStreamSuccess&#39;</a>, <a href="NanoPlayer#~events:onSwitchStreamFail">&#39;onSwitchStreamFail&#39;</a> and <a href="NanoPlayer#~events:onSwitchStreamAbort">&#39;onSwitchStreamAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>data.type</td><td><code>string</code></td><td><p>The switch type. Possible values are &#39;up&#39;, &#39;down&#39; (in case of adaptive stream switch) and &#39;direct&#39; (switch via <a href="#NanoPlayer+switchStream">&#39;switchStream&#39;</a>).</p>
</td>
    </tr><tr>
    <td>data.id</td><td><code>number</code></td><td><p>The id of the switch stream request to identify the paired start and completion event. The start event is <a href="#NanoPlayer..event_onSwitchStreamInit">&#39;onSwitchStreamInit&#39;</a> and completion events are <a href="NanoPlayer~events:onSwitchStreamSuccess">&#39;onSwitchStreamSuccess&#39;</a>, <a href="NanoPlayer#~events:onSwitchStreamFail">&#39;onSwitchStreamFail&#39;</a> and <a href="NanoPlayer#~events:onSwitchStreamAbort">&#39;onSwitchStreamAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onSwitchStreamInit = function (event) {    console.log('switch stream init by rule ' + event.data.rule + ' from type ' + event.data.type + 'with entry: ' + JSON.stringify(event.data.entry) + ' and options: ' + JSON.stringify(event.data.options));    console.log('switch stream tag: ' + event.data.tag);    console.log('switch stream count: ' + event.data.count);};config.events.onSwitchStreamInit = onSwitchStreamInit;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onSwitchStreamSuccess"></a>

### "onSwitchStreamSuccess"
The event to signal that the switch stream request is succeeded. Fires if the source is updated. This is an completion event that follows on an start event.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.source</td><td><code>object</code></td><td><p>The current source object.</p>
</td>
    </tr><tr>
    <td>data.entry</td><td><code>object</code></td><td><p>The current source entry.</p>
</td>
    </tr><tr>
    <td>data.rule</td><td><code>string</code></td><td><p>The adaption switch rule.</p>
</td>
    </tr><tr>
    <td>data.tag</td><td><code>string</code></td><td><p>A static string in format: {data.entry.h5live.rtmp.streamname} + &#39; streamSwitch &#39; + {data.id}.</p>
</td>
    </tr><tr>
    <td>data.count</td><td><code>number</code></td><td><p>The count of the switch stream request to identify the paired start and completion event. The start event is <a href="#NanoPlayer..event_onSwitchStreamInit">&#39;onSwitchStreamInit&#39;</a> and completion events are <a href="NanoPlayer~events:onSwitchStreamSuccess">&#39;onSwitchStreamSuccess&#39;</a>, <a href="NanoPlayer#~events:onSwitchStreamFail">&#39;onSwitchStreamFail&#39;</a> and <a href="NanoPlayer#~events:onSwitchStreamAbort">&#39;onSwitchStreamAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>data.type</td><td><code>string</code></td><td><p>The switch type. Possible values are &#39;up&#39;, &#39;down&#39; (in case of adaptive stream switch) and &#39;direct&#39; (switch via <a href="#NanoPlayer+switchStream">&#39;switchStream&#39;</a>).</p>
</td>
    </tr><tr>
    <td>data.id</td><td><code>number</code></td><td><p>The id of the switch stream request to identify the paired start and completion event. The start event is <a href="#NanoPlayer..event_onSwitchStreamInit">&#39;onSwitchStreamInit&#39;</a> and completion events are <a href="NanoPlayer~events:onSwitchStreamSuccess">&#39;onSwitchStreamSuccess&#39;</a>, <a href="NanoPlayer#~events:onSwitchStreamFail">&#39;onSwitchStreamFail&#39;</a> and <a href="NanoPlayer#~events:onSwitchStreamAbort">&#39;onSwitchStreamAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onSwitchStreamSuccess = function (event) {    console.log('switch stream success by rule ' + event.data.rule + ' from type ' + event.data.type + 'with entry: ' + JSON.stringify(event.data.entry) + ' with tag: ' + event.data.tag + ' and count: ' + event.data.count);};config.events.onSwitchStreamSuccess = onSwitchStreamSuccess;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onSwitchStreamFail"></a>

### "onSwitchStreamFail"
The event to signal that the switch stream request is failed. Fired if an error occure during the update. This is an completion event that follows on an start event.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data.source</td><td><code>object</code></td><td><p>The current source object.</p>
</td>
    </tr><tr>
    <td>data.entry</td><td><code>object</code></td><td><p>The current source entry.</p>
</td>
    </tr><tr>
    <td>data.rule</td><td><code>string</code></td><td><p>The adaption switch rule.</p>
</td>
    </tr><tr>
    <td>data.code</td><td><code>object</code></td><td><p>The error code. Similar to the <a href="#NanoPlayer..errorcode">errorcodes</a>.</p>
</td>
    </tr><tr>
    <td>data.message</td><td><code>object</code></td><td><p>The error message.</p>
</td>
    </tr><tr>
    <td>data.tag</td><td><code>string</code></td><td><p>A static string in format: {data.entry.h5live.rtmp.streamname} + &#39; streamSwitch &#39; + {data.id}.</p>
</td>
    </tr><tr>
    <td>data.count</td><td><code>number</code></td><td><p>The count of the switch stream request to identify the paired start and completion event. The start event is <a href="#NanoPlayer..event_onSwitchStreamInit">&#39;onSwitchStreamInit&#39;</a> and completion events are <a href="NanoPlayer~events:onSwitchStreamSuccess">&#39;onSwitchStreamSuccess&#39;</a>, <a href="NanoPlayer#~events:onSwitchStreamFail">&#39;onSwitchStreamFail&#39;</a> and <a href="NanoPlayer#~events:onSwitchStreamAbort">&#39;onSwitchStreamAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>data.type</td><td><code>string</code></td><td><p>The switch type. Possible values are &#39;up&#39;, &#39;down&#39; (in case of adaptive stream switch) and &#39;direct&#39; (switch via <a href="#NanoPlayer+switchStream">&#39;switchStream&#39;</a>).</p>
</td>
    </tr><tr>
    <td>data.id</td><td><code>number</code></td><td><p>The id of the switch stream request to identify the paired start and completion event. The start event is <a href="#NanoPlayer..event_onSwitchStreamInit">&#39;onSwitchStreamInit&#39;</a> and completion events are <a href="NanoPlayer~events:onSwitchStreamSuccess">&#39;onSwitchStreamSuccess&#39;</a>, <a href="NanoPlayer#~events:onSwitchStreamFail">&#39;onSwitchStreamFail&#39;</a> and <a href="NanoPlayer#~events:onSwitchStreamAbort">&#39;onSwitchStreamAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onSwitchStreamFail = function (event) {    console.log('switch stream fail by rule ' + event.data.rule + ' from type ' + event.data.type + 'with entry: ' + JSON.stringify(event.data.entry) + ' with error code: ' + event.data.code + ' and error message: ' + event.data.message);    console.log('switch stream tag: ' + event.data.tag);    console.log('switch stream count: ' + event.data.count);};config.events.onSwitchStreamFail = onSwitchStreamFail;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onSwitchStreamAbort"></a>

### "onSwitchStreamAbort"
The event to signal that the switch stream request is aborted. Reasons can be an equal source ('equalsource'), a superseding ('superseded') or an to less time range between two 'switchStream' calls ('frequency'). This is an completion event that follows on an start event.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.source</td><td><code>object</code></td><td><p>The current source object.</p>
</td>
    </tr><tr>
    <td>data.entry</td><td><code>object</code></td><td><p>The current source entry.</p>
</td>
    </tr><tr>
    <td>data.rule</td><td><code>string</code></td><td><p>The adaption switch rule.</p>
</td>
    </tr><tr>
    <td>data.reason</td><td><code>string</code></td><td><p>The abort reason. Possible values are &#39;equalsource&#39;, &#39;superseded&#39; and &#39;frequency&#39;.</p>
</td>
    </tr><tr>
    <td>data.tag</td><td><code>string</code></td><td><p>A static string in format: {data.entry.h5live.rtmp.streamname} + &#39; streamSwitch &#39; + {data.id}.</p>
</td>
    </tr><tr>
    <td>data.count</td><td><code>number</code></td><td><p>The count of the switch stream request to identify the paired start and completion event. The start event is <a href="NanoPlayer#~events:onSwitchStreamInit">&#39;onSwitchStreamInit&#39;</a>  and completion events are <a href="NanoPlayer#~events:onSwitchStreamSuccess">&#39;onSwitchStreamSuccess&#39;</a>, <a href="NanoPlayer#~events:onSwitchStreamFail">&#39;onSwitchStreamFail&#39;</a> and <a href="NanoPlayer#~events:onSwitchStreamAbort">&#39;onSwitchStreamAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>data.type</td><td><code>string</code></td><td><p>The switch type. Possible values are &#39;up&#39;, &#39;down&#39; (in case of adaptive stream switch) and &#39;direct&#39; (switch via <a href="#NanoPlayer+switchStream">&#39;switchStream&#39;</a>).</p>
</td>
    </tr><tr>
    <td>data.id</td><td><code>number</code></td><td><p>The id of the switch stream request to identify the paired start and completion event. The start event is <a href="#NanoPlayer..event_onSwitchStreamInit">&#39;onSwitchStreamInit&#39;</a> and completion events are <a href="NanoPlayer~events:onSwitchStreamSuccess">&#39;onSwitchStreamSuccess&#39;</a>, <a href="NanoPlayer#~events:onSwitchStreamFail">&#39;onSwitchStreamFail&#39;</a> and <a href="NanoPlayer#~events:onSwitchStreamAbort">&#39;onSwitchStreamAbort&#39;</a></p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onSwitchStreamAbort = function (event) {    console.log('switch stream abort by rule ' + event.data.rule + ' from type ' + event.data.type + 'with entry: ' + JSON.stringify(event.data.entry) + ' with reason: ' + event.data.reason));    console.log('tag: ' + event.data.tag);    console.log('count: ' + event.data.count);};config.events.onSwitchStreamAbort = onSwitchStreamAbort;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onServerInfo"></a>

### "onServerInfo"
The server info event to pass in the 'config.events' object at the setup call. Fires if informations about the connected h5live server is available.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.serverInfo</td><td><code>object</code></td><td><p>The server info object.</p>
</td>
    </tr><tr>
    <td>data.serverInfo.applicationServerName</td><td><code>string</code></td><td><p>The application name of the h5live server.</p>
</td>
    </tr><tr>
    <td>data.serverInfo.applicationServerVersion</td><td><code>object</code></td><td><p>The application version of the h5live server.</p>
</td>
    </tr><tr>
    <td>data.serverInfo.hostname</td><td><code>string</code></td><td><p>The hostname of the h5live server.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onServerInfo = function (event) {    console.log('ServerInfo: ' + JSON.stringify(event.data.serverInfo));};config.events.onServerInfo = onServerInfo;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..event_onFullscreenChange"></a>

### "onFullscreenChange"
The fullscreen change event to pass in the 'config.events' object at the setup call. Fires if the fullscreen mode of the player has changed.

**Kind**: event emitted by [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>name</td><td><code>string</code></td><td><p>The event name.</p>
</td>
    </tr><tr>
    <td>player</td><td><code>string</code></td><td><p>The player name (id of the playerDiv).</p>
</td>
    </tr><tr>
    <td>id</td><td><code>string</code></td><td><p>The unique id of the player instance.</p>
</td>
    </tr><tr>
    <td>version</td><td><code>string</code></td><td><p>The version of the player.</p>
</td>
    </tr><tr>
    <td>data</td><td><code>object</code></td><td><p>The data object.</p>
</td>
    </tr><tr>
    <td>data.entered</td><td><code>boolean</code></td><td><p>Indicates if the player has entered fullscreen mode.</p>
</td>
    </tr><tr>
    <td>state</td><td><code><a href="#NanoPlayer..state">state</a></code></td><td><p>The player state.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayervar onFullscreenChange = function (event) {    console.log('FullscreenChange');    if (event.data.entered === true) {         console.log('Fullscreen Mode Entered');    }};config.events.onFullscreenChange = onFullscreenChange;player.setup(config).then(function (config) {    console.log('setup ok with config: ' + JSON.stringify(config));}, function (error) {    console.log(error);});
```
<a name="NanoPlayer..config"></a>

### NanoPlayer~config : <code>object</code>
The config object to pass as param for the 'setup' call.

**Kind**: inner typedef of [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [NanoPlayer.setup](#NanoPlayer+setup)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>source</td><td><code>object</code></td><td></td><td><p>The object to configure the source to play, one of the following properties have to be set.</p>
</td>
    </tr><tr>
    <td>[source.entries]</td><td><code><a href="#NanoPlayer..entry">Array.&lt;entry&gt;</a></code></td><td></td><td><p>The source entries array for a set of streams. USE INSTEAD OF SOURCE.H5LIVE. Used to configure stream entries. Can have one to many &#39;entry&#39; objects. Only one existing entry is similar than a single source. In this case no entries options are needed.</p>
</td>
    </tr><tr>
    <td>[source.startIndex]</td><td><code>number</code></td><td><code>0</code></td><td><p>The index of the entry to start playback with. Can be in the range from 0 to &#39;entries.length-1&#39;.</p>
</td>
    </tr><tr>
    <td>[source.defaults]</td><td><code>object</code></td><td></td><td><p>The object to configure the source entries defaults.</p>
</td>
    </tr><tr>
    <td>[source.defaults.service]</td><td><code>string</code></td><td></td><td><p>The defaults service.  If a service is set, the <code>h5live.server</code> object and the <code>h5live.rtmp.url</code> in each entry can be omitted. In this case defaults will be applied internally. Values for <code>h5live.server</code> and/or <code>h5live.rtmp.url</code> that are defined explicitly in the entry have priority. The available value for <code>defaults.service</code> is <code>&#39;bintu&#39;</code> for using the standard <strong>nanoStream Cloud</strong>.</p>
</td>
    </tr><tr>
    <td>[source.options]</td><td><code>object</code></td><td></td><td><p>The object to configure the source entries options.</p>
</td>
    </tr><tr>
    <td>[source.options.switch]</td><td><code>object</code></td><td></td><td><p>The object to configure the stream switch options like method etc.</p>
</td>
    </tr><tr>
    <td>[source.options.switch.method]</td><td><code>string</code></td><td><code>&quot;server&quot;</code></td><td><p>The update method. Possible values are &#39;server&#39; (default) and &#39;client&#39;.</p>
</td>
    </tr><tr>
    <td>[source.options.switch.pauseOnError]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If set the player stops if an error occure during the stream switch. Default is false.</p>
</td>
    </tr><tr>
    <td>[source.options.switch.forcePlay]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If set the player starts playback in case the player is paused. Default is true.</p>
</td>
    </tr><tr>
    <td>[source.options.switch.fastStart]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>Only if method is &#39;server&#39;. Tries to accelerate the startup time of the new source. Default is false.</p>
</td>
    </tr><tr>
    <td>[source.options.switch.timeout]</td><td><code>number</code></td><td><code>20</code></td><td><p>The timeout for the update source request in seconds. If reached the error 4006 will thrown in the <a href="NanoPlayer#~event:onUpdateSourceFail">&#39;onUpdateSourceFail&#39;</a> and the <a href="NanoPlayer#~event:onSwitchStreamFail">&#39;onSwitchStreamFail&#39;</a> event. Default is 20 seconds, valid range is between 5 and 30.</p>
</td>
    </tr><tr>
    <td>[source.options.switch.tag]</td><td><code>string</code></td><td></td><td><p>A custom field that can be any string like &#39;stream-800k&#39; or &#39;720p&#39;. This tag will be returned in any completion event of the &#39;updateSource&#39; request like &#39;onUpdateSourceSuccess&#39;, &#39;onUpdateSourceFail&#39; and &#39;onUpdateSourceAbort&#39;.</p>
</td>
    </tr><tr>
    <td>[source.options.adaption]</td><td><code>object</code></td><td></td><td><p>The object to set an adaption for switching.</p>
</td>
    </tr><tr>
    <td>[source.options.adaption.rule]</td><td><code>string</code></td><td><code>&quot;none&quot;</code></td><td><p>The switch rule if multiple entries are defined. Possible values are &#39;deviationOfMean&#39; (ABR automatic), &#39;deviationOfMean2&#39; (ABR automatic) and &#39;none&#39; (default, means only manual stream switch via &#39;switchStream&#39; possible).</p>
</td>
    </tr><tr>
    <td>[source.options.adaption.downStep]</td><td><code>number</code></td><td><code>1</code></td><td><p>The minimum number of steps during a ABR down switch (&#39;deviationOfMean&#39; and &#39;deviationOfMean2&#39; only).</p>
</td>
    </tr><tr>
    <td>[source.h5live]</td><td><code>object</code></td><td></td><td><p>DEPRECATED. PLEASE USE ENTRIES!!! WILL BE OVERWRITTEN IN CASE AT LEAST ONE &#39;ENTRY&#39; IS DEFINED IN &#39;ENTRIES&#39; ARRAY. The h5live object to configure the h5live connection.</p>
</td>
    </tr><tr>
    <td>source.h5live.server</td><td><code>object</code></td><td></td><td><p>The h5live server object.</p>
</td>
    </tr><tr>
    <td>[source.h5live.server.websocket]</td><td><code>string</code></td><td></td><td><p>The h5live websocket url.</p>
</td>
    </tr><tr>
    <td>[source.h5live.server.progressive]</td><td><code>string</code></td><td></td><td><p>The h5live progressive download url.</p>
</td>
    </tr><tr>
    <td>[source.h5live.server.hls]</td><td><code>string</code></td><td></td><td><p>The h5live hls url. Have to be set for playback on iOS 10 or higher. iOS 9 or lower is not supported.</p>
</td>
    </tr><tr>
    <td>[source.h5live.token]</td><td><code>string</code></td><td></td><td><p>The h5live server token.</p>
</td>
    </tr><tr>
    <td>[source.h5live.rtmp]</td><td><code>object</code></td><td></td><td><p>The rtmp playout object for h5live playback.</p>
</td>
    </tr><tr>
    <td>source.h5live.rtmp.url</td><td><code>string</code></td><td></td><td><p>The rtmp playout url. Have to include the domain, port and application e.g. &#39;rtmp://example.com:80/live&#39;.</p>
</td>
    </tr><tr>
    <td>source.h5live.rtmp.streamname</td><td><code>string</code></td><td></td><td><p>The rtmp streamname.</p>
</td>
    </tr><tr>
    <td>[source.h5live.security]</td><td><code>object</code></td><td></td><td><p>The h5live security object for h5live playback.</p>
</td>
    </tr><tr>
    <td>source.h5live.security.token</td><td><code>string</code></td><td></td><td><p>The security service token.</p>
</td>
    </tr><tr>
    <td>source.h5live.security.expires</td><td><code>string</code></td><td></td><td><p>The time the token expires (system time).</p>
</td>
    </tr><tr>
    <td>source.h5live.security.options</td><td><code>string</code></td><td></td><td><p>The security options.</p>
</td>
    </tr><tr>
    <td>source.h5live.security.tag</td><td><code>string</code></td><td></td><td><p>The custom tag to decrypt the token.</p>
</td>
    </tr><tr>
    <td>[source.h5live.params]</td><td><code>object</code></td><td></td><td><p>The params object to pass custom query parameters over the h5live server connection. Parameters can be passed as key/value pairs.</p>
</td>
    </tr><tr>
    <td>[source.bintu]</td><td><code>object</code></td><td></td><td><p>DEPRECATED. PLEASE USE ENTRIES!!! WILL BE OVERWRITTEN IN CASE AT LEAST ONE &#39;ENTRY&#39; IS DEFINED IN &#39;ENTRIES&#39; ARRAY. An bintu object to get sources.</p>
</td>
    </tr><tr>
    <td>source.bintu.streamid</td><td><code>string</code></td><td></td><td><p>The bintu stream id.</p>
</td>
    </tr><tr>
    <td>[source.bintu.apiurl]</td><td><code>string</code></td><td><code>&quot;https://bintu.nanocosmos.de&quot;</code></td><td><p>The bintu api url.</p>
</td>
    </tr><tr>
    <td>[source.hls]</td><td><code>string</code></td><td></td><td><p>DEPRECATED. PLEASE USE ENTRIES!!! WILL BE OVERWRITTEN IN CASE AT LEAST ONE &#39;ENTRY&#39; IS DEFINED IN &#39;ENTRIES&#39; ARRAY. An hls playout url as string.</p>
</td>
    </tr><tr>
    <td>[playback]</td><td><code>object</code></td><td></td><td><p>The object to configure the playback.</p>
</td>
    </tr><tr>
    <td>[playback.autoplay]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>Enable/disable autoplay (default: true). <br><b>IMPORTANT</b>: Browsers (mostly mobile) with stricter autoplay policy only allow autoplay with muted audio or within a user interaction (tap, click etc.). To allow autoplay in this case set the &#39;muted&#39; property to &#39;true&#39;. See our <a href="https://www.nanocosmos.de/blog/2018/03/autoplay-on-web-pages-with-h5live-player-for-ultra-low-latency-live-streams/"><b>nanocosmos-blog</b></a> for more informations.</p>
</td>
    </tr><tr>
    <td>[playback.automute]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>Enable/disable automute (default: false). <br><b>IMPORTANT</b>: Browsers (mostly mobile) with stricter autoplay policy only allow autoplay with muted audio or within a user interaction (tap, click etc.). With &#39;autoplay = true&#39; and this option enabled the player will be muted to allow autoplay in case the browsers policy restricted autoplay.</p>
</td>
    </tr><tr>
    <td>[playback.muted]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>Mute/unmute the player (default: false). <br><b>IMPORTANT</b>: Browsers (mostly mobile) with stricter autoplay policy only allow autoplay with muted audio. To allow autoplay set the &#39;muted&#39; property to &#39;true&#39;. See property &#39;autoplay&#39; for more informations.</p>
</td>
    </tr><tr>
    <td>[playback.latencyControlMode]</td><td><code>string</code></td><td><code>&quot;classic&quot;</code></td><td><p>The latency control mode of the player - possible values: &quot;classic&quot;, &quot;fastadaptive&quot;, &quot;balancedadaptive&quot;</p>
</td>
    </tr><tr>
    <td>[playback.metadata]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>Enable/disable metadata (default: false).</p>
</td>
    </tr><tr>
    <td>[playback.forceTech]</td><td><code>string</code></td><td></td><td><p>Force the player to use this tech - possible values: &quot;h5live&quot;, &quot;flash&quot;, &quot;hls.native&quot;</p>
</td>
    </tr><tr>
    <td>[playback.flashplayer]</td><td><code>string</code></td><td></td><td><p>A absolute or relative path to the &quot;nano.player.swf&quot;. If not set the player will be required from the base path.</p>
</td>
    </tr><tr>
    <td>[playback.videoId]</td><td><code>string</code> | <code>Array.string</code></td><td></td><td><p>One or two element ids of existing video tags that should be used for playback. No new element(s) will be created and after destroy it/they will be kept. Can be a string (old, only one element) or a string array with one or two (iOS ONLY!) element ids. Two video elements are required only for stream switching on iOS, MSE playback uses only one video tag. If only one element id is given on iOS the second video tag will be created by the player.</p>
</td>
    </tr><tr>
    <td>[playback.keepConnection]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If enabled the player will have always a connection to the h5live server. NOTE: not recommended for general use</p>
</td>
    </tr><tr>
    <td>[playback.allowSafariHlsFallback]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If enabled the player will select the playback method in Safari Mac OS X and utilize H5Live low latency HLS if appropriate.</p>
</td>
    </tr><tr>
    <td>[playback.crossOrigin]</td><td><code>string</code></td><td><code>&quot;not-set&quot;</code></td><td><p>Sets or disables the native &quot;crossOrigin&quot; attribute for all internal video elements and images (poster). Possible values are &quot;anonymous&quot;, &quot;use-credentials&quot; and &quot;not-set&quot; (default). If &quot;not-set&quot; is used the attribute will not be added.</p>
</td>
    </tr><tr>
    <td>[playback.mediaErrorRecoveries]</td><td><code>number</code></td><td><code>3</code></td><td><p>The number of allowed media error recoveries within a minute. If threshold is reached the last error will be thrown and playback pauses. Possible recoverable error codes are 3003 (decode error), 3100 (media source ended) and 1008 (hls playback error). See <a href="#NanoPlayer..errorcode">errorcodes</a>.</p>
</td>
    </tr><tr>
    <td>[playback.metadataLowDelay]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If enabled this mode for metadata processing is preventing occasionally delayed metadata on iOS. To use legacy mode set to false. The setting <code>playback.metadata</code> has to be enabled. IOS ONLY</p>
</td>
    </tr><tr>
    <td>[playback.reconnect]</td><td><code>object</code></td><td></td><td><p>The reconnect object to configure the reconnect settings. See <a href="#NanoPlayer..errorcode">errorcodes</a> for reconnect possibility.</p>
</td>
    </tr><tr>
    <td>playback.reconnect.minDelay</td><td><code>number</code></td><td><code>2</code></td><td><p>The minimum time to reconnect in seconds. The lowest possible value is 1 sec.</p>
</td>
    </tr><tr>
    <td>playback.reconnect.maxDelay</td><td><code>number</code></td><td><code>10</code></td><td><p>The maximum time to reconnect in seconds.</p>
</td>
    </tr><tr>
    <td>playback.reconnect.delaySteps</td><td><code>number</code></td><td><code>10</code></td><td><p>This number of steps till the maximum delay should reached.</p>
</td>
    </tr><tr>
    <td>playback.reconnect.maxRetries</td><td><code>number</code></td><td><code>10</code></td><td><p>The maximum count of reconnect tries. If set to zero no reconnect will be done.</p>
</td>
    </tr><tr>
    <td>[playback.timeouts]</td><td><code>object</code></td><td></td><td><p>The timeouts object to configure the timeouts for playback.</p>
</td>
    </tr><tr>
    <td>playback.timeouts.loading</td><td><code>number</code></td><td><code>20</code></td><td><p>The timeout for the loading state in seconds, range from 10 - 60 seconds. If reached the player will be stopped with reason &#39;streamnotfound&#39; and error 2001 will be thrown. Will be cleared if player goes to playing state.</p>
</td>
    </tr><tr>
    <td>playback.timeouts.buffering</td><td><code>number</code></td><td><code>20</code></td><td><p>The timeout for the buffering state in seconds, range from 10 - 60 seconds. If reached the player will be stopped with reason &#39;buffer&#39; and error 2002 will be thrown. Will be cleared if player goes to playing state again.</p>
</td>
    </tr><tr>
    <td>playback.timeouts.connecting</td><td><code>number</code></td><td><code>5</code></td><td><p>The timeout for establishing the websocket connection, range from 5 - 30 seconds. If reached the player will be stopped with reason &#39;connectionclose&#39; and error 4106 will be thrown. WEBSOCKET ONLY, FOR IOS ONLY IF METADATA IS ENABLED</p>
</td>
    </tr><tr>
    <td>[style]</td><td><code>object</code></td><td></td><td><p>The object to configure the style of the player.</p>
</td>
    </tr><tr>
    <td>[style.width]</td><td><code>string</code></td><td><code>&quot;640px&quot;</code></td><td><p>The width of the player in pixels (e.g 320px) or percentage (80%) (height or aspectratio have to be set too). Use &#39;auto&#39; to keep the parents size (height and aspectratio have no effect).</p>
</td>
    </tr><tr>
    <td>[style.height]</td><td><code>string</code></td><td></td><td><p>The height of the player in pixels (e.g 240px) or percentage (45%)  (width or aspectratio have to be set too). Use &#39;auto&#39; to keep the parents size (width and aspectratio have no effect).</p>
</td>
    </tr><tr>
    <td>[style.aspectratio]</td><td><code>string</code></td><td><code>&quot;16/9&quot;</code></td><td><p>The aspectratio of the player (e.g. 16/9) (width or height have to be set too).</p>
</td>
    </tr><tr>
    <td>[style.controls]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>Show/hide video controls.</p>
</td>
    </tr><tr>
    <td>[style.interactive]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>Enable/disable interactivity of the player on click/touch.</p>
</td>
    </tr><tr>
    <td>[style.view]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>Enable/disable view port handling/animations.</p>
</td>
    </tr><tr>
    <td>[style.scaling]</td><td><code>string</code></td><td><code>&quot;letterbox&quot;</code></td><td><p>Set&#39;s the display mode for the video inside the player - possible values: &quot;letterbox&quot;, &quot;fill&quot;, &quot;crop&quot;, &quot;original&quot;, &quot;resize&quot;.</p>
</td>
    </tr><tr>
    <td>[style.keepFrame]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true the last played frame will be displayed after a pause.</p>
</td>
    </tr><tr>
    <td>[style.displayAudioOnly]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true a audio symbol will be shown in case of a stream with audio only.</p>
</td>
    </tr><tr>
    <td>[style.audioPlayer]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true a player will be created as an audio player without video functionality. Controls can be enabled/disabled. The size can be customized via &#39;width&#39; and &#39;height&#39;. Default is 640px * 51px.</p>
</td>
    </tr><tr>
    <td>[style.displayMutedAutoplay]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true a muted audio symbol will be shown in case of muted autoplay.</p>
</td>
    </tr><tr>
    <td>[style.fullScreenControl]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true shows fullscreen control symbol in player controls.</p>
</td>
    </tr><tr>
    <td>[style.backgroundColor]</td><td><code>string</code></td><td><code>&quot;black&quot;</code></td><td><p>Sets the background color of the video element - possible values: html colors (&quot;red&quot;, &quot;blue&quot;, ...), hex color codes (&quot;#FACAFD&quot;, &quot;#FCEC66&quot;, ...) and rgba color values (&quot;rgba(255,0,0,1)&quot;, &quot;rgba(0,255,0,0.7)&quot;, ...).</p>
</td>
    </tr><tr>
    <td>[style.centerView]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>Enable/disable the animations and icons in the center of the player&#39;s view.</p>
</td>
    </tr><tr>
    <td>[style.symbolColor]</td><td><code>string</code></td><td><code>&quot;rgba(244,233,233,1)&quot;</code></td><td><p>Sets the color of the symbols used in centerView and controls - The given color string can be a valid css (case insensitive) keyword, hex code with/without alpha, rgb, rgba, hsl or hsla. Example values: &quot;white&quot;, &quot;#ffffff&quot;, &quot;rgba(237,125,14,0.5)&quot;.</p>
</td>
    </tr><tr>
    <td>[style.controlBarColor]</td><td><code>string</code></td><td><code>&quot;rgba(0,0,0,0.5)&quot;</code></td><td><p>Sets the color of the control bar - The given color string can be a valid css (case insensitive) keyword, hex code with/without alpha, rgb, rgba, hsl or hsla. Example values: &quot;white&quot;, &quot;#ffffff&quot;, &quot;rgba(237,125,14,0.5)&quot;.</p>
</td>
    </tr><tr>
    <td>[style.buttonAnimation]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true all buttons have short animations at &#39;mouseover&#39; and &#39;click&#39;.</p>
</td>
    </tr><tr>
    <td>[style.buttonHighlighting]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true all buttons are slightly highlighted at hover.</p>
</td>
    </tr><tr>
    <td>[style.buttonCursor]</td><td><code>string</code></td><td><code>&quot;pointer&quot;</code></td><td><p>Sets the cursor of all buttons. Possible values are valid css cursor values like &#39;default&#39; or &#39;pointer&#39;.</p>
</td>
    </tr><tr>
    <td>[style.poster]</td><td><code>string</code></td><td></td><td><p>Sets a poster image to the player that is visible before and after playback. That can be every valid source of an IMG element. Valid sources are e.g. &#39;./assets/poster.png&#39; or &#39;https://[YOURDOMAIN]/assets/poster.gif&#39;. The poster will be displayed &#39;letterbox&#39;.</p>
</td>
    </tr><tr>
    <td>[style.fullScreenBackgroundColor]</td><td><code>string</code></td><td><code>&quot;inherit&quot;</code></td><td><p>Sets the background color in fullscreen mode of the video element. If not set it inherits from <code>style.backgroundColor</code> - possible values: html colors (&quot;red&quot;, &quot;blue&quot;, ...), hex color codes (&quot;#FACAFD&quot;, &quot;#FCEC66&quot;, ...) and rgba color values (&quot;rgba(255,0,0,1)&quot;, &quot;rgba(0,255,0,0.7)&quot;, ...).</p>
</td>
    </tr><tr>
    <td>[events]</td><td><code>object</code></td><td></td><td><p>The object to set handlers to the player events.</p>
</td>
    </tr><tr>
    <td>[events.onReady]</td><td><code>function</code></td><td></td><td><p>Fires if the player is ready to play after successful setup.</p>
</td>
    </tr><tr>
    <td>[events.onPlay]</td><td><code>function</code></td><td></td><td><p>Fires if playout is started.</p>
</td>
    </tr><tr>
    <td>[events.onPause]</td><td><code>function</code></td><td></td><td><p>Fires if playout is paused.</p>
</td>
    </tr><tr>
    <td>[events.onLoading]</td><td><code>function</code></td><td></td><td><p>Fires if playout was stopped or player is ready after setup and tries to play.</p>
</td>
    </tr><tr>
    <td>[events.onStartBuffering]</td><td><code>function</code></td><td></td><td><p>Fires if playout is started but no media is available.</p>
</td>
    </tr><tr>
    <td>[events.onStopBuffering]</td><td><code>function</code></td><td></td><td><p>Fires if playout resumes after buffering.</p>
</td>
    </tr><tr>
    <td>[events.onError]</td><td><code>function</code></td><td></td><td><p>Fires if any kind of error occures.</p>
</td>
    </tr><tr>
    <td>[events.onStats]</td><td><code>function</code></td><td></td><td><p>Fires if the player has measured statistics.</p>
</td>
    </tr><tr>
    <td>[events.onMetaData]</td><td><code>function</code></td><td></td><td><p>Fires if the player has received metadata.</p>
</td>
    </tr><tr>
    <td>[events.onMute]</td><td><code>function</code></td><td></td><td><p>Fires if the player is muted.</p>
</td>
    </tr><tr>
    <td>[events.onUnmute]</td><td><code>function</code></td><td></td><td><p>Fires if the player is unmuted.</p>
</td>
    </tr><tr>
    <td>[events.onVolumeChange]</td><td><code>function</code></td><td></td><td><p>Fires if the player&#39;s volume has changed.</p>
</td>
    </tr><tr>
    <td>[events.onStreamInfo]</td><td><code>function</code></td><td></td><td><p>Fires if stream info is available.</p>
</td>
    </tr><tr>
    <td>[events.onStreamInfoUpdate]</td><td><code>function</code></td><td></td><td><p>Fires if stream info of a stream is updated during playback.</p>
</td>
    </tr><tr>
    <td>[events.onWarning]</td><td><code>function</code></td><td></td><td><p>Fires if something is not as expected, but functionality works.</p>
</td>
    </tr><tr>
    <td>[events.onDestroy]</td><td><code>function</code></td><td></td><td><p>Fires if the player is destroyed.</p>
</td>
    </tr><tr>
    <td>[events.onUpdateSourceInit]</td><td><code>function</code></td><td></td><td><p>Fires if the player has received an update source request.</p>
</td>
    </tr><tr>
    <td>[events.onUpdateSourceSuccess]</td><td><code>function</code></td><td></td><td><p>Fires if the player has successfully updated the source.</p>
</td>
    </tr><tr>
    <td>[events.onUpdateSourceFail]</td><td><code>function</code></td><td></td><td><p>Fires if the player has failed to update the source.</p>
</td>
    </tr><tr>
    <td>[events.onUpdateSourceAbort]</td><td><code>function</code></td><td></td><td><p>Fires if the player aborted the update source request.</p>
</td>
    </tr><tr>
    <td>[events.onServerInfo]</td><td><code>function</code></td><td></td><td><p>Fires if h5live server info is available.</p>
</td>
    </tr><tr>
    <td>[events.onFullscreenChange]</td><td><code>function</code></td><td></td><td><p>Fires if the fullscreen mode of the player has changed.</p>
</td>
    </tr><tr>
    <td>[tweaks]</td><td><code>object</code></td><td></td><td><p>The object to tweak the player (only h5live).</p>
</td>
    </tr><tr>
    <td>[tweaks.buffer]</td><td><code>object</code></td><td></td><td><p>The bufffer object.</p>
</td>
    </tr><tr>
    <td>tweaks.buffer.min</td><td><code>number</code></td><td></td><td><p>The minimum time to buffer.</p>
</td>
    </tr><tr>
    <td>tweaks.buffer.start</td><td><code>number</code></td><td></td><td><p>The buffer time when the playout starts.</p>
</td>
    </tr><tr>
    <td>tweaks.buffer.target</td><td><code>number</code></td><td></td><td><p>The target buffer time.</p>
</td>
    </tr><tr>
    <td>tweaks.buffer.limit</td><td><code>number</code></td><td></td><td><p>The buffer time limit before increase play speed.</p>
</td>
    </tr><tr>
    <td>tweaks.buffer.max</td><td><code>number</code></td><td></td><td><p>The maximum time to buffer.</p>
</td>
    </tr><tr>
    <td>[tweaks.bufferDynamic]</td><td><code>object</code></td><td></td><td><p>The bufffer dynamic object.</p>
</td>
    </tr><tr>
    <td>tweaks.bufferDynamic.offsetThreshold</td><td><code>number</code></td><td></td><td><p>The threshold time between two bufferings in seconds. If the measured value is lower, the buffer will be increased by offsetStep.</p>
</td>
    </tr><tr>
    <td>tweaks.bufferDynamic.offsetStep</td><td><code>number</code></td><td></td><td><p>The step to increase in seconds. Also the step to decrease in cooldown.</p>
</td>
    </tr><tr>
    <td>tweaks.bufferDynamic.cooldownTime</td><td><code>number</code></td><td></td><td><p>The time to check stable playback. If stable playback is detected, the buffer values will be decreased till original buffer values are reached.</p>
</td>
    </tr><tr>
    <td>[metrics]</td><td><code>object</code></td><td></td><td><p>The metrics object. <b>Only usable with valid account.</b> Configuring this object allows you to collect and analyse data via the &#39;nanoStream Cloud&#39;. If not set, metrics are disabled. See our <a href="https://www.nanocosmos.de/v4/documentation/nanoplayer-h5live#nanostream_cloud_analytics_and_player_metrics"><b>nanocosmos / nanoStream documentation</b></a> for more informations.</p>
</td>
    </tr><tr>
    <td>metrics.accountId</td><td><code>string</code></td><td></td><td><p>The account id provided by nanocosmos to use with the metrics.</p>
</td>
    </tr><tr>
    <td>metrics.accountKey</td><td><code>string</code></td><td></td><td><p>The account key provided by nanocosmos to use with the metrics.</p>
</td>
    </tr><tr>
    <td>[metrics.userId]</td><td><code>string</code></td><td></td><td><p>Application user/viewer id. If your application includes a user name or user id, providing this information enables you to filter or aggregate data by this user.</p>
</td>
    </tr><tr>
    <td>[metrics.eventId]</td><td><code>string</code></td><td></td><td><p>Application event id. If the stream is related to a certain event, e.g. webinar, auction or sports event, providing this information enables you to filter or aggregate data by this event.</p>
</td>
    </tr><tr>
    <td>[metrics.statsInterval]</td><td><code>number</code></td><td><code>10</code></td><td><p>The interval how often the stats should be collected in seconds. The minimum is 5 seconds..</p>
</td>
    </tr><tr>
    <td>[metrics.customField*]</td><td><code>string</code></td><td></td><td><p>Custom field. * can be replaced with 1 - 10 e.g. &#39;customField3&#39;. Possible from &#39;customField1&#39; to &#39;customField10&#39;.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
var config = {    source: {        bintu: { // DEPRECATED. PLEASE USE ENTRIES!!! WILL BE OVERWRITTEN IN CASE AT LEAST ONE 'ENTRY' IS DEFINED IN 'ENTRIES' ARRAY.            streamid: 'q23rf2tzw3h6754iretmft7irt'        }    }};
```
**Example**  
```js
// Complete config examplevar config = {    "source" : {        "entries": [ // array of 'entry' objects                {                    "index": 0,                    "label": "high",                    "tag": "this is a high quality stream",                    "info": {                        "bitrate": 1200,                        "width": 1280,                        "height": 720,                        "framerate": 30                    },                    "hls": "",                    "h5live": {                        "rtmp": {                            "url": "rtmp://bintu-play.nanocosmos.de/play",                            "streamname": "XXXXX-YYYY1"                        },                        "server": {                            "websocket": "wss://bintu-h5live.nanocosmos.de:443/h5live/stream.mp4",                            "hls": "https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8",                            "progressive": "https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4"                        },                        "token": "",                        "security": {}                    },                    "bintu": {}                },                {                    "index": 1,                    "label": "medium",                    "tag": "this is a medium quality stream",                    "info": {                        "bitrate": 800,                        "width": 864,                        "height": 480,                        "framerate": 30                    },                    "hls": "",                    "h5live": {                        "rtmp": {                            "url": "rtmp://bintu-play.nanocosmos.de/play",                            "streamname": "XXXXX-YYYY2"                        },                        "server": {                            "websocket": "wss://bintu-h5live.nanocosmos.de:443/h5live/stream.mp4",                            "hls": "https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8",                            "progressive": "https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4"                        },                        "token": "",                        "security": {}                    },                    "bintu": {}                },                {                    "index": 2,                    "label": "low",                    "tag": "this is a low quality stream",                    "info": {                        "bitrate": 400,                        "width": 426,                        "height": 240,                        "framerate": 15                    },                    "hls": "",                    "h5live": {                        "rtmp": {                            "url": "rtmp://bintu-play.nanocosmos.de/play",                            "streamname": "XXXXX-YYYY3"                        },                        "server": {                            "websocket": "wss://bintu-h5live.nanocosmos.de:443/h5live/stream.mp4",                            "hls": "https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8",                            "progressive": "https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4"                        },                        "token": "",                        "security": {}                    },                    "bintu": {}                }        ],        "options": {            "adaption": {                "rule": "deviationOfMean2",                "downStep": 2            },            "switch": {                'method': 'server',                'pauseOnError': false,                'forcePlay': true,                'fastStart': false,                'timeout': 20            }        },        "startIndex": 2 // lowest    },    // playback is completely optional    "playback": {        "autoplay": true,        "automute": true,        "muted": false,        "metadata": true,        "reconnect": {            "minDelay": 2.5,            "maxDelay": 12.5,            "delaySteps": 6,            "maxRetries": 20        }    },    "events": {        "onWarning": function (e) {            console.log(e);        }    },    "style": {        "width": '1280px',        "height": '720px'    },    // optional buffer tweaks, use with care, usually not required    "tweaks": {        "buffer": {            "min": 0.2,            "start": 0.5,            "max": 8.0,            "target": 1.2,            "limit": 1.7        }    },    // metrics/analytics (requires account)    "metrics": {        "accountId": 'myId',        "accountKey": 'sdfhe457zsjhnrtzd8',        "userId": 'myUserId',        "eventId": 'myEventId',        "statsInterval": 10,        "customField1": 'custom',        "customField2": 42,        "customField3": true    }};
```
**Example**  
```js
// example with source url params and eventsvar config = {    "source": {        "h5live": { // DEPRECATED. PLEASE USE ENTRIES!!! WILL BE OVERWRITTEN IN CASE AT LEAST ONE 'ENTRY' IS DEFINED IN 'ENTRIES' ARRAY.            "server": {                "websocket": 'wss://bintu-h5live.nanocosmos.de/h5live/stream',                "hls": 'https://bintu-h5live.nanocosmos.de/h5live/http/playlist.m3u8'            },            // rtmp stream source (your live stream)            "params": {                "url": 'rtmp://bintu-play.nanocosmos.de:80/live',                "streamname": 'XXXXX-YYYYY'                "custom_key": 'custom_value'            }        }    },    "playback": {        "autoplay": false,        "videoId": ['myVideoTagId', 'myVideoTagId']    },    "events": {        "onStats": function (e) {            console.log(e);        }    },    "style": {       view: false    },    "metrics": {        "accountId": 'myId',        "accountKey": 'sdfhe457zsjhnrtzd8'    }};
```
**Example**  
```js
var config = {    "source" : {        "entries": [ // array of 'entry' objects, here only one is defined as single source                {                    "index": 0,                    "label": "high", // optional                    "tag": "this is a high quality stream", // optional                    "info": { // optional                        "bitrate": 1200,                        "width": 1280,                        "height": 720,                        "framerate": 30                    },                    "hls": "",                    "h5live": {                        "rtmp": {                            "url": "rtmp://bintu-play.nanocosmos.de/play",                            "streamname": "XXXXX-YYYYY"                        },                        "server": {                            "websocket": "wss://bintu-h5live.nanocosmos.de:443/h5live/stream.mp4",                            "hls": "https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8",                            "progressive": "https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4"                        },                        // (optional) secure token                        "security": {                            "token": 'awe456b367g4e6rm8f56hbe6gd8f5m8df6n8idf6tf8mfd68ndi',                            "expires": '1519819200',                            "options": '15',                            "tag": 'anyTag'                        }                    }                }        ],        "options": { // optional            "adaption": {                "rule": "none"            }        },        "startIndex": 0 // optional    },    "playback": {        "autoplay": true,        "muted": true    },    "events": {        "onReady": function (e) {            console.log('player ready with ' + JSON.stringify(e));        },        "onPlay": function (e) {            console.log('playing');            console.log('play stats: ' + JSON.stringify(e.data.stats));        },        "onPause": function (e) {            console.log('pause');            if (e.data.reason !== 'normal') {                alert('Paused with reason: ' + e.data.reason);            }        },        "onError": function (e) {            try {                var err = JSON.stringify(e);                if (err === '{}') {                    err = e.message;                }                e = err;            } catch (err) { }            console.log(e);            alert(e);        },        "onMetaData": function (e) {            console.log(e);        },        "onStats": function (e) {            console.log(e);        },        "onStreamInfo": function (e) {            console.log(e);        },        "onDestroy": function (e) {            console.log(e);        }    },    "style": {        "width: '1280px',        "aspectratio": '16/9',        "controls": false,        "scaling": 'crop'    }};
```
<a name="NanoPlayer..entry"></a>

### NanoPlayer~entry : <code>object</code>
An entry object to pass stream parameters like h5live config, stream informations etc. in the 'config.source.entries' array

**Kind**: inner typedef of [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [config](#NanoPlayer..config)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>index</td><td><code>number</code></td><td></td><td><p>The index of the stream entry. Have to be the same as the position in the &#39;entries&#39; array. Begins with &#39;0&#39;.</p>
</td>
    </tr><tr>
    <td>[label]</td><td><code>string</code></td><td></td><td><p>A custom label for the stream e.g. &#39;high&#39;.</p>
</td>
    </tr><tr>
    <td>[tag]</td><td><code>string</code></td><td></td><td><p>Custom informations about the stream entry.</p>
</td>
    </tr><tr>
    <td>[info]</td><td><code>object</code></td><td></td><td><p>The info object to set stream meta data.</p>
</td>
    </tr><tr>
    <td>info.bitrate</td><td><code>number</code></td><td><code>0</code></td><td><p>The stream bitrate.</p>
</td>
    </tr><tr>
    <td>info.width</td><td><code>number</code></td><td><code>0</code></td><td><p>The stream width.</p>
</td>
    </tr><tr>
    <td>info.height</td><td><code>number</code></td><td><code>0</code></td><td><p>The stream height.</p>
</td>
    </tr><tr>
    <td>info.framerate</td><td><code>number</code></td><td><code>0</code></td><td><p>The stream framerate.</p>
</td>
    </tr><tr>
    <td>[hls]</td><td><code>string</code></td><td></td><td><p>An hls playout url as string.</p>
</td>
    </tr><tr>
    <td>[h5live]</td><td><code>object</code></td><td></td><td><p>The h5live object to configure the h5live connection.</p>
</td>
    </tr><tr>
    <td>h5live.server</td><td><code>object</code></td><td></td><td><p>The h5live server object.</p>
</td>
    </tr><tr>
    <td>h5live.server.websocket</td><td><code>string</code></td><td></td><td><p>The h5live websocket url.</p>
</td>
    </tr><tr>
    <td>[h5live.server.progressive]</td><td><code>string</code></td><td></td><td><p>The h5live progressive download url.</p>
</td>
    </tr><tr>
    <td>h5live.server.hls</td><td><code>string</code></td><td></td><td><p>The h5live hls url. Have to be set for playback on iOS 10 or higher. iOS 9 or lower is not supported.</p>
</td>
    </tr><tr>
    <td>[h5live.token]</td><td><code>string</code></td><td></td><td><p>The h5live server token.</p>
</td>
    </tr><tr>
    <td>h5live.rtmp</td><td><code>object</code></td><td></td><td><p>The rtmp playout object for h5live playback.</p>
</td>
    </tr><tr>
    <td>h5live.rtmp.url</td><td><code>string</code></td><td></td><td><p>The rtmp playout url. Have to include the domain, port and application e.g. &#39;rtmp://example.com:80/live&#39;.</p>
</td>
    </tr><tr>
    <td>h5live.rtmp.streamname</td><td><code>string</code></td><td></td><td><p>The rtmp streamname.</p>
</td>
    </tr><tr>
    <td>[h5live.security]</td><td><code>object</code></td><td></td><td><p>The h5live security object for h5live playback.</p>
</td>
    </tr><tr>
    <td>h5live.security.token</td><td><code>string</code></td><td></td><td><p>The security service token.</p>
</td>
    </tr><tr>
    <td>h5live.security.expires</td><td><code>string</code></td><td></td><td><p>The time the token expires (system time).</p>
</td>
    </tr><tr>
    <td>h5live.security.options</td><td><code>string</code></td><td></td><td><p>The security options.</p>
</td>
    </tr><tr>
    <td>h5live.security.tag</td><td><code>string</code></td><td></td><td><p>The custom tag to decrypt the token.</p>
</td>
    </tr><tr>
    <td>[h5live.params]</td><td><code>object</code></td><td></td><td><p>The params object to pass custom query parameters over the h5live server connection. Parameters can be passed as key/value pairs.</p>
</td>
    </tr><tr>
    <td>[bintu]</td><td><code>object</code></td><td></td><td><p>An bintu object to get sources.</p>
</td>
    </tr><tr>
    <td>bintu.streamid</td><td><code>string</code></td><td></td><td><p>The bintu stream id.</p>
</td>
    </tr><tr>
    <td>[bintu.apiurl]</td><td><code>string</code></td><td><code>&quot;https://bintu.nanocosmos.de&quot;</code></td><td><p>The bintu api url.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
var source = {    "entries": [            {                "index": 0,                "label": "high",                "tag": "this is a high quality stream",                "info": {                    "bitrate": 1200,                    "width": 1280,                    "height": 720,                    "framerate": 30                },                "hls": "",                "h5live": {                    "rtmp": {                        "url": "rtmp://bintu-play.nanocosmos.de/play",                        "streamname": "XXXXX-YYYY1"                    },                    "server": {                        "websocket": "wss://bintu-h5live.nanocosmos.de:443/h5live/stream.mp4",                        "hls": "https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8",                        "progressive": "https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4"                    },                    "token": "",                    "security": {}                },                "bintu": {}            },            {                "index": 1,                "label": "medium",                "tag": "this is a medium quality stream",                "info": {                    "bitrate": 800,                    "width": 864,                    "height": 480,                    "framerate": 30                },                "hls": "",                "h5live": {                    "rtmp": {                        "url": "rtmp://bintu-play.nanocosmos.de/play",                        "streamname": "XXXXX-YYYY2"                    },                    "server": {                        "websocket": "wss://bintu-h5live.nanocosmos.de:443/h5live/stream.mp4",                        "hls": "https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8",                        "progressive": "https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4"                    },                    "token": "",                    "security": {}                },                "bintu": {}            },            {                "index": 2,                "label": "low",                "tag": "this is a low quality stream",                "info": {                    "bitrate": 400,                    "width": 426,                    "height": 240,                    "framerate": 15                },                "hls": "",                "h5live": {                    "rtmp": {                        "url": "rtmp://bintu-play.nanocosmos.de/play",                        "streamname": "XXXXX-YYYY3"                    },                    "server": {                        "websocket": "wss://bintu-h5live.nanocosmos.de:443/h5live/stream.mp4",                        "hls": "https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8",                        "progressive": "https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4"                    },                    "token": "",                    "security": {}                },                "bintu": {}            }    ],    "options": {        "adaption": {            "rule": "deviationOfMean2",            "downStep": 1        },        "switch": {            'method': 'server',            'pauseOnError': false,            'forcePlay': true,            'fastStart': false,            'timeout': 20        }    },    "startIndex": 2 // lowest};
```
**Example**  
```js
var source = {    "entries": [            {                "index": 0,                "label": "high", // optional                "tag": "this is a high quality stream", // optional                "info": { // optional                    "bitrate": 1200,                    "width": 1280,                    "height": 720,                    "framerate": 30                },                "h5live": {                     // your rtmp stream                    "rtmp": {                        "url": "rtmp://bintu-play.nanocosmos.de/play",                        "streamname": "XXXXX-YYYYY"                    },                    "server": {                        "websocket": "wss://bintu-h5live.nanocosmos.de:443/h5live/stream.mp4",                        "hls": "https://bintu-h5live.nanocosmos.de:443/h5live/http/playlist.m3u8",                        "progressive": "https://bintu-h5live.nanocosmos.de:443/h5live/http/stream.mp4"                    },                    // optional (secure token)                    "security": {                        "token": 'awe456b367g4e6rm8f56hbe6gd8f5m8df6n8idf6tf8mfd68ndi',                        "expires": '1519819200',                        "options": '15',                        "tag": 'anyTag'                    }                }            }    ]};
```
<a name="NanoPlayer..errorcode"></a>

### NanoPlayer~errorcode : <code>number</code>
The possible error codes in a onError event.

**Kind**: inner typedef of [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [onError](#NanoPlayer..event_onError)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>1000-1999</td><td><code>PlayerError</code></td><td></td>
    </tr><tr>
    <td>1001</td><td></td><td><p>No rtmp url set.</p>
</td>
    </tr><tr>
    <td>1002</td><td></td><td><p>No server set.</p>
</td>
    </tr><tr>
    <td>1003</td><td></td><td><p>Could not play because player has not been configured.</p>
</td>
    </tr><tr>
    <td>1004</td><td></td><td><p>Could not pause because player was not in playing state before.</p>
</td>
    </tr><tr>
    <td>1005</td><td></td><td><p>Playback must be initialized by user gesture.</p>
</td>
    </tr><tr>
    <td>1006</td><td></td><td><p>Buffer config is invalid.</p>
</td>
    </tr><tr>
    <td>1007</td><td></td><td><p>Playback suspended by external reason.</p>
</td>
    </tr><tr>
    <td>1008</td><td></td><td><p>Playback error.</p>
</td>
    </tr><tr>
    <td>1009</td><td></td><td><p>Playback failed because the player was in visibility state &#39;hidden&#39; at load start.</p>
</td>
    </tr><tr>
    <td>1010</td><td></td><td><p>The given stream entry index is not valid. (see <a href="NanoPlayer~switchStream">switchStream</a>)</p>
</td>
    </tr><tr>
    <td>2000-2999</td><td><code>StreamError</code></td><td></td>
    </tr><tr>
    <td>2001</td><td></td><td><p>The requested stream can not be found.</p>
</td>
    </tr><tr>
    <td>2002</td><td></td><td><p>No media available.</p>
</td>
    </tr><tr>
    <td>2003</td><td></td><td><p>Not enough media data received. The stream was already connected and the stream info event was fired.</p>
</td>
    </tr><tr>
    <td>2004</td><td></td><td><p>The source stream has been stopped.</p>
</td>
    </tr><tr>
    <td>2011</td><td></td><td><p>Received metadata with wrong index.</p>
</td>
    </tr><tr>
    <td>2012</td><td></td><td><p>Received metadata with invalid json string.</p>
</td>
    </tr><tr>
    <td>2013</td><td></td><td><p>Received metadata but no start index.</p>
</td>
    </tr><tr>
    <td>2014</td><td></td><td><p>Received metadata with start index but currently process another.</p>
</td>
    </tr><tr>
    <td>3000-3999</td><td><code>MediaError</code></td><td></td>
    </tr><tr>
    <td>3001</td><td></td><td><p>A fetching process of the media aborted by user.</p>
</td>
    </tr><tr>
    <td>3002</td><td></td><td><p>An error occurred when downloading media.</p>
</td>
    </tr><tr>
    <td>3003</td><td></td><td><p>An error occurred when decoding media.</p>
</td>
    </tr><tr>
    <td>3004</td><td></td><td><p>The received audio/video is not supported.</p>
</td>
    </tr><tr>
    <td>3100</td><td></td><td><p>The media source extension changed the state to &#39;ended&#39;. NOT AVAILABLE FOR IOS.</p>
</td>
    </tr><tr>
    <td>3200</td><td></td><td><p>An unspecific media error occurred.</p>
</td>
    </tr><tr>
    <td>4000-4999</td><td><code>NetworkError</code></td><td></td>
    </tr><tr>
    <td>4000-4099</td><td><code>General</code></td><td></td>
    </tr><tr>
    <td>4001</td><td></td><td><p>Could not establish connection. Maybe wrong protocol or path.</p>
</td>
    </tr><tr>
    <td>4002</td><td></td><td><p>Connection error.</p>
</td>
    </tr><tr>
    <td>4003</td><td></td><td><p>Maximum number of reconnection tries reached.</p>
</td>
    </tr><tr>
    <td>4004</td><td></td><td><p>Reconnection configuration invalid.</p>
</td>
    </tr><tr>
    <td>4005</td><td></td><td><p>The requested source stream has been stopped.</p>
</td>
    </tr><tr>
    <td>4006</td><td></td><td><p>The source request was aborted by timeout.</p>
</td>
    </tr><tr>
    <td>4100-4199</td><td><code>WebSocket</code></td><td></td>
    </tr><tr>
    <td>4101</td><td></td><td><p>An endpoint is &quot;going away&quot;, such as a server going down or a browser having navigated away from a page.</p>
</td>
    </tr><tr>
    <td>4102</td><td></td><td><p>An endpoint is terminating the connection due to a protocol error. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4103</td><td></td><td><p>An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message). Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4104</td><td></td><td><p>Reserved. The specific meaning might be defined in the future.</p>
</td>
    </tr><tr>
    <td>4105</td><td></td><td><p>No status code was actually present. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4106</td><td></td><td><p>Maybe no network, wrong url or server down. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4107</td><td></td><td><p>An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [<a href="http://tools.ietf.org/html/rfc3629%5D">http://tools.ietf.org/html/rfc3629]</a> data within a text message). Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4108</td><td></td><td><p>An endpoint is terminating the connection because it has received a message that &quot;violates its policy&quot;. This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4109</td><td></td><td><p>An endpoint is terminating the connection because it has received a message that is too big for it to process. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4110</td><td></td><td><p>An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn&#39;t return them in the response message of the WebSocket handshake.</p>
</td>
    </tr><tr>
    <td>4111</td><td></td><td><p>A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4115</td><td></td><td><p>The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can&#39;t be verified). Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4400-4499</td><td><code>Http</code></td><td></td>
    </tr><tr>
    <td>4400</td><td></td><td><p>Bad request. Maybe stream parameters are missing or malformed.</p>
</td>
    </tr><tr>
    <td>4403</td><td></td><td><p>Access denied. The authentication token is missing or invalid.</p>
</td>
    </tr><tr>
    <td>4500</td><td></td><td><p>The connection has been rejected due an internal server error. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4503</td><td></td><td><p>The requested service is currently unavailable. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4900-4999</td><td><code>Security</code></td><td></td>
    </tr><tr>
    <td>4900</td><td></td><td><p>The security service has been rejected due an internal server error.</p>
</td>
    </tr><tr>
    <td>4901</td><td></td><td><p>The security service denied access. The authentication token is invalid.</p>
</td>
    </tr><tr>
    <td>4903</td><td></td><td><p>The security service denied access. The url is expired or a token parameter is missing (expires, token, or options).</p>
</td>
    </tr><tr>
    <td>4904</td><td></td><td><p>The security service can not be found.</p>
</td>
    </tr><tr>
    <td>5000-5999</td><td><code>SetupError</code></td><td></td>
    </tr><tr>
    <td>5000-5099</td><td><code>General</code></td><td></td>
    </tr><tr>
    <td>5001</td><td></td><td><p>An exception was thrown during setup.</p>
</td>
    </tr><tr>
    <td>5002</td><td></td><td><p>A forced tech is not supported by your browser.</p>
</td>
    </tr><tr>
    <td>5003</td><td></td><td><p>The players source configuration is malformed or missing.</p>
</td>
    </tr><tr>
    <td>5004</td><td></td><td><p>This browser does not fully support HTML5 and H5Live. Supported are: Chrome &gt;=54 (Windows, MacOSX, Android), Firefox &gt;=48 (Windows, MacOSX, Android), Microsoft Edge (Windows), Microsoft Internet Explorer 11 (at least Windows 8), Safari (MacOSX &amp; at least iOS 10).</p>
</td>
    </tr><tr>
    <td>5005</td><td></td><td><p>Configuration error. Could not create/update player, the rtmp configuration is missing or incomplete. Add an rtmp url and streamname to the configuration.</p>
</td>
    </tr><tr>
    <td>5006</td><td></td><td><p>Configuration error. Could not create/update player, with this configuration an security token is required. Add an token to the configuration.</p>
</td>
    </tr><tr>
    <td>5007</td><td></td><td><p>Configuration error. Could not create/update player, the websocket server configuration is missing.</p>
</td>
    </tr><tr>
    <td>5008</td><td></td><td><p>Configuration error. Could not create/update player, the hls server configuration is missing.</p>
</td>
    </tr><tr>
    <td>5009</td><td></td><td><p>Configuration error. Could not create/update player, the websocket server configuration for metadata is missing.</p>
</td>
    </tr><tr>
    <td>5010</td><td></td><td><p>Could not embed player.</p>
</td>
    </tr><tr>
    <td>5100-5199</td><td><code>Bintu</code></td><td></td>
    </tr><tr>
    <td>5101</td><td></td><td><p>Could not find bintu stream. The stream is not live.</p>
</td>
    </tr><tr>
    <td>5102</td><td></td><td><p>No bintu stream id passed.</p>
</td>
    </tr><tr>
    <td>5103</td><td></td><td><p>Bintu service rejected.</p>
</td>
    </tr><tr>
    <td>5200-5299</td><td><code>Metrics</code></td><td></td>
    </tr><tr>
    <td>5201</td><td></td><td><p>Metrics configuration error. No metrics config object passed.</p>
</td>
    </tr><tr>
    <td>5202</td><td></td><td><p>Metrics configuration error. Metrics config is not from type &#39;object&#39;.</p>
</td>
    </tr><tr>
    <td>5203</td><td></td><td><p>Metrics configuration error. Metrics config is empty.</p>
</td>
    </tr><tr>
    <td>5204</td><td></td><td><p>Metrics configuration error. A custom property has no valid index number, the range is 1 to 10 e.g.&#39;customField1&#39;.</p>
</td>
    </tr><tr>
    <td>5205</td><td></td><td><p>Metrics configuration error. A custom property  is not indexed correctly, the range is 1 to 10 e.g.&#39;customField1&#39;.</p>
</td>
    </tr><tr>
    <td>5206</td><td></td><td><p>Metrics configuration error. A custom property has an index out of range, the range is 1 to 10 e.g.&#39;customField1&#39;.</p>
</td>
    </tr><tr>
    <td>5207</td><td></td><td><p>Metrics configuration error. A property is not valid.</p>
</td>
    </tr><tr>
    <td>5208</td><td></td><td><p>Metrics configuration error. No credentials passed.</p>
</td>
    </tr>  </tbody>
</table>

<a name="NanoPlayer..state"></a>

### NanoPlayer~state : <code>number</code>
The state of the player.

**Kind**: inner typedef of [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [Events](#NanoPlayer..event_onError)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>1</td><td><p>UNINITIALIZED</p>
</td>
    </tr><tr>
    <td>2</td><td><p>IDLE</p>
</td>
    </tr><tr>
    <td>3</td><td><p>READY</p>
</td>
    </tr><tr>
    <td>4</td><td><p>LOADING</p>
</td>
    </tr><tr>
    <td>5</td><td><p>PLAYING</p>
</td>
    </tr><tr>
    <td>6</td><td><p>PAUSED</p>
</td>
    </tr><tr>
    <td>7</td><td><p>BUFFERING</p>
</td>
    </tr><tr>
    <td>8</td><td><p>UNKNOWN</p>
</td>
    </tr><tr>
    <td>9</td><td><p>PLAYBACK_NOT_STARTED</p>
</td>
    </tr><tr>
    <td>10</td><td><p>PLAYBACK_SUSPENDED</p>
</td>
    </tr><tr>
    <td>11</td><td><p>PAUSING</p>
</td>
    </tr><tr>
    <td>12</td><td><p>PLAYBACK_ERROR</p>
</td>
    </tr><tr>
    <td>13</td><td><p>RECONNECTION_IMMINENT</p>
</td>
    </tr><tr>
    <td>14</td><td><p>CONNECTION_ERROR</p>
</td>
    </tr><tr>
    <td>15</td><td><p>DESTROYING</p>
</td>
    </tr><tr>
    <td>16</td><td><p>PLAYBACK_RESTARTING</p>
</td>
    </tr><tr>
    <td>17</td><td><p>VISIBILITY_HIDDEN</p>
</td>
    </tr><tr>
    <td>18</td><td><p>NOT_ENOUGH_DATA</p>
</td>
    </tr><tr>
    <td>19</td><td><p>SOURCE_STREAM_STOPPED</p>
</td>
    </tr>  </tbody>
</table>

<a name="NanoPlayer..pausereason"></a>

### NanoPlayer~pausereason : <code>string</code>
The possible pause reason in a onPause event.

**Kind**: inner typedef of [<code>NanoPlayer</code>](#NanoPlayer)  
**See**: [onPause](#NanoPlayer..event_onPause)  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>normal</td><td><p>Paused by user.</p>
</td>
    </tr><tr>
    <td>buffer</td><td><p>Paused by buffer timeout. The stream was stopped or there was a buffer underrun.</p>
</td>
    </tr><tr>
    <td>connectionclose</td><td><p>Paused by network connection close.</p>
</td>
    </tr><tr>
    <td>servernotfound</td><td><p>Paused because of the h5live server was not found.</p>
</td>
    </tr><tr>
    <td>streamnotfound</td><td><p>Paused by loading timeout. The stream could not found.</p>
</td>
    </tr><tr>
    <td>interactionrequired</td><td><p>Paused because auto playback is denied. Can happen especially on mobile.</p>
</td>
    </tr><tr>
    <td>playbacksuspended</td><td><p>Paused because the playback was suspended by an external reason.</p>
</td>
    </tr><tr>
    <td>playbackerror</td><td><p>Paused because the playback had an error.</p>
</td>
    </tr><tr>
    <td>reconnectionimminent</td><td><p>Paused because the connection was closed by an external reason and a reconnect will be prepared.</p>
</td>
    </tr><tr>
    <td>destroy</td><td><p>Paused because the player will be destroyed.</p>
</td>
    </tr><tr>
    <td>playbackrestart</td><td><p>Paused because the player was stopped for update source. The player will restart immediately.</p>
</td>
    </tr><tr>
    <td>visibilityhidden</td><td><p>Paused because the player was not visible at load start.</p>
</td>
    </tr><tr>
    <td>notenoughdata</td><td><p>Paused by loading timeout. The stream was alive and connected but not enough data was received to start playback.</p>
</td>
    </tr><tr>
    <td>sourcestreamstopped</td><td><p>Paused because the source stream has been stopped.</p>
</td>
    </tr>  </tbody>
</table>

