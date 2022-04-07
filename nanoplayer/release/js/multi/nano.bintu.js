/**
 * Bintu Streaming API Class for AMD module loader & HTML5 Web Browsers.
 *
 * @file bintu.js - Bintu Streaming API Class for HTML5 Web Browsers.
 * @author nanocosmos IT GmbH
 * @copyright (c) 2016-2022 nanocosmos IT GmbH. All rights reserved.
 * @version 1.0.0
 * @license nanoStream Software/Service License - All Rights Reserved
 */

/*eslint-disable no-undef*/
// eslint-disable-next-line
;(function () {
    'use strict';

    /**
     * Bintu Streaming API.
     * @class Bintu
     * @classdesc Bintu Streaming API Class Version 1.0.0
     * @version 1.0.0
     * @constructor
     * @param {string} apiUrl - The base url to the Bintu API.
     * @param {string} [apiKey] - The apikey to use with Bintu API.
     * @param {string} [playerKey] - The playerkey to use with Bintu API.
     * @param {string} [keyMode] - The keymode to use with Bintu API.
     * @example
     * var apiKey = 'dfg5490htk64jzep0zhdhdthjkhp69zuk';
     * var apiUrl = 'https://bintu.nanocosmos.de';
     * var bintu = new Bintu(apiKey, apiUrl);
     */
    var Bintu = function (apiUrl, apiKey, playerKey, keyMode) {
        if (!(apiUrl.length > 0 && (typeof apiUrl === 'string' || apiUrl instanceof String))) {
            throw new Error('The param "apiUrl" must be of type "string" and also may not be empty string.');
        }
        else {
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
            }
            else {
                throw new Error('The param "keyMode" must be "api", "player" or undefined');
            }
        }
    };

    /**
     * The resolve callback for a successful Bintu Promise call
     * @callback resolveCallback
     * @see [Bintu]{@link Bintu}
     * @param {XMLHttpRequest} request - The XMLHttpRequest with the response.
     * @example
     * function resolveCallback(request) {
     *     console.log('resolve');
     *     var response = request.responseText;
     *     try {
     *         response = JSON.parse(response);
     *         console.log(response);
     *     } catch (err) {
     *         console.error('error parsing json response: ' + err.message);
     *     }
     * }
     * // bintu instance of Bintu class
     * bintu.getStreams()
     *     .then(resolveCallback);
     */

    /**
     * The reject callback for a failed Bintu Promise call
     * @callback rejectCallback
     * @see [Bintu]{@link Bintu}
     * @param {object} error - The error object.
     * @param {string} error.error - The error cause.
     * @param {XMLHttpRequest} error.request - The XMLHttpRequest with the response.
     * @example
     * function rejectCallback(error) {
     *     console.log('reject');
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
     * // bintu instance of Bintu class
     * bintu.getStreams()
     *     .then(resolveCallback)
     *     .catch(rejectCallback);
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
    var exports = this;

    var Request = function Request (method, url, header, async) {
        this.method = method || 'GET';
        this.url = url || 'http://localhost:8088';
        this.header = header || {};
        this.async = async || true;
        this.Send = function (data) {
            return new Promise(
                function (resolve, reject) {
                    var request = new XMLHttpRequest();
                    request.open(this.method, this.url, this.async);
                    for (var a in this.header) {
                        if (Object.prototype.hasOwnProperty.call(this.header, a)) {
                            request.setRequestHeader(a, this.header[a]);
                        }
                    }
                    request.onreadystatechange = function () {
                        if (request.readyState === 4 && request.status === 200) {
                            return resolve(request);
                        }
                        else if (request.readyState === 4 && request.status !== 200) {
                            return reject({
                                'error'   : 'onstatuserror',
                                'request' : request
                            });
                        }
                    };
                    request.onabort = function () {
                        return reject({
                            'error'   : 'onabort',
                            'request' : request
                        });
                    };
                    request.onerror = function () {
                        return reject({
                            'error'   : 'onerror',
                            'request' : request
                        });
                    };
                    request.ontimeout = function () {
                        return reject({
                            'error'   : 'ontimeout',
                            'request' : request
                        });
                    };
                    if (typeof data !== 'undefined') {
                        if (typeof data === 'string') {
                            try {
                                data = JSON.parse(data);
                            }
                            catch (e) {
                                data = null;
                                return reject({
                                    'error'   : 'invalid json string',
                                    'request' : request
                                });
                            }
                        }
                        if (typeof data === 'object') {
                            try {
                                data = JSON.stringify(data);
                                request.send(data);
                            }
                            catch (e) {
                                return reject({
                                    'error'   : 'invalid json object',
                                    'request' : request
                                });
                            }
                        }
                    }
                    else {
                        request.send();
                    }
                }.bind(this)
            );
        };
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
     * @param {boolean} [isWebrtcStream] - The stream is WebRTC stream.
     * @param {boolean} [isTranscodedStream] - The stream is a transcoded stream.
     * @param {string[]} [tags] - The array of tags as strings.
     * @returns {Promise<resolveCallback|rejectCallback>}
     * @example
     * // bintu instance of Bintu class
     * var tags = ['myTag', 'title:This is a title', 'doc'];
     * bintu.createStream(true, false, tags)
     *     .then(function (request) {
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
     *     })
     *     .catch(function (e) {
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
    proto.createStream = function createStream (isWebrtcStream, isTranscodedStream, tags) {
        return new Promise(
            function (resolve, reject) {
                if (!this.apiUrl) {
                    return reject({
                        'error'   : 'no api url set',
                        'request' : {
                            'responseText': 'no response error'
                        }
                    });
                }
                else if (!this.apiKey) {
                    return reject({
                        'error'   : 'no api key set',
                        'request' : {
                            'responseText': 'no response error'
                        }
                    });
                }
                else if (this.keyMode !== 'api') {
                    return reject({
                        'error'   : 'wrong key mode set',
                        'request' : {
                            'responseText': 'no response error'
                        }
                    });
                }
                var request = new Request('POST', this.apiUrl + '/stream');
                request.header = {
                    'Accept'         : 'application/json',
                    'Content-Type'   : 'application/json',
                    'X-BINTU-APIKEY' : this.apiKey
                };

                var data = {
                    'webrtc'      : !!isWebrtcStream,
                    'transcoding' : !!isTranscodedStream
                };
                if (typeof tags === 'object' && typeof tags.push === 'function' && tags.length > 0 && (typeof tags[0] === 'string' || tags[0] instanceof String)) {
                    data.tags = tags;
                }
                return request.Send(data)
                    .then(resolve)
                    .catch(reject);
            }.bind(this)
        );
    };

    /**
     * @alias getStream
     * @memberOf Bintu#
     * @description Returns a Bintu stream specified by a stream id.
     * @param {string} streamId - The streamId of the Bintu Stream.
     * @returns {Promise<resolveCallback|rejectCallback>}
     * @example
     * // bintu instance of Bintu class
     * var streamId = 'regwerghsthe6uwj57ikek6ugjghjf';
     * bintu.getStream(streamId)
     *     .then(function (request) {
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
     *     })
     *     .catch(function (e) {
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
    proto.getStream = function getStream (streamId) {
        return new Promise(
            function (resolve, reject) {
                if (!this.apiUrl) {
                    return reject({
                        'error'   : 'no api url set',
                        'request' : {
                            'responseText': 'no response error'
                        }
                    });
                }
                else if (!this.apiKey && this.keyMode === 'api') {
                    return reject({
                        'error'   : 'no api key set',
                        'request' : {
                            'responseText': 'no response error'
                        }
                    });
                }

                var request = new Request('GET', this.apiUrl + '/stream/' + streamId);
                request.header = (this.keyMode === 'api' && this.apiKey) ? {
                    'Accept'         : 'application/json',
                    'Content-Type'   : 'application/json',
                    'X-BINTU-APIKEY' : this.apiKey
                } : {
                    'Accept'       : 'application/json',
                    'Content-Type' : 'application/json; charset=utf-8'
                };

                return request.Send()
                    .then(resolve)
                    .catch(reject);
            }.bind(this)
        );
    };

    /**
     * @alias getStreams
     * @memberOf Bintu#
     * @description Returns one or many Bintu streams optional filtered by related tags and/or state.
     * @param {Bintu.StreamFilter} [filter] - The filter for the search.
     * @returns {Promise<resolveCallback|rejectCallback>}
     * @example
     * // bintu instance of Bintu class
     * var streamFilter = new Bintu.StreamFilter();
     * var state = Bintu.StreamFilter.STATE.LIVE;
     * var tags = ['myTag', 'doc'];
     * streamFilter.setState(state);
     * streamFilter.addTags(tags);
     * streamFilter.addTag('title:This is a title');
     * bintu.getStreams(streamFilter)
     *     .then(function (request) {
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
     *     })
     *     .catch(function (e) {
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
    proto.getStreams = function getStreams (filter) {
        return new Promise(
            function (resolve, reject) {
                if (!this.apiUrl) {
                    return reject({
                        'error'   : 'no api url set',
                        'request' : {
                            'responseText': 'no response error'
                        }
                    });
                }
                else if (!this.apiKey && this.keyMode === 'api') {
                    return reject({
                        'error'   : 'no api key set',
                        'request' : {
                            'responseText': 'no response error'
                        }
                    });
                }
                else if (!this.playerKey && this.keyMode === 'player') {
                    return reject({
                        'error'   : 'no player key set',
                        'request' : {
                            'responseText': 'no response error'
                        }
                    });
                }
                var url = this.apiUrl + '/stream';
                if (filter instanceof Bintu.StreamFilter) {
                    if (filter.tags.length === 0 && this.keyMode === 'player') {
                        return reject({
                            'error'   : 'no tags set',
                            'request' : {
                                'responseText': 'no response error'
                            }
                        });
                    }
                    url += filter.getQueryString();
                }
                var request = new Request('GET', url);
                request.header = (this.keyMode === 'api') ? {
                    'Accept'         : 'application/json',
                    'Content-Type'   : 'application/json',
                    'X-BINTU-APIKEY' : this.apiKey
                } : {
                    'Accept'            : 'application/json',
                    'Content-Type'      : 'application/json',
                    'X-BINTU-PLAYERKEY' : this.playerKey
                };

                return request.Send()
                    .then(resolve)
                    .catch(reject);
            }.bind(this)
        );
    };

    /**
     * @alias tagStream
     * @memberOf Bintu#
     * @description Tags an existing Bintu streams by overwriting.
     * @param {string} streamId - The streamId of the Bintu Stream.
     * @param {string[]} tags - The tags as an array of string related to streams.
     * @returns {Promise<resolveCallback|rejectCallback>}
     * @example
     * // bintu instance of Bintu class
     * var streamId = '23w45rt8t3wtgjpsp9054wawegf34590g4w';
     * var tags = ['newTag, test, webrtc'];
     * bintu.tagStream(streamId, tags)
     *     .then(function (request) {
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
     *     })
     *     .catch(function (e) {
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
    proto.tagStream = function tagStream (streamId, tags) {
        return new Promise(
            function (resolve, reject) {
                if (!this.apiUrl) {
                    return reject({
                        'error'   : 'no api url set',
                        'request' : {
                            'responseText': 'no response error'
                        }
                    });
                }
                else if (!this.apiKey) {
                    return reject({
                        'error'   : 'no api key set',
                        'request' : {
                            'responseText': 'no response error'
                        }
                    });
                }
                else if (this.keyMode !== 'api') {
                    return reject({
                        'error'   : 'wrong key mode set',
                        'request' : {
                            'responseText': 'no response error'
                        }
                    });
                }
                if (!streamId) {
                    return reject({
                        'error': 'no stream id set'
                    });
                }
                var request = new Request('PUT', this.apiUrl + '/stream/' + streamId + '/tag');
                request.header = {
                    'Accept'         : 'application/json',
                    'Content-Type'   : 'application/json',
                    'X-BINTU-APIKEY' : this.apiKey
                };
                
                if (typeof tags === 'object' && typeof tags.push === 'function' && tags.length > 0 && (typeof tags[0] === 'string' || tags[0] instanceof String)) {
                    return request.Send({
                        'tags': tags
                    })
                        .then(resolve)
                        .catch(reject);
                }
                else {
                    return request.Send()
                        .then(resolve)
                        .catch(reject);
                }
            }.bind(this)
        );
    };

    /**
     * @alias pushStream
     * @memberOf Bintu#
     * @description redirect/push an existing Bintu streams to another rtmp url
     * @param {string} streamId - The streamId of the Bintu Stream.
     * @param {string} push_url - The url to push/redirect to
     * @returns {Promise<resolveCallback|rejectCallback>}
     * @example
     * // bintu instance of Bintu class
     * var streamId = '23w45rt8t3wtgjpsp9054wawegf34590g4w';
     * var tags = ['newTag, test, webrtc'];
     * bintu.pushStream(streamId, push_url)
     *     .then(function (request) {
     *             console.log(request.responseText)
     *     })
     *     .catch(function (e) {
     *             alert(error);
     *     });
     * );
     */
    proto.pushStream = function pushStream (streamId, push_url) {
        return new Promise(
            function (resolve, reject) {
                if (!this.apiUrl) {
                    return reject({
                        'error'   : 'no api url set',
                        'request' : {
                            'responseText': 'no response error'
                        }
                    });
                }
                else if (!this.apiKey) {
                    return reject({
                        'error'   : 'no api key set',
                        'request' : {
                            'responseText': 'no response error'
                        }
                    });
                }
                else if (this.keyMode !== 'api') {
                    return reject({
                        'error'   : 'wrong key mode set',
                        'request' : {
                            'responseText': 'no response error'
                        }
                    });
                }
                if (!streamId) {
                    return reject({
                        'error': 'no stream id set'
                    });
                }
                var request = new Request('PUT', this.apiUrl + '/stream/' + streamId + '/push_url');
                request.header = {
                    'Accept'         : 'application/json',
                    'Content-Type'   : 'application/json',
                    'X-BINTU-APIKEY' : this.apiKey
                };

                return request.Send({
                    'url': push_url
                })
                    .then(resolve)
                    .catch(reject);
            }.bind(this)
        );
    };

    /**
     * Bintu Stream Filter for Bintu Streaming API.
     * @class Bintu.StreamFilter
     * @memberOf Bintu
     * @version 1.0.0
     * @constructor
     * @classdesc Bintu Stream Filter Class Version 1.0.0 for Bintu Streaming API Class.
     * @example
     * var apiKey = 'dfg5490htk64jzep0zhdhdthjkhp69zuk';
     * var apiUrl = 'https://bintu.nanocosmos.de';
     * var bintu = new Bintu(apiKey, apiUrl);
     * var streamFilter = new Bintu.StreamFilter();
     */
    Bintu.StreamFilter = function StreamFilter () {
        /**
         * @alias state
         * @memberOf Bintu.StreamFilter#
         * @description The state of the Bintu Streams to filter.
         * @type {Bintu.StreamFilter.STATE}
         * @default Bintu.StreamFilter.STATE.ALL
         */
        this.state = this.setState(Bintu.StreamFilter.STATE.ALL);

        /**
         * @alias tags
         * @memberOf Bintu.StreamFilter#
         * @description The array of tags of the Bintu Streams to filter.
         * @type {string[]}
         */
        this.tags = [];
    };

    proto = Bintu.StreamFilter.prototype;

    /**
     * @typedef Bintu.StreamFilter.STATE
     * @alias STATE
     * @memberOf Bintu.StreamFilter#
     * @readonly
     * @static
     * @description Bintu Stream States.
     * @property {string}  LIVE - This state represents the string 'live'.
     * @property {string}  CREATED - This state represents the string 'created'.
     * @property {string}  ENDED - This state represents the string 'ended'.
     * @property {null}  ALL - This state represents the object null.
     */
    Bintu.StreamFilter.STATE = Object.create({
        'LIVE'    : 'live',
        'CREATED' : 'created',
        'ENDED'   : 'ended',
        'ALL'     : null
    });

    /**
     * @alias setState
     * @memberOf Bintu.StreamFilter#
     * @description Sets the state for the filter.
     * @param {Bintu.StreamFilter.STATE} state - The state of the Bintu Streams to filter.
     * @returns {Bintu.StreamFilter} The instance of the StreamFilter
     * @example
     * // streamFilter instance of StreamFilter
     * var state = Bintu.StreamFilter.STATE.LIVE;
     * streamFilter.setState(state);
     */
    proto.setState = function setState (state) {
        var newState;
        for (var s in Bintu.StreamFilter.STATE) {
            if (Bintu.StreamFilter.STATE[s] === state) newState = Bintu.StreamFilter.STATE[s];
        }
        if (typeof newState === 'undefined') {
            throw new Error('The param "state" must be of type "Bintu.StreamFilter.STATE"');
        }
        this.state = newState;
        return this;
    };

    /**
     * @alias addTag
     * @memberOf Bintu.StreamFilter#
     * @description Adds a tag to the filter.
     * @param {string} tag - The tag of the Bintu Streams to filter.
     * @returns {Bintu.StreamFilter} The instance of the StreamFilter
     * @example
     * // streamFilter instance of StreamFilter
     * var tag = 'myTag';
     * streamFilter.addTag(tag);
     * console.log(streamFilter.tags); // prints 'myTag'
     * streamFilter.addTag('otherTag');
     * console.log(streamFilter.tags); // prints 'myTag, otherTag'
     * streamFilter.addTag('myTag');
     * console.log(streamFilter.tags); // prints 'myTag, otherTag'
     */
    proto.addTag = function addTag (tag) {
        if (!(tag.length > 0 && (typeof tag === 'string' || tag instanceof String))) {
            throw new Error('The param "tag" must be of type "string" and also may not be empty string.');
        }
        this.tags.push(tag);
        this.tags = this._reduceDuplicates(this.tags);
        return this;
    };

    /**
     * @alias addTags
     * @memberOf Bintu.StreamFilter#
     * @description Adds tags to the filter.
     * @param {string[]} tags - The tags of the Bintu Streams to filter.
     * @returns {Bintu.StreamFilter} The instance of the StreamFilter
     * @example
     * // streamFilter instance of StreamFilter
     * var tags = ['myTag', 'otherTag'];
     * streamFilter.addTags(tags);
     * console.log(streamFilter.tags); // prints 'myTag, otherTag'
     * tags = ['newTag', 'otherTag'];
     * streamFilter.addTags(tags);
     * console.log(streamFilter.tags); // prints 'myTag, newTag, otherTag'
     */
    proto.addTags = function addTags (tags) {
        if (!(typeof tags === 'object' && typeof tags.push === 'function' && (tags.length === 0 || (tags.length > 0 && (typeof tags[0] === 'string' || tags[0] instanceof String))))) {
            throw new Error('The param "tags" must be of type "string array"');
        }
        this.tags = this.tags.concat(tags);
        this.tags = this._reduceDuplicates(this.tags);
        return this;
    };

    /**
     * @alias getQueryString
     * @memberOf Bintu.StreamFilter#
     * @description Returns the query string for the search that can be added to the url of the GET request.
     * @returns {string} The query string
     * @example
     * // streamFilter instance of StreamFilter
     * streamFilter.addTags(['myTag', 'otherTag']);
     * streamFilter.addTag('newTag');
     * streamFilter.setState(Bintu.StreamFilter.STATE.LIVE);
     * var queryString = streamFilter.getQueryString();
     * console.log(queryString); // prints '?tags[]=myTag&tags[]=newTag&tags[]=otherTag&state=live'
     */
    proto.getQueryString = function getQueryString () {
        var queryString = '';
        if (typeof this.tags === 'object' && typeof this.tags.push === 'function' && this.tags.length > 0) {
            for (var i = 0; i < this.tags.length; i += 1) {
                if (typeof this.tags[i] !== 'string') continue;
                queryString += i === 0 ? '?' : '&';
                queryString += 'tags[]=' + this.tags[i];
            }
        }
        if (typeof this.state === 'string' && this.state.length > 0) {
            queryString += queryString.indexOf('?') === -1 ? '?' : '&';
            queryString += 'state=' + this.state;
        }
        return queryString;
    };

    proto._reduceDuplicates = function _reduceDuplicates (tags) {
        if (!(typeof tags === 'object' && typeof tags.push === 'function' && (tags.length === 0 || (tags.length > 0 && (typeof tags[0] === 'string' || tags[0] instanceof String))))) {
            throw new Error('The param "tags" must be of type "string array"');
        }
        return tags.reduce(function (a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return Bintu;
        });
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = Bintu;
    }
    else {
        exports.Bintu = Bintu;
    }
}.call(this));
