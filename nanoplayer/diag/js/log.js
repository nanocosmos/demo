/**
 * Created by nandor.kostyo on 2016-10-05.
 */
define([
    'elementids'
], function (
    elementIds
) {
    function create (label) {
        return function (text, type) {
            var ts = new Date().toISOString().substr(11, 12);
            $('<li></li>')
                .html(ts + ' [' + label.toUpperCase() + '] ' + text)
                .attr('class', (typeof type !== 'undefined') ? type : '')
                .prependTo($(elementIds.DEBUG));
        };
    }

    return {
        'create': create
    };
});
