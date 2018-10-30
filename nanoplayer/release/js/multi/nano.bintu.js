/** 
 * @license 
 * Copyright (c) 2016 nanocosmos IT GmbH. All rights reserved. 
 * http://www.nanocosmos.de 
 * Bintu Release Version 0.6 
 */

/** 
 * @file Bintu Streaming API Class. 
 * @author nanocosmos IT GmbH 
 * @copyright (c) 2016 nanocosmos IT GmbH. All rights reserved. 
 * @version 0.6 
 */

; (function () {
    'use strict';

    /** 
     * Bintu Streaming API. 
     * @class Bintu 
     * @classdesc Bintu Streaming API Class Version 0.6. 
     * @constructor 
     * @param {string} apiUrl - The base url to the Bintu API. 
     * @param {string} [apiKey] - The apikey to use with Bintu API. 
     * @param {string} [playerKey] - The playerkey to use with Bintu API. 
     * @param {string} [keyMode] - The keymode to use with Bintu API. 
     * @example Javascript 
     * var apiKey = 'dfg5490htk64jzep0zhdhdthjkhp69zuk'; 
     * var apiUrl = 'https://bintu.nanocosmos.de'; 
     * var bintu = new Bintu(apiKey, apiUrl); 
     */
    var Bintu = function (apiUrl, apiKey, isWebrtcStream, isTranscodedStream, playerKey, keyMode) {
        if (!(apiUrl.length > 0 && (typeof apiUrl === 'string' || apiUrl instanceof String))) {
            throw new Error("The param 'apiUrl' must be of type 'string' and also may not be empty string.");
            return;
        } else {
            this.apiUrl = apiUrl;
        }
        if (!!apiKey && (typeof apiKey === 'string' || apiKey instanceof String)) {
            this.apiKey = apiKey;
        }
        if (!!playerKey && (typeof playerKey === 'string' || playerKey instanceof String)) {
            this.playerKey = playerKey;
        }
        if (!!keyMode && (typeof keyMode === 'string' || keyMode instanceof String)) {
            if (keyMode === 'api' || keyMode === 'player') {
                this.keyMode = keyMode;
            } else {
                throw new Error("The param 'keyMode' must be 'api', 'player' or undefined");
                return;
            }
        }
        this.isWebrtcStream = !!isWebrtcStream;
        this.isTranscodedStream = !!isTranscodedStream;
    };

    /** 
     * The callback for a successful Bintu call 
     * @callback successCallback 
     * @see [Bintu]{@link Bintu} 
     * @param {XMLHttpRequest} request - The XMLHttpRequest with the response. 
     * @example 
     * function successCallback(request) { 
     *     var response = request.responseText; 
     *     try { 
     *         response = JSON.parse(response); 
     *         console.log(response); 
     *     } catch (err) { 
     *         console.error('error parsing json response: ' + err.message); 
     *     } 
     * } 
     */

    /** 
     * The callback for a failed Bintu call 
     * @callback errorCallback 
     * @see [Bintu]{@link Bintu} 
     * @param {object} error - The error object. 
     * @param {string} error.error - The error cause. 
     * @param {XMLHttpRequest} error.request - The XMLHttpRequest with the response. 
     * @example 
     * function errorCallback(error) { 
     *     var errorCause = error.error; 
     *     console.log('error: ' + errorCause); 
     *     var response = error.request.responseText; 
     *     try { 
     *         response = JSON.parse(response); 
     *         console.log(response); 
     *     } catch (err) { 
     *         console.error('error parsing json response: ' + err.message); 
     *     } 
     * } 
     */

    /** 
     * @typedef {object} stream 
     * @description A Bintu stream object returned in the response from a successful 'Bintu.createStream', 'Bintu.getStream' or 'Bintu.tagStream' request as JSON formatted string. 
     * @see [Bintu]{@link Bintu} 
     * @property {string}  id - The id of the stream. 
     * @property {string}  state - The state of the stream. 
     * @property {string}  type - The type of the stream. 
     * @property {string}  created_at - The time of creation. 
     * @property {string[]}  tags - The related tags of the stream. 
     * @property {object}  ingest - The ingest object. 
     * @property {object}  ingest.rtmp - This rtmp object of the ingest object. 
     * @property {string}  ingest.rtmp.url - The base rtmp ingest url. 
     * @property {string}  ingest.rtmp.streamname - The name of the rtmp stream. 
     * @property {object}  playout - The playout object. 
     * @property {object}  playout.rtmp - This rtmp object of the playout object. 
     * @property {string}  playout.rtmp.url - The base rtmp ingest url. 
     * @property {string}  playout.rtmp.streamname - This state represents the object null. 
     * @property {string}  playout.rtmp.type - The type of the rtmp playout. 
     * @property {object}  playout.hls - This hls object of the playout object. 
     * @property {string}  playout.hls.url - The url to the hls playout. 
     * @property {string}  playout.hls.type - The type of the hls playout. 
     * @property {object}  playout.web - This state represents the object null. 
     * @property {string}  playout.web.url - The url to the web playout. 
     * @property {string}  playout.web.type - The type of the web playout. 
     * @example 
     * { 
     *    "id":"5f86a12f-3801-415a-b450-6b6a46842349", 
     *    "state":"created", 
     *    "type":"wowza", 
     *    "created_at":"2016-04-25T11:51:05.200Z", 
     *    "tags":[ 
     *       "webrtc" 
     *    ], 
     *    "ingest":{ 
     *       "rtmp":{ 
     *          "url":"rtmp://bintu-stream.nanocosmos.de:80/live", 
     *          "streamname":"hrzcqQ_58r" 
     *       } 
     *    }, 
     *    "playout":{ 
     *       "rtmp":[ 
     *          { 
     *             "url":"rtmp://cdn-live.nanocosmos.de:1935/71026777.rtmp", 
     *             "streamname":"hrzcqQ_58r", 
     *             "type":"live" 
     *          } 
     *       ], 
     *       "hls":[ 
     *          { 
     *             "url":"http://cdn-live.nanocosmos.de:80/71026777.http/hrzcqQ_58r/playlist.m3u8", 
     *             "type":"live" 
     *          } 
     *       ], 
     *       "web":[ 
     *          { 
     *             "url":"https://bintu.nanocosmos.de:443/playout/5f86a12f-3801-415a-b450-6b6a46842349", 
     *             "type":"live" 
     *          } 
     *       ] 
     *    } 
     * } 
     */

    /** 
     * @typedef {stream[]} streams 
     * @description An array of Bintu [stream]{@link stream} objects returned in the response from a successful 'Bintu.getStreams' request as JSON formatted string. 
     * @see [Bintu]{@link Bintu} 
     */

    var proto = Bintu.prototype;

    var Request = function (method, url, header, async, success, error) {
        var self = this;
        self.method = method || 'GET';
        self.url = url || "http://localhost:8088";
        self.header = header || {};
        self.async = async || true;
        self.onSuccess = success || function (request) { };
        self.onError = error || function (request) { };
        self.Send = function (data) {
            var request = new XMLHttpRequest();
            request.open(self.method, self.url, self.async);
            for (var a in self.header) {
                request.setRequestHeader(a, self.header[a]);
            }
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    "function" === typeof self.onSuccess && self.onSuccess(request);
                } else if (request.readyState === 4 && request.status !== 200) {
                    "function" === typeof self.onError && self.onError({ "error": "onstatuserror", request: request });
                }
            }
            request.onabort = function () { "function" === typeof self.onError && self.onError({ "error": "onabort", request: request }); };
            request.onerror = function () { "function" === typeof self.onError && self.onError({ "error": "onerror", request: request }); };
            request.ontimeout = function () { "function" === typeof self.onError && self.onError({ "error": "ontimeout", request: request }); };
            if (typeof data !== "undefined") {
                if (typeof data === 'string') {
                    try {
                        data = JSON.parse(data);
                    } catch (e) {
                        data = null;
                        "function" === typeof self.onError && self.onError({ "error": "invalid json string", request: request });
                    }
                }
                if (typeof data === 'object') {
                    try {
                        data = JSON.stringify(data);
                        request.send(data);
                    } catch (e) {
                        "function" === typeof self.onError && self.onError({ "error": "invalid json object", request: request });
                    }
                }
            } else {
                request.send();
            }
        }
    };

    /** 
    * @alias apiKey 
    * @memberOf Bintu# 
    * @description The apikey to use with Bintu API. 
    * @type {string} 
    * @example 
    * // bintu instance of Bintu class 
    * bintu.apiKey = 'sdfg896wgp8j28guq3tkmöoakjfaest0kj89'; 
    * console.log(bintu.apiKey); 
    */
    proto.apiKey = null;

    /** 
    * @alias apiUrl 
    * @memberOf Bintu# 
    * @description The base url to the Bintu API. 
    * @type {string} 
    * @example 
    * // bintu instance of Bintu class 
    * bintu.apiUrl = 'https://bintu2.nanocosmos.de'; 
    * console.log(bintu.apiUrl); 
    */
    proto.apiUrl = null;

    /** 
    * @alias playerKey 
    * @memberOf Bintu# 
    * @description The playerkey to use with Bintu API. 
    * @type {string} 
    * @example 
    * // bintu instance of Bintu class 
    * bintu.playerKey = 'serzghqar3ehztdolguipöt546we454'; 
    * console.log(bintu.playerKey); 
    */
    proto.playerKey = null;

    /** 
    * @alias keyMode 
    * @memberOf Bintu# 
    * @description Defines which key should be used. 
    * @type {string} 
    * @example 
    * // bintu instance of Bintu class 
    * bintu.keyMode = 'player'; 
    * console.log(bintu.keyMode); 
    * @default 
    */
    proto.keyMode = 'api';

    /** 
     * @alias createStream 
     * @memberOf Bintu# 
     * @description Creates a new Bintu stream. 
     * @param {string[]} [tags] - The array of tags as strings. 
     * @param {successCallback} [success] - The success callback with the request passed. 
     * @param {errorCallback} [error] - The error callback with the request passed. 
     * @example 
     * // bintu instance of Bintu class 
     * var tags = ['myTag', 'title:This is a title', 'doc']; 
     * bintu.createStream(tags, 
     *     function success(request) { 
     *         try { 
     *             var response = JSON.parse(request.responseText); 
     *             var id = response.id; 
     *             console.log('success - new stream created with id:' + id); 
     *             var state = response.state; 
     *             var ingest = response.ingest; 
     *             var rtmp = ingest.rtmp; 
     *             var url = rtmp.url; 
     *             var streamname = rtmp.streamname; 
     *             console.log('created with state: ' + state); 
     *             console.log('rtmp ingest: ' + url + "/" + streamname); 
     *         } catch (err) { 
     *             console.error(err); 
     *         } 
     *     }, function error(e) { 
     *         var error = (typeof e.error !== 'undefined') ? e.error + ': ' + e.request.responseText : 'error: ' + e.request.responseText; 
     *         console.error(error); 
     *         try { 
     *             error = (typeof e.error !== 'undefined') ? e.error : ''; 
     *             var response = JSON.parse(e.request.responseText); 
     *             alert('error while creating new bintu stream (' + error + '): status=' + response.status + ', message=' + response.message, 1); 
     *         } catch (ex) { 
     *             error = (typeof e.error !== 'undefined') ? e.error + ': ' + e.request.responseText : 'error: ' + e.request.responseText; 
     *             alert(error); 
     *         } 
     *     }); 
     */
    proto.createStream = function (tags, success, error) {
        if (!this.apiUrl) {
            return "function" === typeof error && error({ "error": "no api url set", request: { responseText: "no response error" } });
        } else if (!this.apiKey) {
            return "function" === typeof error && error({ "error": "no api key set", request: { responseText: "no response error" } });
        } else if (this.keyMode !== 'api') {
            return "function" === typeof error && error({ "error": "wrong key mode set", request: { responseText: "no response error" } });
        }
        var request = new Request('POST', this.apiUrl + '/stream');
        request.header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-BINTU-APIKEY': this.apiKey
        };
        request.onSuccess = success;
        request.onError = error;
        var data = { webrtc: this.isWebrtcStream, transcoding: this.isTranscodedStream };
        if (typeof tags === 'object' && typeof tags.push === 'function' && tags.length > 0 && (typeof tags[0] === 'string' || tags[0] instanceof String)) {
            data.tags = tags;
        }
        request.Send(data);
    }

    /** 
     * @alias getStream 
     * @memberOf Bintu# 
     * @description Returns a Bintu stream specified by a stream id. 
     * @param {string} streamId - The streamId of the Bintu Stream. 
     * @param {successCallback} [success] - The success callback with the request passed. 
     * @param {errorCallback} [error] - The error callback with the request passed. 
     * @example 
     * // bintu instance of Bintu class 
     * var streamId = 'regwerghsthe6uwj57ikek6ugjghjf'; 
     * bintu.getStream(streamId, 
     *     function success(request) { 
     *         try { 
     *             var response = JSON.parse(request.responseText); 
     *             var id = response.id; 
     *             console.log('success - get stream with id: ' + id); 
     *             var state = response.state; 
     *             var ingest = response.ingest; 
     *             var rtmp = ingest.rtmp; 
     *             var url = rtmp.url; 
     *             var streamname = rtmp.streamname; 
     *             console.log('state: ' + state); 
     *             console.log('rtmp ingest: ' + url + "/" + streamname); 
     *         } catch (err) { 
     *             console.error(err); 
     *         } 
     *     }, function error(e) { 
     *         var error = (typeof e.error !== 'undefined') ? e.error + ': ' + e.request.responseText : 'error: ' + e.request.responseText; 
     *         console.error(error); 
     *         try { 
     *             error = (typeof e.error !== 'undefined') ? e.error : ''; 
     *             var response = JSON.parse(e.request.responseText); 
     *             alert('error while getting bintu stream (' + error + '): status=' + response.status + ', message=' + response.message, 1); 
     *         } catch (ex) { 
     *             error = (typeof e.error !== 'undefined') ? e.error + ': ' + e.request.responseText : 'error: ' + e.request.responseText; 
     *             alert(error); 
     *         } 
     *     }); 
     */
    proto.getStream = function (streamId, success, error) {
        if (!this.apiUrl) {
            return "function" === typeof error && error({ "error": "no api url set", request: { responseText: "no response error" } });
        } else if (!this.apiKey && this.keyMode === 'api') {
            return "function" === typeof error && error({ "error": "no api key set", request: { responseText: "no response error" } });
        }
        var request = new Request('GET', this.apiUrl + '/stream/' + streamId);
        request.header = (this.keyMode === 'api' && this.apiKey) ? {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-BINTU-APIKEY': this.apiKey
        } : {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        };
        request.onSuccess = success;
        request.onError = error;
        request.Send();
    }

    /** 
     * @alias getStreams 
     * @memberOf Bintu# 
     * @description Returns one or many Bintu streams optional filtered by related tags and/or state. 
     * @param {BintuStreamFilter} [filter] - The filter for the search. 
     * @param {successCallback} [success] - The success callback with the request passed. 
     * @param {errorCallback} [error] - The error callback with the request passed. 
     * @example 
     * // bintu instance of Bintu class 
     * var streamFilter = new BintuStreamFilter(); 
     * var state = BintuStreamFilter.STATE.LIVE; 
     * var tags = ['myTag', 'doc']; 
     * streamFilter.setState(state); 
     * streamFilter.addTags(tags); 
     * streamFilter.addTag('title:This is a title'); 
     * bintu.getStreams(streamFilter, 
     *     function success(request) { 
     *         var response = request.responseText; 
     *         try { 
     *             response = JSON.parse(response); 
     *             console.log('success - get streams'); 
     *         } catch (err) { 
     *             response = []; 
     *             console.error(err); 
     *         } 
     *         var i, len; 
     *         for (i = 0, len = response.length; i < len; i += 1) { 
     *             var state = response[i].state; 
     *             var streamId = response[i].id; 
     *             console.log('found stream with id: ' + streamId); 
     *             var url = response[i].playout.rtmp[0].url + '/' + response[i].playout.rtmp[0].streamname; 
     *             console.log('rtmp playout: ' + url); 
     *             var tags = response[i].tags; 
     *             var message = ""; 
     *             if (tags && tags.push) { 
     *                 var j, tLen; 
     *                 for (j = 0, tLen = tags.length; j < tLen; j += 1) { 
     *                     if (j === 0) 
     *                         message += 'tags: '; 
     *                     message += tags[j]; 
     *                     if (j !== tLen - 1) 
     *                         message += ','; 
     *                 } 
     *             } 
     *             console.log(message); 
     *         } 
     *         if (len === 0) { 
     *             console.log('no stream found with the given search parameters'); 
     *         } 
     *     }, 
     *     function error(e) { 
     *         var error = (typeof e.error !== 'undefined') ? e.error + ': ' + e.request.responseText : 'error: ' + e.request.responseText; 
     *         console.error(error); 
     *         try { 
     *             error = (typeof e.error !== 'undefined') ? e.error : ''; 
     *             var response = JSON.parse(e.request.responseText); 
     *             alert('error while getting bintu streams (' + error + '): status=' + response.status + ', message=' + response.message, 1); 
     *         } catch (ex) { 
     *             error = (typeof e.error !== 'undefined') ? e.error + ': ' + e.request.responseText : 'error: ' + e.request.responseText; 
     *             alert(error); 
     *         } 
     *     }); 
     */
    proto.getStreams = function (filter, success, error) {
        if (!this.apiUrl) {
            return "function" === typeof error && error({ "error": "no api url set", request: { responseText: "no response error" } });
        } else if (!this.apiKey && this.keyMode === 'api') {
            return "function" === typeof error && error({ "error": "no api key set", request: { responseText: "no response error" } });
        } else if (!this.playerKey && this.keyMode === 'player') {
            return "function" === typeof error && error({ "error": "no player key set", request: { responseText: "no response error" } });
        }
        var url = this.apiUrl + '/stream';
        if (filter instanceof BintuStreamFilter) {
            if (filter.tags.length === 0 && this.keyMode === 'player') {
                return "function" === typeof error && error({ "error": "no tags set", request: { responseText: "no response error" } });
            }
            url += filter.getQueryString();
        }
        var request = new Request('GET', url);
        request.header = (this.keyMode === 'api') ? {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-BINTU-APIKEY': this.apiKey
        } : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-BINTU-PLAYERKEY': this.playerKey
        }
        request.onSuccess = success;
        request.onError = error;
        request.Send();
    }

    /** 
     * @alias tagStream 
     * @memberOf Bintu# 
     * @description Tags an existing Bintu streams by overwriting. 
     * @param {string} streamId - The streamId of the Bintu Stream. 
     * @param {string[]} tags - The tags as an array of string related to streams. 
     * @param {successCallback} [success] - The success callback with the request passed. 
     * @param {errorCallback} [error] - The error callback with the request passed. 
     * @example 
     * // bintu instance of Bintu class 
     * var streamId = '23w45rt8t3wtgjpsp9054wawegf34590g4w'; 
     * var tags = ['newTag, test, webrtc']; 
     * bintu.tagStream(streamId, tags, 
     *     function success(request) { 
     *         var response = request.responseText; 
     *         try { 
     *             response = JSON.parse(response); 
     *             var id = response.id; 
     *             console.log('success - tag stream with id: ' + id) 
     *             var tags = response.tags; 
     *             var message = ""; 
     *             if (tags && tags.push) { 
     *                 var j, tLen; 
     *                 for (j = 0, tLen = tags.length; j < tLen; j += 1) { 
     *                     if (j === 0) 
     *                         message += 'new tags: '; 
     *                     message += tags[j]; 
     *                     if (j !== tLen - 1) 
     *                         message += ','; 
     *                 } 
     *             } 
     *             console.log(message); 
     *         } catch (err) { 
     *             console.error(err); 
     *         } 
     *     }, 
     *     function error(e) { 
     *         var error = (typeof e.error !== 'undefined') ? e.error + ': ' + e.request.responseText : 'error: ' + e.request.responseText; 
     *         console.error(error); 
     *         try { 
     *             error = (typeof e.error !== 'undefined') ? e.error : ''; 
     *             var response = JSON.parse(e.request.responseText); 
     *             alert('error while tagging bintu streams (' + error + '): status=' + response.status + ', message=' + response.message, 1); 
     *         } catch (ex) { 
     *             error = (typeof e.error !== 'undefined') ? e.error + ': ' + e.request.responseText : 'error: ' + e.request.responseText; 
     *             alert(error); 
     *         } 
     *     }); 
     */
    proto.tagStream = function (streamId, tags, success, error) {
        if (!this.apiUrl) {
            return "function" === typeof error && error({ "error": "no api url set", request: { responseText: "no response error" } });
        } else if (!this.apiKey) {
            return "function" === typeof error && error({ "error": "no api key set", request: { responseText: "no response error" } });
        } else if (this.keyMode !== 'api') {
            return "function" === typeof error && error({ "error": "wrong key mode set", request: { responseText: "no response error" } });
        }
        if (!streamId) {
            return "function" === typeof error && error({ "error": "no stream id set" });
        }
        var request = new Request('PUT', this.apiUrl + '/stream/' + streamId + '/tag');
        request.header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-BINTU-APIKEY': this.apiKey
        };
        request.onSuccess = success;
        request.onError = error;
        if (typeof tags === 'object' && typeof tags.push === 'function' && tags.length > 0 && (typeof tags[0] === 'string' || tags[0] instanceof String)) {
            request.Send({ tags: tags });
        } else {
            request.Send();
        }
    }

    window.Bintu = Bintu;

    /** 
     * Bintu Stream Filter for Bintu Streaming API. 
     * @class BintuStreamFilter 
     * @classdesc Bintu Stream Filter Class Version 0.4 for Bintu Streaming API Class. 
     * @example 
     * var streamFilter = new BintuStreamFilter(); 
     */
    function BintuStreamFilter() {
        /** 
         * @alias state 
         * @memberOf BintuStreamFilter# 
         * @description The state of the Bintu Streams to filter. 
         * @type {BintuStreamFilter.STATE} 
         * @default BintuStreamFilter.STATE.ALL 
         */
        this.state = this.setState(BintuStreamFilter.STATE.ALL);

        /** 
         * @alias tags 
         * @memberOf BintuStreamFilter# 
         * @description The array of tags of the Bintu Streams to filter. 
         * @type {string[]} 
         */
        this.tags = [];
    }

    proto = BintuStreamFilter.prototype;

    /** 
     * @alias STATE 
     * @memberOf BintuStreamFilter 
     * @readonly 
     * @static 
     * @description Bintu Stream States. 
     * @property {string}  LIVE - This state represents the string 'live'. 
     * @property {string}  CREATED - This state represents the string 'created'. 
     * @property {string}  ENDED - This state represents the string 'ended'. 
     * @property {null}  ALL - This state represents the object null. 
     */
    BintuStreamFilter.STATE = Object.create(
        {
            LIVE: 'live',
            CREATED: 'created',
            ENDED: 'ended',
            ALL: null
        }
    );

    /** 
     * @alias setState 
     * @memberOf BintuStreamFilter# 
     * @description Sets the state for the filter. 
     * @param {BintuStreamFilter.STATE} state - The state of the Bintu Streams to filter. 
     * @returns {BintuStreamFilter} The instance of the BintuStreamFilter 
     * @example 
     * // streamFilter instance of BintuStreamFilter 
     * var state = BintuStreamFilter.STATE.LIVE; 
     * streamFilter.setState(state); 
     */
    proto.setState = function (state) {
        var newState = undefined;
        for (var s in BintuStreamFilter.STATE) {
            if (BintuStreamFilter.STATE[s] === state)
                newState = BintuStreamFilter.STATE[s];
        }
        if (typeof newState === 'undefined') {
            throw new Error("The param 'state' must be of type 'BintuStreamFilter.STATE'");
            return;
        }
        this.state = newState;
        return this;
    }

    /** 
     * @alias addTag 
     * @memberOf BintuStreamFilter# 
     * @description Adds a tag to the filter. 
     * @param {string} tag - The tag of the Bintu Streams to filter. 
     * @returns {BintuStreamFilter} The instance of the BintuStreamFilter 
     * @example 
     * // streamFilter instance of BintuStreamFilter 
     * var tag = 'myTag'; 
     * streamFilter.addTag(tag); 
     * console.log(streamFilter.tags); // prints 'myTag' 
     * streamFilter.addTag('otherTag'); 
     * console.log(streamFilter.tags); // prints 'myTag, otherTag' 
     * streamFilter.addTag('myTag'); 
     * console.log(streamFilter.tags); // prints 'myTag, otherTag' 
     */
    proto.addTag = function (tag) {
        if (!(tag.length > 0 && (typeof tag === 'string' || tag instanceof String))) {
            throw new Error("The param 'tag' must be of type 'string' and also may not be empty string.");
            return;
        }
        this.tags.push(tag);
        this.tags = this._reduceDuplicates(this.tags);
        return this;
    }

    /** 
     * @alias addTags 
     * @memberOf BintuStreamFilter# 
     * @description Adds tags to the filter. 
     * @param {string[]} tags - The tags of the Bintu Streams to filter. 
     * @returns {BintuStreamFilter} The instance of the BintuStreamFilter 
     * @example 
     * // streamFilter instance of BintuStreamFilter 
     * var tags = ['myTag', 'otherTag']; 
     * streamFilter.addTags(tags); 
     * console.log(streamFilter.tags); // prints 'myTag, otherTag' 
     * tags = ['newTag', 'otherTag']; 
     * streamFilter.addTags(tags); 
     * console.log(streamFilter.tags); // prints 'myTag, newTag, otherTag' 
     */
    proto.addTags = function (tags) {
        if (!((typeof tags === 'object') && (typeof tags.push === 'function') && (tags.length === 0 || (tags.length > 0 && (typeof tags[0] === 'string' || tags[0] instanceof String))))) {
            throw new Error("The param 'tags' must be of type 'string array'");
            return;
        }
        this.tags = this.tags.concat(tags);
        this.tags = this._reduceDuplicates(this.tags);
        return this;
    }

    /** 
     * @alias getQueryString 
     * @memberOf BintuStreamFilter# 
     * @description Returns the query string for the search that can be added to the url of the GET request. 
     * @returns {string} The query string 
     * @example 
     * // streamFilter instance of BintuStreamFilter 
     * streamFilter.addTags(['myTag', 'otherTag']); 
     * streamFilter.addTag('newTag'); 
     * streamFilter.setState(BintuStreamFilter.STATE.LIVE); 
     * var queryString = streamFilter.getQueryString(); 
     * console.log(queryString); // prints '?tags[]=myTag&tags[]=newTag&tags[]=otherTag&state=live' 
     */
    proto.getQueryString = function () {
        var queryString = "";
        if (typeof this.tags === 'object' && typeof this.tags.push === 'function' && this.tags.length > 0) {
            for (var i = 0; i < this.tags.length; i += 1) {
                if (typeof this.tags[i] !== 'string') continue;
                queryString += (i == 0) ? '?' : '&';
                queryString += "tags[]=" + this.tags[i];
            }
        }
        if (typeof this.state === 'string' && this.state.length > 0) {
            queryString += (queryString.indexOf('?') === -1) ? '?' : '&';
            queryString += "state=" + this.state;
        }
        return queryString;
    }

    /** 
     * @private 
     * @alias _reduceDuplicates 
     * @member 
     * @description Delete duplicated tags. 
     * @param {string[]} tags - The tags of the Bintu Streams to filter. 
     * @returns {string[]} The reduced tags 
     */
    proto._reduceDuplicates = function (tags) {
        if (!((typeof tags === 'object') && (typeof tags.push === 'function') && (tags.length === 0 || (tags.length > 0 && (typeof tags[0] === 'string' || tags[0] instanceof String))))) {
            throw new Error("The param 'tags' must be of type 'string array'");
            return;
        }
        return tags.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, [])
    }

    window.BintuStreamFilter = BintuStreamFilter;
}).call(this);