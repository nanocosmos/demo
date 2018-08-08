/**
 * Copyright (c) 2016 nanocosmos IT GmbH. All rights reserved.
 * http://www.nanocosmos.de
 * Bintu Release Version 0.5
 */

/**
 * @file Bintu Stream Filter Class.
 * @author nanocosmos IT GmbH
 * @copyright (c) 2016 nanocosmos IT GmbH. All rights reserved.
 * @version 0.5
 */

define([], function () {
    'use strict';

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

    var proto = BintuStreamFilter.prototype;

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
                queryString += (i === 0) ? '?' : '&';
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

    return BintuStreamFilter;
});