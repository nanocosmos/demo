/**
 * Created by user on 3/22/2017.
 */
define([], function () {
    function random (length, capitals, minuscules, numbers) {
        if (capitals === undefined) capitals = true;
        if (minuscules === undefined) minuscules = true;
        if (numbers === undefined) numbers = true;

        var product = '';
        var chars = '';

        if (capitals) chars += interpolate(65, 89);
        if (minuscules) chars += interpolate(97, 122);
        if (numbers) chars += interpolate(48, 57);

        length = length || 32;

        for (var i = 0; i < length; ++i) {
            product += chars.substr(Math.random() * chars.length, 1);
        }

        return product;
    }

    function interpolate (start, end) {
        var product = '';

        for (var i = start; i <= end; ++i) {
            product += String.fromCharCode(i);
        }

        return product;
    }

    return {
        'random': random
    };
});
