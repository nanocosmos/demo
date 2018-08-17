## Classes

<dl>
<dt><a href="#NanoPlayer">NanoPlayer</a></dt>
<dd><p>NanoPlayer Public API Class 3.13.4</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#performance marks">performance marks</a></dt>
<dd><p>This marks will be set via &#39;performance.mark()&#39; and are related to a websocket connection only. Marks can be read with performance.getEntriesByName(name) that returns an array with objects. The object has the properties &#39;entryType=mark&#39;, &#39;name&#39; and &#39;startTime&#39;. The middle part of the name string is the element id of the player container. Not supported on Safari 11 OSX and iOS.</p>
</dd>
</dl>

<a name="NanoPlayer"></a>

## NanoPlayer
NanoPlayer Public API Class 3.13.4

**Kind**: global class  
**Version**: 3.13.4  

* [NanoPlayer](#NanoPlayer)
    * [new NanoPlayer(playerDivId)](#new_NanoPlayer_new)
    * _instance_
        * [.version](#NanoPlayer+version) : <code>string</code>
        * [.coreversion](#NanoPlayer+coreversion) : <code>string</code>
        * [.viewversion](#NanoPlayer+viewversion) : <code>string</code>
        * [.type](#NanoPlayer+type) : <code>string</code>
        * [.id](#NanoPlayer+id) : <code>string</code>
        * [.capabilities](#NanoPlayer+capabilities) : <code>Array.&lt;string&gt;</code>
        * [.setup(config)](#NanoPlayer+setup) ⇒ <code>Promise.&lt;(config\|error)&gt;</code>
        * [.destroy()](#NanoPlayer+destroy)
        * [.play()](#NanoPlayer+play)
        * [.pause()](#NanoPlayer+pause)
        * [.mute()](#NanoPlayer+mute)
        * [.unmute()](#NanoPlayer+unmute)
        * [.setVolume(volume)](#NanoPlayer+setVolume)
        * [.updateSource(source)](#NanoPlayer+updateSource) ⇒ <code>Promise.&lt;(config\|error)&gt;</code>
    * _inner_
        * ["onReady"](#NanoPlayer..event_onReady)
        * ["onPlay"](#NanoPlayer..event_onPlay)
        * ["onPause"](#NanoPlayer..event_onPause)
        * ["onLoading"](#NanoPlayer..event_onLoading)
        * ["onStartBuffering"](#NanoPlayer..event_onStartBuffering)
        * ["onStopBuffering"](#NanoPlayer..event_onStopBuffering)
        * ["onError"](#NanoPlayer..event_onError)
        * ["onStats"](#NanoPlayer..event_onStats)
        * ["onMetaData"](#NanoPlayer..event_onMetaData)
        * ["onMuted"](#NanoPlayer..event_onMuted)
        * ["onUnmuted"](#NanoPlayer..event_onUnmuted)
        * ["onVolumeChange"](#NanoPlayer..event_onVolumeChange)
        * ["onStreamInfo"](#NanoPlayer..event_onStreamInfo)
        * ["onStreamInfoUpdate"](#NanoPlayer..event_onStreamInfoUpdate)
        * ["onWarning"](#NanoPlayer..event_onWarning)
        * [~config](#NanoPlayer..config) : <code>object</code>
        * [~errorcode](#NanoPlayer..errorcode) : <code>number</code>
        * [~state](#NanoPlayer..state) : <code>number</code>
        * [~pausereason](#NanoPlayer..pausereason) : <code>string</code>

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
<script type="text/javascript" src="nanoplayer.3.min.js"></script>
<script type="text/javascript">
    var player;
    document.addEventListener('DOMContentLoaded', function () {
        player = new NanoPlayer('playerDiv');
    });
</script>
```
**Example**  
```xml
{}
<script type="text/javascript" src="require.js"></script>
<script type="text/javascript">
    var player;
    requirejs.config({
        paths: {
            // loads the player ...
            // for a local copy of the minified player use a relative path e.g. 'js/nanoplayer.3.min'
            // if 'baseUrl' is defined a local path have to be relative to the base path
            nanoplayer: '//demo.nanocosmos.de/nanoplayer/api/nanoplayer.3.min.js'
        },
        waitSeconds: 20, // timeout for loading modules
    });
    require('nanoplayer', function() {
        player = new NanoPlayer('playerDiv');
    });
</script>
```
<a name="NanoPlayer+version"></a>

### nanoPlayer.version : <code>string</code>
The version of the player.

**Kind**: instance property of <code>[NanoPlayer](#NanoPlayer)</code>  
<a name="NanoPlayer+coreversion"></a>

### nanoPlayer.coreversion : <code>string</code>
The version of the core.

**Kind**: instance property of <code>[NanoPlayer](#NanoPlayer)</code>  
<a name="NanoPlayer+viewversion"></a>

### nanoPlayer.viewversion : <code>string</code>
The version of the view.

**Kind**: instance property of <code>[NanoPlayer](#NanoPlayer)</code>  
<a name="NanoPlayer+type"></a>

### nanoPlayer.type : <code>string</code>
The type of the player.

**Kind**: instance property of <code>[NanoPlayer](#NanoPlayer)</code>  
<a name="NanoPlayer+id"></a>

### nanoPlayer.id : <code>string</code>
The unique id of the player.

**Kind**: instance property of <code>[NanoPlayer](#NanoPlayer)</code>  
<a name="NanoPlayer+capabilities"></a>

### nanoPlayer.capabilities : <code>Array.&lt;string&gt;</code>
The supported tech names of the player.

**Kind**: instance constant of <code>[NanoPlayer](#NanoPlayer)</code>  
<a name="NanoPlayer+setup"></a>

### nanoPlayer.setup(config) ⇒ <code>Promise.&lt;(config\|error)&gt;</code>
Initializes the player with a given config object.

**Kind**: instance method of <code>[NanoPlayer](#NanoPlayer)</code>  
**See**: [config](#NanoPlayer..config)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>config</td><td><code>config</code></td><td><p>The config object for the player including sources, events, styles.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayer
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer+destroy"></a>

### nanoPlayer.destroy()
Cleans up the player and removes all nested elements from the container div.

**Kind**: instance method of <code>[NanoPlayer](#NanoPlayer)</code>  
**Example**  
```js
// player instance of NanoPlayer
player.destroy();
player.setup(config);
```
<a name="NanoPlayer+play"></a>

### nanoPlayer.play()
Plays the player.

**Kind**: instance method of <code>[NanoPlayer](#NanoPlayer)</code>  
**Example**  
```js
// player instance of NanoPlayer
player.play();
```
<a name="NanoPlayer+pause"></a>

### nanoPlayer.pause()
Pauses the player.

**Kind**: instance method of <code>[NanoPlayer](#NanoPlayer)</code>  
**Example**  
```js
// player instance of NanoPlayer
player.pause();
```
<a name="NanoPlayer+mute"></a>

### nanoPlayer.mute()
Mutes the player.

**Kind**: instance method of <code>[NanoPlayer](#NanoPlayer)</code>  
**Example**  
```js
// player instance of NanoPlayer
player.mute();
```
<a name="NanoPlayer+unmute"></a>

### nanoPlayer.unmute()
Unmutes the player.

**Kind**: instance method of <code>[NanoPlayer](#NanoPlayer)</code>  
**Example**  
```js
// player instance of NanoPlayer
player.unmute();
```
<a name="NanoPlayer+setVolume"></a>

### nanoPlayer.setVolume(volume)
Sets the volume of the player.

**Kind**: instance method of <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
player.setVolume(0.3);
```
<a name="NanoPlayer+updateSource"></a>

### nanoPlayer.updateSource(source) ⇒ <code>Promise.&lt;(config\|error)&gt;</code>
Updates the source of the player.

**Kind**: instance method of <code>[NanoPlayer](#NanoPlayer)</code>  
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
    <td>[source.h5live]</td><td><code>object</code></td><td></td><td><p>The h5live object to configure the h5live connection.</p>
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
    <td>[source.bintu]</td><td><code>object</code></td><td></td><td><p>An bintu object to get sources.</p>
</td>
    </tr><tr>
    <td>source.bintu.streamid</td><td><code>string</code></td><td></td><td><p>The bintu stream id.</p>
</td>
    </tr><tr>
    <td>[source.bintu.apiurl]</td><td><code>string</code></td><td><code>&quot;\&quot;https://bintu.nanocosmos.de\&quot;&quot;</code></td><td><p>The bintu api url.</p>
</td>
    </tr><tr>
    <td>[source.hls]</td><td><code>string</code></td><td></td><td><p>An hls playout url as string.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayer
var source = {
    h5live: {
        server: {
            websocket: 'wss://h5live.nanocosmos.de/h5live/stream',
            hls: 'https://h5live.nanocosmos.de/h5live/http/playlist.m3u8'
        },
        rtmp: {
            url: 'rtmp://example.nanocosmos.de:80/live',
            streamname: 'h5liveStream'
        },
        security: {
            token: 'awe456b367g4e6rm8f56hbe6gd8f5m8df6n8idf6tf8mfd68ndi',
            expires: '1519819200',
            options: '15',
            tag: 'anyTag'
        }
    }
}
player.updateSource(source).then(function (config) {
    console.log('update source ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onReady"></a>

### "onReady"
The ready event to pass in the 'config.events' object at the setup call. Fires if the player is ready to play after successful setup.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
var onReady = function (event) {
    comnsole.log('Ready: ' + JSON.stringify(event.data.config));
}
config.events.onReady = onReady;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onPlay"></a>

### "onPlay"
The play event to pass in the 'config.events' object at the setup call. Fires if playout is started.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
var onPlay = function (event) {
    comnsole.log('Playing');
};
config.events.onPlay = onPlay;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onPause"></a>

### "onPause"
The pause event to pass in the 'config.events' object at the setup call. Fires if playout is paused.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
var onPause = function (event) {
    comnsole.log('Pause');
    if (event.data.reason !== 'normal') {
         alert('Paused with reason: ' + event.data.reason);
    }
};
config.events.onPause = onPause;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onLoading"></a>

### "onLoading"
The load event to pass in the 'config.events' object at the setup call. Fires if playout was stopped or player is ready after setup and tries to play.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
var onLoading = function (event) {
    comnsole.log('Loading with delay of ' + event.data.connectDelay + ' milliseconds');
};
config.events.onLoading = onLoading;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onStartBuffering"></a>

### "onStartBuffering"
The start buffering event to pass in the 'config.events' object at the setup call. Fires if playout is started but no media is available.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
var onStartBuffering = function (event) {
    comnsole.log('Buffering');
};
config.events.onStartBuffering = onStartBuffering;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onStopBuffering"></a>

### "onStopBuffering"
The stop buffering event to pass in the 'config.events' object at the setup call. Fires if playout resumes after buffering.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
var onStopBuffering = function (event) {
    comnsole.log('Resume');
};
config.events.onStopBuffering = onStopBuffering;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onError"></a>

### "onError"
The error event to pass in the 'config.events' object at the setup call. Fires if any kind of error occures.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
var onError = function (event) {
    alert('Error: ' + event.data.code + ' ' + event.data.message);
};
config.events.onError = onError;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onStats"></a>

### "onStats"
The stats event to pass in the 'config.events' object at the setup call. Fires if the player has measured statistics.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
    <td>data.stats.quality</td><td><code>object</code></td><td><p>The video playback quality object.</p>
</td>
    </tr><tr>
    <td>data.stats.quality.corruptedVideoFrames</td><td><code>number</code></td><td><p>The total number of corrupted video frames. ONLY AVAILABLE FOR FIREFOX.</p>
</td>
    </tr><tr>
    <td>data.stats.quality.corruptedVideoFramesCurrent</td><td><code>number</code></td><td><p>The number of corrupted video frames within the last second. ONLY AVAILABLE FOR FIREFOX.</p>
</td>
    </tr><tr>
    <td>data.stats.quality.creationTime</td><td><code>number</code></td><td><p>The time in miliseconds since the start of the navigation and the creation of the video element. ONLY AVAILABLE FOR FIREFOX.</p>
</td>
    </tr><tr>
    <td>data.stats.quality.droppedVideoFrames</td><td><code>number</code></td><td><p>The total number of dropped video frames. ONLY AVAILABLE FOR FIREFOX.</p>
</td>
    </tr><tr>
    <td>data.stats.quality.droppedVideoFramesCurrent</td><td><code>number</code></td><td><p>The number of dropped video frames within the last second. ONLY AVAILABLE FOR FIREFOX.</p>
</td>
    </tr><tr>
    <td>data.stats.quality.totalVideoFrames</td><td><code>number</code></td><td><p>The total number of created and dropped video frames since creation of the video element. ONLY AVAILABLE FOR FIREFOX.</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// player instance of NanoPlayer
var onStats = function (event) {
    comnsole.log('Stats: ' + JSON.stringify(event.data.stats));
};
config.events.onStats = onStats;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onMetaData"></a>

### "onMetaData"
The metadata event to pass in the 'config.events' object at the setup call. The config param 'playback.metadata' have to be set to true. Fires if the player receives metadata.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
var onMetaData = function (event) {
    comnsole.log('MetaData: ' + JSON.stringify(event.data));
};
config.events.onMetaData = onMetaData;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onMuted"></a>

### "onMuted"
The muted event to pass in the 'config.events' object at the setup call. Fires if the player is muted.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
var onMuted = function (event) {
    comnsole.log('Muted with volume: ' + event.data.volume);
};
config.events.onMetaData = onMetaData;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onUnmuted"></a>

### "onUnmuted"
The muted event to pass in the 'config.events' object at the setup call. Fires if the player is unmuted.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
var onUnmuted = function (event) {
    comnsole.log('Unmuted with volume: ' + event.data.volume);
};
config.events.onMetaData = onMetaData;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onVolumeChange"></a>

### "onVolumeChange"
The muted event to pass in the 'config.events' object at the setup call. Fires if the player's volume has changed.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
var onVolumeChange = function (event) {
    comnsole.log('Volume: ' + event.data.volume);
};
config.events.onMetaData = onMetaData;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onStreamInfo"></a>

### "onStreamInfo"
The stream info event to pass in the 'config.events' object at the setup call. Fires if informations about a stream is available right before playback starts.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
var onStreamInfo = function (event) {
    comnsole.log('StreamInfo: ' + JSON.stringify(event.data.streamInfo));
};
config.events.onStreamInfo = onStreamInfo;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onStreamInfoUpdate"></a>

### "onStreamInfoUpdate"
The stream info event to pass in the 'config.events' object at the setup call. Fires if the stream format has changed during playback.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
var onStreamInfoUpdate = function (event) {
    comnsole.log('StreamInfo updated: ' + JSON.stringify(event.data.streamInfo));
};
config.events.onStreamInfoUpdate = onStreamInfoUpdate;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..event_onWarning"></a>

### "onWarning"
The error event to pass in the 'config.events' object at the setup call. Fires if something is not as expected, but functionality works.

**Kind**: event emitted by <code>[NanoPlayer](#NanoPlayer)</code>  
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
// player instance of NanoPlayer
var onWarning = function (event) {
    console.log('Warning: ' + event.data.message);
};
config.events.onWarning = onWarning;
player.setup(config).then(function (config) {
    console.log('setup ok with config: ' + JSON.stringify(config)));
}, function (error) {
    console.log(error);
});
```
<a name="NanoPlayer..config"></a>

### NanoPlayer~config : <code>object</code>
The config object to pass as param for the 'setup' call.

**Kind**: inner typedef of <code>[NanoPlayer](#NanoPlayer)</code>  
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
    <td>source.h5live</td><td><code>object</code></td><td></td><td><p>The h5live object to configure the h5live connection.</p>
</td>
    </tr><tr>
    <td>source.h5live.server</td><td><code>object</code></td><td></td><td><p>The h5live server object.</p>
</td>
    </tr><tr>
    <td>source.h5live.server.websocket</td><td><code>string</code></td><td></td><td><p>The h5live websocket url.</p>
</td>
    </tr><tr>
    <td>source.h5live.server.progressive</td><td><code>string</code></td><td></td><td><p>The h5live progressive download url.</p>
</td>
    </tr><tr>
    <td>source.h5live.server.hls</td><td><code>string</code></td><td></td><td><p>The h5live hls url. Have to be set for playback on iOS 10 or higher. iOS 9 or lower is not supported.</p>
</td>
    </tr><tr>
    <td>source.h5live.token</td><td><code>string</code></td><td></td><td><p>The h5live server token.</p>
</td>
    </tr><tr>
    <td>source.h5live.rtmp</td><td><code>object</code></td><td></td><td><p>The rtmp playout object for h5live playback.</p>
</td>
    </tr><tr>
    <td>source.h5live.rtmp.url</td><td><code>string</code></td><td></td><td><p>The rtmp playout url. Have to include the domain, port and application e.g. &#39;rtmp://example.com:80/live&#39;.</p>
</td>
    </tr><tr>
    <td>source.h5live.rtmp.streamname</td><td><code>string</code></td><td></td><td><p>The rtmp streamname.</p>
</td>
    </tr><tr>
    <td>source.h5live.security</td><td><code>object</code></td><td></td><td><p>The h5live security object for h5live playback.</p>
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
    <td>source.h5live.params</td><td><code>object</code></td><td></td><td><p>The params object to pass custom query parameters over the h5live server connection. Parameters can be passed as key/value pairs.</p>
</td>
    </tr><tr>
    <td>source.bintu</td><td><code>object</code></td><td></td><td><p>An bintu object to get sources.</p>
</td>
    </tr><tr>
    <td>source.bintu.streamid</td><td><code>string</code></td><td></td><td><p>The bintu stream id.</p>
</td>
    </tr><tr>
    <td>source.bintu.apiurl</td><td><code>string</code></td><td><code>&quot;\&quot;https://bintu.nanocosmos.de\&quot;&quot;</code></td><td><p>The bintu api url.</p>
</td>
    </tr><tr>
    <td>source.hls</td><td><code>string</code></td><td></td><td><p>An hls playout url as string.</p>
</td>
    </tr><tr>
    <td>playback</td><td><code>object</code></td><td></td><td><p>The object to configure the playback.</p>
</td>
    </tr><tr>
    <td>playback.autoplay</td><td><code>boolean</code></td><td><code>true</code></td><td><p>Enable/disable autoplay (default: true). <br><b>IMPORTANT</b>: Browsers (mostly mobile) with stricter autoplay policy only allow autoplay with muted audio or within a user interaction (tap, click etc.). To allow autoplay in this case set the &#39;muted&#39; property to &#39;true&#39;. Known browsers are: Safari 11 on Mac OS X and Safari 10/11 on iOS, Chrome on Android (desktop versions follow in early 2018). See our <a href="https://www.nanocosmos.de/blog/2018/03/autoplay-on-web-pages-with-h5live-player-for-ultra-low-latency-live-streams/"><b>nanocosmos-blog</b></a> for more informations.</p>
</td>
    </tr><tr>
    <td>playback.automute</td><td><code>boolean</code></td><td><code>false</code></td><td><p>Enable/disable automute (default: false). <br><b>IMPORTANT</b>: Browsers (mostly mobile) with stricter autoplay policy only allow autoplay with muted audio or within a user interaction (tap, click etc.). With &#39;autoplay = true&#39; and this option enabled the player will be muted to allow autoplay in case the browsers policy restricted autoplay.</p>
</td>
    </tr><tr>
    <td>playback.muted</td><td><code>boolean</code></td><td><code>false</code></td><td><p>Mute/unmute the player (default: false). <br><b>IMPORTANT</b>: Browsers (mostly mobile) with stricter autoplay policy only allow autoplay with muted audio. To allow autoplay set the &#39;muted&#39; property to &#39;true&#39;. See property &#39;autoplay&#39; for more informations.</p>
</td>
    </tr><tr>
    <td>playback.metadata</td><td><code>boolean</code></td><td><code>false</code></td><td><p>Enable/disable metadata (default: false).</p>
</td>
    </tr><tr>
    <td>playback.forceTech</td><td><code>string</code></td><td></td><td><p>Force the player to use this tech - possible values: &quot;h5live&quot;, &quot;flash&quot;, &quot;hls.native&quot;</p>
</td>
    </tr><tr>
    <td>playback.flashplayer</td><td><code>string</code></td><td></td><td><p>A absolute or relative path to the &quot;nano.player.swf&quot;. If not set the player will be required from the base path.</p>
</td>
    </tr><tr>
    <td>playback.videoId</td><td><code>string</code></td><td></td><td><p>An element id of a existing video tag that should be used for playback. No new element will be created and after destroy it will be kept.</p>
</td>
    </tr><tr>
    <td>playback.keepConnection</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If enabled the player will have always a connection to the h5live server.</p>
</td>
    </tr><tr>
    <td>playback.reconnect</td><td><code>object</code></td><td></td><td><p>The reconnect object to configure the reconnect settings. See <a href="#NanoPlayer..errorcode">errorcodes</a> for reconnect possibility.</p>
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
    <td>style</td><td><code>object</code></td><td></td><td><p>The object to configure the style of the player.</p>
</td>
    </tr><tr>
    <td>style.width</td><td><code>string</code></td><td><code>&quot;&#x27;640px&#x27;&quot;</code></td><td><p>The width of the player in pixels (e.g 320px) or percentage (80%) (height or aspectratio have to be set too). Use &#39;auto&#39; to keep the parents size (height and aspectratio have no effect).</p>
</td>
    </tr><tr>
    <td>style.height</td><td><code>string</code></td><td></td><td><p>The height of the player in pixels (e.g 240px) or percentage (45%)  (width or aspectratio have to be set too). Use &#39;auto&#39; to keep the parents size (width and aspectratio have no effect).</p>
</td>
    </tr><tr>
    <td>style.aspectratio</td><td><code>string</code></td><td><code>&quot;&#x27;16/9&#x27;&quot;</code></td><td><p>The aspectratio of the player (e.g. 16/9) (width or height have to be set too).</p>
</td>
    </tr><tr>
    <td>style.controls</td><td><code>boolean</code></td><td><code>true</code></td><td><p>Show/hide video controls.</p>
</td>
    </tr><tr>
    <td>style.interactive</td><td><code>boolean</code></td><td><code>true</code></td><td><p>Enable/disable interactivity of the player on click/touch.</p>
</td>
    </tr><tr>
    <td>style.view</td><td><code>boolean</code></td><td><code>true</code></td><td><p>Enable/disable view port handling/animations.</p>
</td>
    </tr><tr>
    <td>style.scaling</td><td><code>string</code></td><td><code>&quot;&#x27;letterbox&#x27;&quot;</code></td><td><p>Set&#39;s the display mode for the video inside the player - possible values: &quot;letterbox&quot;, &quot;fill&quot;, &quot;crop&quot;, &quot;original&quot;, &quot;resize&quot;.</p>
</td>
    </tr><tr>
    <td>style.keepFrame</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true the last played frame will be displayed after a pause.</p>
</td>
    </tr><tr>
    <td>style.displayAudioOnly</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true a audio symbol will be shown in case of a stream with audio only.</p>
</td>
    </tr><tr>
    <td>style.audioPlayer</td><td><code>boolean</code></td><td><code>false</code></td><td><p>If true a player will be created as an audio player without video functionality. Controls can be enabled/disabled. The size can be customized via &#39;width&#39; and &#39;height&#39;. Default is 640px * 51px.</p>
</td>
    </tr><tr>
    <td>style.displayMutedAutoplay</td><td><code>boolean</code></td><td><code>true</code></td><td><p>If true a muted audio symbol will be shown in case of muted autoplay.</p>
</td>
    </tr><tr>
    <td>events</td><td><code>object</code></td><td></td><td><p>The object to set handlers to the player events.</p>
</td>
    </tr><tr>
    <td>events.onReady</td><td><code>function</code></td><td></td><td><p>Fires if the player is ready to play after successful setup.</p>
</td>
    </tr><tr>
    <td>events.onPlay</td><td><code>function</code></td><td></td><td><p>Fires if playout is started.</p>
</td>
    </tr><tr>
    <td>events.onPause</td><td><code>function</code></td><td></td><td><p>Fires if playout is paused.</p>
</td>
    </tr><tr>
    <td>events.onLoading</td><td><code>function</code></td><td></td><td><p>Fires if playout was stopped or player is ready after setup and tries to play.</p>
</td>
    </tr><tr>
    <td>events.onStartBuffering</td><td><code>function</code></td><td></td><td><p>Fires if playout is started but no media is available.</p>
</td>
    </tr><tr>
    <td>events.onStopBuffering</td><td><code>function</code></td><td></td><td><p>Fires if playout resumes after buffering.</p>
</td>
    </tr><tr>
    <td>events.onError</td><td><code>function</code></td><td></td><td><p>Fires if any kind of error occures.</p>
</td>
    </tr><tr>
    <td>events.onStats</td><td><code>function</code></td><td></td><td><p>Fires if the player has measured statistics.</p>
</td>
    </tr><tr>
    <td>events.onMetaData</td><td><code>function</code></td><td></td><td><p>Fires if the player has received metadata.</p>
</td>
    </tr><tr>
    <td>events.onMuted</td><td><code>function</code></td><td></td><td><p>Fires if the player is muted.</p>
</td>
    </tr><tr>
    <td>events.onUnmuted</td><td><code>function</code></td><td></td><td><p>Fires if the player is unmuted.</p>
</td>
    </tr><tr>
    <td>events.onVolumeChange</td><td><code>function</code></td><td></td><td><p>Fires if the player&#39;s volume has changed.</p>
</td>
    </tr><tr>
    <td>events.onStreamInfo</td><td><code>function</code></td><td></td><td><p>Fires if stream info is available.</p>
</td>
    </tr><tr>
    <td>events.onWarning</td><td><code>function</code></td><td></td><td><p>Fires if something is not as expected, but functionality works.</p>
</td>
    </tr><tr>
    <td>tweaks</td><td><code>object</code></td><td></td><td><p>The object to tweak the player (only h5live).</p>
</td>
    </tr><tr>
    <td>tweaks.buffer</td><td><code>object</code></td><td></td><td><p>The bufffer object.</p>
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
    <td>tweaks.bufferDynamic</td><td><code>object</code></td><td></td><td><p>The bufffer dynamic object.</p>
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
    </tr>  </tbody>
</table>

**Example**  
```js
var config = {
    source: {
        bintu: {
            streamid: 'q23rf2tzw3h6754iretmft7irt'
        }
    }
}
```
**Example**  
```js
var config = {
    source: {
        h5live: {
            server: {
                websocket: 'wss://h5live.nanocosmos.de/h5live/stream',
                hls: 'https://h5live.nanocosmos.de/h5live/http/playlist.m3u8'
            },
            rtmp: {
                url: 'rtmp://example.nanocosmos.de:80/live',
                streamname: 'h5liveStream'
            },
            security: {
                token: 'awe456b367g4e6rm8f56hbe6gd8f5m8df6n8idf6tf8mfd68ndi',
                expires: '1519819200',
                options: '15',
                tag: 'anyTag'
            }
        }
    },
    playback: {
        autoplay: false,
        metadata: true,
        keepConnection: true,
        reconnect: {
            minDelay: 2.5,
            maxDelay: 12.5,
            delaySteps: 6,
            maxRetries: 20
        }
    },
    events: {
        onWarning: function (e) {
            console.log(e);
        }
    },
    style: {
        width: '1280px',
        height: '720px'
    },
    tweaks: {
        buffer: {
            min: 0.2,
            start: 0.5,
            max: 8.0,
            target: 1.2,
            limit: 1.7
        },
        bufferDynamic: {
            offsetThreshold: 2,
            offsetStep: 0.5,
            cooldownTime: 10
        }
    }
}
```
**Example**  
```js
var config = {
    source: {
        h5live: {
            server: {
                websocket: 'wss://h5live.nanocosmos.de/h5live/stream',
                hls: 'https://h5live.nanocosmos.de/h5live/http/playlist.m3u8'
            },
            params: {
                url: 'rtmp://example.nanocosmos.de:80/live',
                stream: 'h5liveStream',
                custom_key: 'custom_value'
            }
        }
    },
    playback: {
        autoplay: false,
        videoId: 'myVideoTagId'
    },
    events: {
        onStats: function (e) {
            console.log(e);
        }
    },
    style: {
       view: false
    }
}
```
**Example**  
```js
var config = {
    source: {
        h5live: {
            server: {
                websocket: 'wss://h5live.nanocosmos.de/h5live/stream',
                hls: 'https://h5live.nanocosmos.de/h5live/http/playlist.m3u8'
            },
            rtmp: {
                url: 'rtmp://example.nanocosmos.de:80/live',
                streamname: 'gwr23t4q3g3'
            }
        },
        token: "{\"type\":\"token1\",\"key\":\"exampleToken\"}"
    },
    playback: {
        autoplay: true,
        muted: true
    },
    events: {
        onReady: function (e) {
            console.log('player ready with ' + JSON.stringify(e));
        },
        onPlay: function (e) {
            console.log('playing');
        },
        onPause: function (e) {
            console.log('pause');
            if (e.data.reason !== 'normal') {
                alert('Paused with reason: ' + e.data.reason);
            }
        },
        onError: function (e) {
            try {
                var err = JSON.stringify(e);
                if (err === '{}') {
                    err = e.message;
                }
                e = err;
            } catch (err) { }
            console.log(e);
            alert(e);
        },
        onMetaData: function (e) {
            console.log(e);
        },
        onStats: function (e) {
            console.log(e);
        },
        onStreamInfo: function (e) {
            console.log(e);
        },
    },
    style: {
        width: '1280px',
        aspectratio: '16/9',
        controls: false,
        scaling: 'crop'
    }
}
```
<a name="NanoPlayer..errorcode"></a>

### NanoPlayer~errorcode : <code>number</code>
The possible error codes in a onError event.

**Kind**: inner typedef of <code>[NanoPlayer](#NanoPlayer)</code>  
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
    <td>1000-1999.1001</td><td></td><td><p>No rtmp url set.</p>
</td>
    </tr><tr>
    <td>1000-1999.1002</td><td></td><td><p>No server set.</p>
</td>
    </tr><tr>
    <td>1000-1999.1003</td><td></td><td><p>Could not play because player has not been configured.</p>
</td>
    </tr><tr>
    <td>1000-1999.1004</td><td></td><td><p>Could not pause because player was not in playing state before.</p>
</td>
    </tr><tr>
    <td>1000-1999.1005</td><td></td><td><p>Playback must be initialized by user gesture.</p>
</td>
    </tr><tr>
    <td>1000-1999.1006</td><td></td><td><p>Buffer config is invalid.</p>
</td>
    </tr><tr>
    <td>1000-1999.1007</td><td></td><td><p>Playback suspended by external reason.</p>
</td>
    </tr><tr>
    <td>1000-1999.1008</td><td></td><td><p>Playback error.</p>
</td>
    </tr><tr>
    <td>2000-2999</td><td><code>StreamError</code></td><td></td>
    </tr><tr>
    <td>2000-2999.2001</td><td></td><td><p>The requested stream can not be found.</p>
</td>
    </tr><tr>
    <td>2000-2999.2002</td><td></td><td><p>No media available.</p>
</td>
    </tr><tr>
    <td>2000-2999.2011</td><td></td><td><p>Received metadata with wrong index.</p>
</td>
    </tr><tr>
    <td>2000-2999.2012</td><td></td><td><p>Received metadata with invalid json string.</p>
</td>
    </tr><tr>
    <td>2000-2999.2013</td><td></td><td><p>Received metadata but no start index.</p>
</td>
    </tr><tr>
    <td>2000-2999.2014</td><td></td><td><p>Received metadata with start index but currently process another.</p>
</td>
    </tr><tr>
    <td>3000-3999</td><td><code>MediaError</code></td><td></td>
    </tr><tr>
    <td>3000-3999.3001</td><td></td><td><p>A fetching process of the media aborted by user.</p>
</td>
    </tr><tr>
    <td>3000-3999.3002</td><td></td><td><p>An error occurred when downloading media.</p>
</td>
    </tr><tr>
    <td>3000-3999.3003</td><td></td><td><p>An error occurred when decoding media.</p>
</td>
    </tr><tr>
    <td>3000-3999.3004</td><td></td><td><p>The received audio/video is not supported.</p>
</td>
    </tr><tr>
    <td>4000-4999</td><td><code>NetworkError</code></td><td></td>
    </tr><tr>
    <td>4000-4999.4000-4099</td><td><code>General</code></td><td></td>
    </tr><tr>
    <td>4000-4999.4000-4099.4001</td><td></td><td><p>Could not establish connection. Maybe wrong protocol or path.</p>
</td>
    </tr><tr>
    <td>4000-4999.4000-4099.4002</td><td></td><td><p>Connection error.</p>
</td>
    </tr><tr>
    <td>4000-4999.4000-4099.4003</td><td></td><td><p>Maximum number of reconnection tries reached.</p>
</td>
    </tr><tr>
    <td>4000-4999.4000-4099.4004</td><td></td><td><p>Reconnection configuration invalid.</p>
</td>
    </tr><tr>
    <td>4000-4999.4100-4199</td><td><code>WebSocket</code></td><td></td>
    </tr><tr>
    <td>4000-4999.4100-4199.4101</td><td></td><td><p>An endpoint is &quot;going away&quot;, such as a server going down or a browser having navigated away from a page.</p>
</td>
    </tr><tr>
    <td>4000-4999.4100-4199.4102</td><td></td><td><p>An endpoint is terminating the connection due to a protocol error. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4000-4999.4100-4199.4103</td><td></td><td><p>An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message). Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4000-4999.4100-4199.4104</td><td></td><td><p>Reserved. The specific meaning might be defined in the future.</p>
</td>
    </tr><tr>
    <td>4000-4999.4100-4199.4105</td><td></td><td><p>No status code was actually present. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4000-4999.4100-4199.4106</td><td></td><td><p>Maybe no network, wrong url or server down. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4000-4999.4100-4199.4107</td><td></td><td><p>An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [<a href="http://tools.ietf.org/html/rfc3629">http://tools.ietf.org/html/rfc3629</a>] data within a text message). Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4000-4999.4100-4199.4108</td><td></td><td><p>An endpoint is terminating the connection because it has received a message that &quot;violates its policy&quot;. This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4000-4999.4100-4199.4109</td><td></td><td><p>An endpoint is terminating the connection because it has received a message that is too big for it to process. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4000-4999.4100-4199.4110</td><td></td><td><p>An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn&#39;t return them in the response message of the WebSocket handshake.</p>
</td>
    </tr><tr>
    <td>4000-4999.4100-4199.4111</td><td></td><td><p>A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4000-4999.4100-4199.4115</td><td></td><td><p>The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can&#39;t be verified). Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4000-4999.4400-4499</td><td><code>Http</code></td><td></td>
    </tr><tr>
    <td>4000-4999.4400-4499.4400</td><td></td><td><p>Bad request. Maybe stream parameters are missing or malformed.</p>
</td>
    </tr><tr>
    <td>4000-4999.4400-4499.4403</td><td></td><td><p>Access denied. The authentication token is missing or invalid.</p>
</td>
    </tr><tr>
    <td>4000-4999.4400-4499.4500</td><td></td><td><p>The connection has been rejected due an internal server error. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4000-4999.4400-4499.4503</td><td></td><td><p>The requested service is currently unavailable. Reconnect possible.</p>
</td>
    </tr><tr>
    <td>4000-4999.4900-4999</td><td><code>Security</code></td><td></td>
    </tr><tr>
    <td>4000-4999.4900-4999.4900</td><td></td><td><p>The security service has been rejected due an internal server error.</p>
</td>
    </tr><tr>
    <td>4000-4999.4900-4999.4901</td><td></td><td><p>The security service denied access. The authentication token is invalid.</p>
</td>
    </tr><tr>
    <td>4000-4999.4900-4999.4903</td><td></td><td><p>The security service denied access. The url is expired or a token parameter is missing (expires, token, or options).</p>
</td>
    </tr><tr>
    <td>4000-4999.4900-4999.4904</td><td></td><td><p>The security service can not be found.</p>
</td>
    </tr>  </tbody>
</table>

<a name="NanoPlayer..state"></a>

### NanoPlayer~state : <code>number</code>
The state of the player.

**Kind**: inner typedef of <code>[NanoPlayer](#NanoPlayer)</code>  
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
    </tr>  </tbody>
</table>

<a name="NanoPlayer..pausereason"></a>

### NanoPlayer~pausereason : <code>string</code>
The possible pause reason in a onPause event.

**Kind**: inner typedef of <code>[NanoPlayer](#NanoPlayer)</code>  
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
    <td>buffer</td><td><p>Paused by buffer timeout. The stream was stopped or the buffer was underrunned.</p>
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
    </tr>  </tbody>
</table>

<a name="performance marks"></a>

## performance marks
This marks will be set via 'performance.mark()' and are related to a websocket connection only. Marks can be read with performance.getEntriesByName(name) that returns an array with objects. The object has the properties 'entryType=mark', 'name' and 'startTime'. The middle part of the name string is the element id of the player container. Not supported on Safari 11 OSX and iOS.

**Kind**: global variable  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>nano.[playerDivId].connecting</td><td><code>string</code></td><td><p>Will be set if the websocket connect is started.</p>
</td>
    </tr><tr>
    <td>nano.[playerDivId].connected</td><td><code>string</code></td><td><p>Will be set if the websocket connection is established.</p>
</td>
    </tr><tr>
    <td>nano.[playerDivId].disconnected</td><td><code>string</code></td><td><p>Will be set if the websocket connection is closed.</p>
</td>
    </tr><tr>
    <td>nano.[playerDivId].resuming</td><td><code>string</code></td><td><p>Will be set if the websocket connection is established and a play command will be send (keepConnection only).</p>
</td>
    </tr><tr>
    <td>nano.[playerDivId].firstFragmentReceived</td><td><code>string</code></td><td><p>Will be set if the first fragment is received over the websocket connection.</p>
</td>
    </tr><tr>
    <td>nano.[playerDivId].firstFrameRendered</td><td><code>string</code></td><td><p>Will be set if the first frame is received over the websocket connection.</p>
</td>
    </tr>  </tbody>
</table>

