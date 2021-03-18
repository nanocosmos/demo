/**
 * Created by nandor.kostyo on 2016-10-05.
 */
define([
    'elementids',
    'util/browserinfo'
], function (
    elementIds,
    info
) {
    function create () {
        var infoList = $(elementIds.INFO);
        for (var key in info) {
            var li = $('<li></li>');
            li.html(key + ': ' + info[key]);
            infoList.append(li);
        }
    }

    return {
        'create': create
    };
});
