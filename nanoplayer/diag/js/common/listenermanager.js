/**
 * add/remove event listeners to/from an emitter-like reference.
 *
 * Created by derelict on 2016.12.11..
 * Modified by Thomas Niederges�� on 2017.08.25
 */
define(['const/listenermanagererrors'], function (errors) {
    'use strict';

    /**
     * 'add' type function names for different implementations of event emitters
     * @type {string[]}
     */
    var ADD_FUNCTIONS = ['addEventListener', 'addListener', 'on'];

    /**
     * 'remove' type function names for different implementations of event emitters
     * @type {string[]}
     */
    var REMOVE_FUNCTIONS = ['removeEventListener', 'removeListener', 'off'];

    /**
     * checks for all mandatory values in the config object, and throws error when something is
     * missing or invalid.
     *
     * @param config {object}
     */
    function validateConfig (config) {
        if (!config.target) {
            throw new Error(errors.NO_TARGET);
        }
        if (!config.listeners || !config.listeners.length) {
            throw new Error(errors.NO_LISTENERS);
        }
        if (!getFunction(config.target, ADD_FUNCTIONS) || !getFunction(config.target, REMOVE_FUNCTIONS)) {
            throw new Error(errors.NOT_DISPATCHER);
        }
        for (var i = 0; i < config.listeners.length; ++i) {
            if (
                (config.listeners[i].type || typeof config.listeners[i].type === 'string') &&
                config.listeners[i].type.length === 0
            ) {
                config.listeners.splice(i, 1);
                i--;
                continue;
            }
            if (!config.listeners[i].type) {
                throw new Error(errors.MISSING_TYPE.replace('%index%', i));
            }
            if (typeof config.listeners[i].listener !== 'function') {
                throw new Error(errors.MISSING_LISTENER.replace('%index%', i));
            }
        }
    }

    /**
     * searches the target for a function name that matches one of the list items, and returns a
     * reference to that function.
     *
     * @param target {object}
     * @param list {string[]}
     * @returns {function|null}
     */
    function getFunction (target, list) {
        for (var i = 0; i < list.length; ++i) {
            if (typeof target[list[i]] === 'function') {
                return target[list[i]];
            }
        }
        return null;
    }

    /**
     * validates the config and adds/removes listeners based on the function list and the config.
     *
     * @param functions {string[]}
     * @param config {object}
     */
    function manage (functions, config) {
        validateConfig(config);
        iterate(getFunction(config.target, functions), config.target, config.listeners);
    }

    /**
     * iterates through the listeners, and calls the given function in the target's scope.
     * @param f {function}
     * @param target {object}
     * @param listeners {object[]}
     */
    function iterate (f, target, listeners) {
        for (var i = 0; i < listeners.length; ++i) {
            f.call(target, listeners[i].type, listeners[i].listener);
        }
    }

    /**
     * return two curried references to the manage function that will add and remove listeners.
     */
    return {
        'add'    : manage.bind(null, ADD_FUNCTIONS),
        'remove' : manage.bind(null, REMOVE_FUNCTIONS)
    };
});
