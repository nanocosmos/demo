/**
 * Created by nandor.kostyo on 2017-03-01.
 */
define([], function () {
    var startTimes = {};
    var measured = {};

    function start (label) {
        startTimes[label] = performance.now();
    }

    function finish (label) {
        var diff = performance.now() - startTimes[label];
        delete startTimes[label];
        storeMeasuredValue(label, diff);
        return Math.floor(diff);
    }

    function storeMeasuredValue (label, value) {
        if (!measured[label]) {
            measured[label] = [value];
        } else {
            measured[label].push(value);
        }
    }

    function getMeasuredValues (label) {
        return measured[label] ? measured[label] : [];
    }

    return {
        start: start,
        finish: finish,
        getMeasuredValues: getMeasuredValues
    };
});
