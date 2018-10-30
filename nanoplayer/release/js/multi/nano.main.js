var streamobj = [];

(function () {
    'use strict';

    var Bintu;
    var BintuStreamFilter;
    var NanoTools;
    var NanoPlayer;

    var AppController = function (nanoPlayer) {
        NanoPlayer = nanoPlayer;
        Bintu = window.Bintu;
        BintuStreamFilter = window.BintuStreamFilter;
        NanoTools = window.NanoTools;
        this.config = {
            source: {
                bintu: {}
            },
            events: {
                onReady: this.onReady.bind(this),
                onPlay: this.onPlay.bind(this),
                onPause: this.onPause.bind(this),
                onLoading: this.onLoading.bind(this),
                onStartBuffering: this.onStartBuffering.bind(this),
                onStopBuffering: this.onStopBuffering.bind(this),
                onError: this.onError.bind(this),
                onMetaData: this.onMetaData.bind(this)
            },
            playback: {
                autoplay: true,
                muted: true,
                metadata: false
            },
            style: {
                width: 'auto',
                height: 'auto'
            }
        }
        this.bintuQuery = {};
        this.h5liveQuery = {};
        this.searchRefreshInterval = 0;
        this.players = {};
        this.playersToStart = {};
        this.playersConnectionErrors = {};
        this.autoLoad = false;
        this.cropMode = "fit";
    };

    var proto = AppController.prototype;

    proto.bintu = Object.create(null);

    proto.Init = function () {
        this.bintuQuery = NanoTools.getHTTPParam('bintu');
        if (this.bintuQuery) {
            this.bintuQuery = JSON.parse(bintuQuery);
        } else {
            this.bintuQuery = {};
            this.bintuQuery.apiurl = NanoTools.getHTTPParam('bintu.apiurl');
            this.bintuQuery.apikey = NanoTools.getHTTPParam('bintu.apikey');
            this.bintuQuery.tags = NanoTools.getHTTPParam('bintu.tags');
            this.bintuQuery.state = NanoTools.getHTTPParam('bintu.state');
        }
        if (this.bintuQuery.apikey) {
            el = document.getElementById('valid');
            el.style.display = 'block';
            this.registerEventHandler();
            var force = NanoTools.getHTTPParam('force');
            if (force) {
                this.config.playback = this.config.playback || {};
                this.config.playback.forceTech = force;
            }
            var metadata = NanoTools.getHTTPParam('playback.metadata');
            if (metadata) {
                this.config.playback = this.config.playback || {};
                this.config.playback.metadata = true;
            }
            this.config.source.bintu = {};
            if (!this.bintuQuery.apiurl) {
                this.bintuQuery.apiurl = (document.location.href.indexOf('local') !== -1) ? "https://bintu.nanocosmos.de" : "https://bintu-local.nanocosmos.de";
            }
            this.config.source.bintu.apiurl = this.bintuQuery.apiurl;
            if (this.bintuQuery.tags) {
                document.getElementById('bintuTags').value = this.bintuQuery.tags;
            }
            if (this.bintuQuery.state) {
                var el = document.querySelector('input[value=' + this.bintuQuery.state + ']');
                if (el) el.checked = true;
            }
            this.h5liveQuery = {};
            this.h5liveQuery.server = NanoTools.getHTTPParam('h5live.server');
            if (this.h5liveQuery.server) {
                this.h5liveQuery.server = {};
                try {
                    var servers = JSON.parse(this.h5liveQuery.server); // parse server object (new since 1.0.2) 
                    this.h5liveQuery.server = servers;
                } catch (e) {
                    this.h5liveQuery.server.websocket = this.h5liveQuery.server; // fallback for versions < 1.0.2 
                }
                this.config.source.h5live = this.h5liveQuery;
            } else { // try parse seperately 
                this.h5liveQuery.server = {};
                this.h5liveQuery.server.websocket = NanoTools.getHTTPParam('h5live.server.websocket');
                this.h5liveQuery.server.progressive = NanoTools.getHTTPParam('h5live.server.progressive');
                this.h5liveQuery.server.hls = NanoTools.getHTTPParam('h5live.server.hls');
                if (this.h5liveQuery.server.websocket || this.h5liveQuery.server.progressive || this.h5liveQuery.server.hls) {
                    this.config.source.h5live = {};
                    this.config.source.h5live.server = {};
                    if (this.h5liveQuery.server.websocket) {
                        this.config.source.h5live.server.websocket = this.h5liveQuery.server.websocket;
                    }
                    if (this.h5liveQuery.server.progressive) {
                        this.config.source.h5live.server.progressive = this.h5liveQuery.server.progressive;
                    }
                    if (this.h5liveQuery.server.hls) {
                        this.config.source.h5live.server.hls = this.h5liveQuery.server.hls;
                    }
                }
            }
            this.h5liveQuery.token = NanoTools.getHTTPParam('h5live.token');
            if (this.h5liveQuery.token) {
                this.config.source.h5live = this.config.source.h5live || {};
                this.config.source.h5live.token = this.h5liveQuery.token;
            }
            this.bintu = new Bintu(this.bintuQuery.apiurl, this.bintuQuery.apikey);

            var crop = NanoTools.getHTTPParam("crop");
            if (crop) {
                switch (crop) {
                    case "letterbox":
                        crop = "letterbox";
                        break;
                    case "crop":
                        crop = "crop";
                        break;
                    case "fit":
                        crop = "fit";
                        break;
                    default:
                        crop = "none";
                        break;
                }
                this.cropMode = crop;
            }
            this.onClickGetStreams();
        } else {
            el = document.getElementById('invalid');
            el.style.display = 'block'
        }
    };

    proto.registerEventHandler = function () {
        var el = document.getElementById('bintuGetStreams');
        if (el.addEventListener)
            el.addEventListener('click', this.onClickGetStreams.bind(this), false);
        else if (el.attachEvent)
            el.attachEvent('click', this.onClickGetStreams.bind(this), false);
        el = document.getElementById('bintuAutoSearch');
        if (el.addEventListener)
            el.addEventListener('change', this.onCheckedAutoSearch.bind(this), false);
        else if (el.attachEvent)
            el.attachEvent('change', this.onCheckedAutoSearch.bind(this), false);
    };

    proto.onClickGetStreams = function () {
        var self = this;
        if (this.searchRefreshInterval) {
            clearInterval(self.searchRefreshInterval);
        }
        self.searchStreams();
        self.searchRefreshInterval = setInterval(self.searchStreams.bind(self), 8000);
    };

    proto.onCheckedAutoSearch = function (e) {
        var checked = e.currentTarget.checked;
        var self = this;
        if (checked) {
            if (self.searchRefreshInterval) {
                clearInterval(self.searchRefreshInterval);
            }
            self.searchStreams();
            self.searchRefreshInterval = setInterval(self.searchStreams.bind(self), 8000);
        } else {
            if (self.searchRefreshInterval) {
                clearInterval(self.searchRefreshInterval);
            }
        }
    }

    proto.searchStreams = function () {
        var streamFilter = new BintuStreamFilter();
        var state = document.querySelector('input[name=bintuState]:checked').value;
        if (state === 'all') state = null;
        var tags = document.getElementById('bintuTags').value;
        tags = tags.split(',');
        var realTags = [];
        for (var i = 0; i < tags.length; i += 1) {
            if (tags[i].length > 0)
                realTags.push(tags[i]);
        }
        streamFilter.setState(state);
        streamFilter.addTags(realTags);
        this.bintu.getStreams(streamFilter, this.onGetStreamsSuccess.bind(this), this.onGetStreamsError.bind(this));
    };

    proto._romanize = function (num) {
        var lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }, roman = '', i;
        for (i in lookup) {
            while (num >= lookup[i]) {
                roman += i;
                num -= lookup[i];
            }
        }
        return roman;
    };

    proto.onGetStreamsSuccess = function (request) {
        var el = document.getElementById('bintuStreamList');
        var item, label;
        var response = request.responseText;
        try {
            response = JSON.parse(response);
        } catch (err) {
            response = [];
        }

        /*
         * Start: Mapping Functionality
         *
         */

        //tryParseJSON: checks if string is json valid
        var tryParseJSON = function(str) {
            try {
                var o = JSON.parse(str);

                if (o && typeof o === "object") {
                    return o;
                }
            } catch (e) {}

            return false;
        }

        //getjsontag: returns a valid json string from tags object
        var getjsontag = function(item, index) {
            if (tryParseJSON(item)) return item;
        }
        var getrealtag = function(item) {
            var tags = [];
            if (!tryParseJSON(item)) return item;
        }

        //clear streamobj if not equal to response
        if (response.length === 0 || streamobj.length !== response.length) {
            streamobj.length = 0;
        }
        //storing all the steams in one object "streamobj"
        var gpsResponse = response.filter(function(value) {
            var res_tags  = JSON.stringify(value.tags),
                strtags   = res_tags.replace(/\\/g, "").replace(/\s/g, "");
            return (strtags.match(/"latitude":("?)\d+(\.\d{1,8})?("?)/g) !== null && strtags.match(/"longitude":("?)\d+(\.\d{1,8})?("?)/g) !== null);
        })
        for (var i = 0; i < gpsResponse.length; i++) {

            //get tags from response
            var res_tags  = JSON.stringify(gpsResponse[i].tags),
                strtags   = res_tags.replace(/\\/g, "").replace(/\s/g, "");

            //check if latitude exists
            if( strtags.match(/"latitude":("?)\d+(\.\d{1,8})?("?)/g) !== null ) {
                //extract latitude from response
                var lat  = strtags.match(/"latitude":("?)\d+(\.\d{1,8})?("?)/g).join().match(/\d+(\.\d{1,8})/g).join();
            }
            //check if longitude exists
            if( strtags.match(/"longitude":("?)\d+(\.\d{1,8})?("?)/g) !== null ){
                //extract longitude from response
                var lng  = strtags.match(/"longitude":("?)\d+(\.\d{1,8})?("?)/g).join().match(/\d+(\.\d{1,8})/g).join();
            }

            var gps   = { "latitude": lat, "longitude": lng }; // gps object

            //returns meta object
            var standalone = "http://demo.nanocosmos.de/nanoplayer/release/nanoplayer.html?bintu.apiurl=https://bintu.nanocosmos.de&bintu.streamid=" + gpsResponse[i].id,
                name = gpsResponse[i].ingest.rtmp.streamname,
                url = gpsResponse[i].playout.rtmp[0].url + '/' + gpsResponse[i].playout.rtmp[0].streamname,
                state = gpsResponse[i].state,
                realtags = gpsResponse[i].tags.filter(getrealtag).join();
            var vod = '<span>none</span>';
            if (gpsResponse[i].playout.web && gpsResponse[i].playout.web.length) {
                for (var k = 0; k < gpsResponse[i].playout.web.length; k += 1) {
                    if (gpsResponse[i].playout.web[k].type === 'vod') {
                        var vodurl = gpsResponse[i].playout.web[k].url;
                        if (vod === '<span>none</span>') vod = '';
                        vod += `<br> <a href="${vodurl}" target="_blank">${vodurl}</a>`;
                    }
                }
            }
            if( lat && lng ){
                streamobj[i] = {
                    "gps": gps,
                    "name": name,
                    "html": `<div class="marker-content">
                             <strong>ID:</strong>
                             <span>${gpsResponse[i].id}</span>
                             <div> <strong>URL: </strong> <span>${url}</span> </div>
                             <div> <strong>State:</strong> <span>${state}</span> </div>
                             <div> <strong>Tags:</strong> <span>${realtags}</span> </div>
                             <div> <strong>Standalone:</strong> <a href="${standalone}" target="_blank">Open</a> </div>
                             <div> <strong>Vod:</strong>${vod}</div>
                             </div>`
                }
            } else{
              streamobj = [];
            }

        }
        // END: Mapping Functionality


        var i, len = response.length;
        var allUnused = [];
        for (j = 0; j < el.childNodes.length; j += 1) {
            var found = false,
                child = el.childNodes[j];
            for (var k = 0; k < response.length; k += 1) {
                if (child.getAttribute && child.getAttribute('id') === 'item-' + response[k].id) {
                    found = true;
                    break;
                }
                if (child.dataset && child.dataset.id === response[k].id) {
                    found = true;
                    break;
                }
            }
            if (!found && child.dataset) {
                allUnused.push(child.dataset.id);
            }
        }
        for (j = 0; j < allUnused.length; j += 1) {
            var item = document.getElementById('item-' + allUnused[j])
            if (item)
                el.removeChild(item);
        }
        if (len === 0) {
            el.innerHTML = '';
            item = document.createElement('li');
            item.id = 'item-nostreamfound';
            item.className = 'list-group-item';
            item.innerHTML = '<span>no stream found with the given search parameters</span>';
            el.appendChild(item);
        } else {
            var item = document.getElementById('item-nostreamfound');
            if (item)
                el.removeChild(item);
        }
        for (i = 0; i < len; i += 1) {
            var state = response[i].state;
            var streamId = response[i].id;
            if (document.getElementById('item-' + streamId)) {
                continue;
            }
            item = document.createElement('li');
            item.className = 'list-group-item';
            item.setAttribute('id', 'item-' + streamId)
            var url = response[i].playout.rtmp[0].url + '/' + response[i].playout.rtmp[0].streamname;
            var tags = response[i].tags;
            item.setAttribute('data-id', streamId);
            item.setAttribute('data-state', state);
            item.innerHTML += '<strong>id: </strong>';
            item.innerHTML += '<span>' + streamId + '</span>';
            item.innerHTML += '<br/>';
            item.innerHTML += '<strong>url: </strong>';
            item.innerHTML += '<span id="url-' + streamId + '">' + url + '</span>';
            item.innerHTML += '<br/>';
            item.innerHTML += '<strong>state: </strong>';
            item.innerHTML += '<span>' + state + '</span>';
            item.innerHTML += '<br/>';
            item.innerHTML += '<strong>play status: </strong>';
            item.innerHTML += '<span id="status-player-' + streamId + '">uninitialized</span>';
            item.innerHTML += '<br/>';
            if (tags && tags.push) {
                var j, tLen;
                for (j = 0, tLen = tags.length; j < tLen; j += 1) {
                    if (j === 0)
                        item.innerHTML += '<strong>tags: </strong>';
                    item.innerHTML += '<span class="label label-default">' + tags[j] + '</span>';
                    if (j === tLen - 1)
                        item.innerHTML += '<br/>';
                }
            }
            item.innerHTML += '<strong>standalone player: </strong>';
            var link = '<a href="http://demo.nanocosmos.de/nanoplayer/release/nanoplayer.html?bintu.apiurl=' + this.config.source.bintu.apiurl + '&bintu.streamid=' + streamId;
            if (this.config.playback.forceTech) {
                link += '&force=' + this.config.playback.forceTech;
            }
            link += '" target="_blank">';
            link += 'open';
            link += '</a>';
            item.innerHTML += link;
            item.innerHTML += '<br/>';
            el.appendChild(item);
        }
        this.createStreams();
    };

    proto.onGetStreamsError = function (message) {
        var el = document.getElementById('bintuStreamList');
        el.innerHTML = "";
        var item = document.createElement('li');
        item.className = 'list-group-item';
        item.innerHTML = '<span>no stream found</span>';
        el.appendChild(item);
        if (message.request && (typeof message.request.status !== 'undefined') && message.request.status === 0) {
            this.messageBox("no stream found, maybe no network?");
        } else {
            this.messageBox("no stream found");
        }
    };

    proto.createStreams = function() {
        var self = this,
            i, len, j, len2, liveSpans = document.querySelectorAll('li[data-state=live]'),
            parent = document.getElementById('bintuPlayoutContent'),
            allIds = [],
            newIds = [];
        for (i = 0, len = liveSpans.length; i < len; i += 1) {
            var id = liveSpans[i].dataset.id;
            allIds.push(id);
            var el = document.getElementById('player-' + id);
            if (el) continue;
            newIds.push(id);
            var div = document.createElement('div');
            div.setAttribute('id', 'playout-' + id);
            div.style.width = "33.3%";
            div.style.padding = "10px";
            div.style.backgroundColor = "transparent";
            div.style.position = "relative";
            var divObj = document.createElement('div');
            divObj.setAttribute('id', 'player-' + id);
            divObj.style.cssText = "width:100% !important;height:100% !important;background-color: black";
            divObj.setAttribute('data-id', id);
            var divEmbed = document.createElement('div');
            divEmbed.setAttribute('id', id);

            this.players[id] = new NanoPlayer('player-' + id);
            //divObj.appendChild(divEmbed); 
            div.appendChild(divObj);
            parent.appendChild(div);
            divEmbed.style.width = div.offsetWidth + 'px';
            divEmbed.style.height = div.offsetHeight + 'px';
            var width = div.offsetWidth;
            var height = Math.round(width * 4 / 4);
            div.style.height = height + "px";
            div.style.cssFloat = "left";
            div.className = "";
            this.playersToStart[id] = true;
            this.playersConnectionErrors[id] = 0;
        }
        var allUnused = [];
        for (j = 0; j < parent.childNodes.length; j += 1) {
            var child = parent.childNodes[j];
            if (child.id) {
                var id = child.id.replace('playout-','');
                if (allIds.indexOf(id) === -1) {
                    allUnused.push(id);
                }
            }
        }
        for (j = 0; j < allUnused.length; j += 1) {
            if (this.players[allUnused[j]]) {
                this.players[allUnused[j]].destroy();
                delete this.players[allUnused[j]];
                delete this.playersToStart[allUnused[j]];
                delete this.playersConnectionErrors[allUnused[j]];
            }
            var el = document.getElementById('playout-' + allUnused[j]);
            if (el)
                parent.removeChild(el);
        }
        function copy(original) {
            var clone = Object.create(Object.getPrototypeOf(original));
            var i, descriptor, keys = Object.getOwnPropertyNames(original);
            for (i = 0 ; i < keys.length ; i++) {
                descriptor = Object.getOwnPropertyDescriptor(original, keys[i]);
                if (descriptor.value && typeof descriptor.value === 'object') {
                    descriptor.value = copy(descriptor.value);
                }
                Object.defineProperty(clone, keys[i], descriptor);
            }
            return clone;
        }
        function success(id) {
            var config = copy(self.config);
            config.source.bintu.streamid = id;
            self.players[id] && self.players[id].setup(config).then(function (config) {
                document.getElementById('demo-version').innerText = 'version ' + self.players[id].version;
                newIds.shift();
                if (newIds.length > 0) {
                    success(newIds[0]);
                }
            }, function error(e) {
                document.getElementById('status-player-' + id).innerText = e.message;
                self.log(e.message);
            });
        }
        if (newIds.length > 0) {
            success(newIds[0]);
        }
        /*setTimeout(function success() { 
            for (var id in self.players) { 
                if (!newIds[id]) continue; 
                if (!self.players[id] || !self.players[id].SetApplicationName) { 
                    setTimeout(success, 1000); 
                } else { 
                    var el = document.getElementById('url-' + id); 
                    if (el) { 
                        var url = el.innerHTML; 
                        self.players[id].SetApplicationName(id); 
                        self.players[id].UseNetstream("0"); 
                        self.players[id].SetCropMode(self.cropMode); 
                        self.players[id].SetAutoResizeOfContainer("false"); 
                        self.players[id].SetVisible("false"); 
                        self.players[id].SetVolume(0); 
                        self.players[id].SetBufferTime(0.5); 
                        self.players[id].SetStreamUrl(url); 
                        self.players[id].Start(); 
                    } 
                } 
            } 
        }, 1000);*/

        window.addEventListener('resize', function () {
            for (var id in self.players) {
                self.sizePlayerContainer(id);
            }
        }, false);
    };

    proto.onReady = function (e) {
        var player = e.player;
        this.log('[' + player + ']: ready');
        var el = document.getElementById('status-' + player);
        if (el) {
            el.innerText = 'ready';
        }
        //document.getElementById('error-container').style.display = 'none'; 
    };

    proto.onPlay = function (e) {
        var player = e.player;
        this.log('[' + player + ']: playing');
        var el = document.getElementById('status-' + player);
        if (el) {
            el.innerText = 'playing';
        }
        //document.getElementById('error-container').style.display = 'none'; 
    };

    proto.onPause = function (e) {
        var player = e.player;
        var id = player.replace('player-', '');
        var self = this;
        this.log('[' + player + ']: pause');
        var el = document.getElementById('status-' + player);
        if (e.data.reason === 'servernotfound') {
            if (el) {
                el.innerText = 'paused (server not found... reconnecting)';
            }
            setTimeout(function() {
                self.players[id].play();
            }, 2000);
        } else if (e.data.reason === 'streamnotfound') {
            if (el) {
                el.innerText = 'paused (stream not found... reconnecting)';
            }
            setTimeout(function() {
                self.players[id].play();
            }, 2000);
        } else if (e.data.reason === 'buffer') {
            if (el) {
                el.innerText = 'paused (buffer timeout... reconnecting)';
            }
            setTimeout(function() {
                self.players[id].play();
            }, 2000);
        } else if (e.data.reason === 'connectionclose') {
            if (el) {
                el.innerText = 'paused (server connection lost... reconnecting)';
            }
            setTimeout(function() {
                self.players[id].play();
            }, 2000);
        } else if (e.data.reason === 'unknown') {
            if (el) {
                el.innerText = 'paused (unknown error... reconnecting)';
            }
            setTimeout(function() {
                self.players[id].play();
            }, 2000);
        } else if (e.data.reason === 'normal') {
            if (el) {
                el.innerText = 'paused';
            }
            //document.getElementById('error-container').style.display = 'none'; 
        }
    };

    proto.onLoading = function (e) {
        var player = e.player;
        this.log('[' + player + ']: loading');
        var el = document.getElementById('status-' + player);
        if (el) {
            el.innerText = 'loading';
        }
        //document.getElementById('error-container').style.display = 'none'; 
    };

    proto.onStartBuffering = function (e) {
        var player = e.player;
        this.log('[' + player + ']: buffering');
        var el = document.getElementById('status-' + player);
        if (el) {
            el.innerText = 'buffering';
        }
        //document.getElementById('error-container').style.display = 'none'; 
    };

    proto.onStopBuffering = function (e) {
        var player = e.player;
        this.log('[' + player + ']: resume playing');
        var el = document.getElementById('status-' + player);
        if (el) {
            el.innerText = 'playing (resumed)';
        }
        //document.getElementById('error-container').style.display = 'none'; 
    };

    proto.onError = function (e) {
        var player = e.player;
        try {
            var err = JSON.stringify(e);
            if (err === '{}') {
                err = e.message;
            }
            e = err;
        } catch (err) { }
        this.log('[' + player + ']: Error: ' + e);
        var el = document.getElementById('status-' + player);
        if (el) {
            el.innerText = 'Error: ' + e;
        }
        //document.getElementById('error-container').style.display = 'block'; 
    };

    proto.onMetaData = function (e) {
        var player = e.player;
        this.log(e);
    };

    proto.log = function (e) {
        if (typeof e === 'object') {
            if (e.message) {
                e = e.message;
            } else {
                try {
                    e = JSON.stringify(e);
                } catch (err) { }
            }
        }
        e = new Date().toLocaleTimeString() + ": " + e;
        console.log(e);
    };

    proto.getRamdomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    proto.sizePlayerContainer = function (id) {
        var div = document.getElementById('playout-' + id);
        if (div) {
            var width = div.offsetWidth;
            var height = Math.round(width * 4 / 4);
            div.style.height = height + "px";
            div.style.cssFloat = "left";
        }
    };

    proto.sizePlayer = function(id) {
        var el = document.getElementById("player-" + id);
        if (el) {
            var width = el.offsetWidth,
                height = el.offsetHeight,
                percentWidth, percentHeight, percentMargin;
            var widthPlayout = parseInt(document.getElementById("playout-" + id).offsetWidth),
                heightPlayout = parseInt(document.getElementById("playout-" + id).offsetHeight);
            var ratio = width / height;
            var contRatio = widthPlayout / heightPlayout;
            if (ratio > contRatio) {
                percentHeight = parseInt(widthPlayout / (ratio * heightPlayout) * 100);
                percentMargin = parseInt(100 - percentHeight) / 2;
                el.style.height = percentHeight + "%";
                el.style.marginTop = percentMargin + "%";
            } else {
                percentWidth = parseInt((ratio * heightPlayout) / widthPlayout * 100);
                percentMargin = parseInt(100 - percentWidth) / 2;
                el.style.width = percentWidth + "%";
                el.style.marginLeft = percentMargin + "%";
            }
        }
    };

    proto.messageBox = function (message, alert) {
        var mb = document.getElementById('message-box');
        var ph = mb.childNodes[1];
        ph.childNodes[0].textContent = !!alert ? 'Error' : 'Message';
        var pb = mb.childNodes[3];
        !!alert ? pb.style.color = 'red' : 'black';
        var span = pb.childNodes[1];
        span.innerHTML = message;
        document.getElementById('btn-x').addEventListener('click', function () {
            document.getElementById('message-box').style.display = 'none';
        });
        document.getElementById('btn-ok').addEventListener('click', function () {
            document.getElementById('message-box').style.display = 'none';
        });
        mb.style.display = 'block';
    };

    return (window.AppController = AppController);
})();