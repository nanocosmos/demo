/**
 * Created by nandor.kostyo on 2017-03-01.
 */
define([], function () {
    var base = 'player.';
    return {
        CREATE:     base + 'create',
        DESTROY:    base + 'destroy',

        LOADING:    base + 'loading',
        PLAYING:    base + 'playing',
        BUFFERING:  base + 'buffering',
        ERROR:      base + 'error',

        STATS:      base + 'stats',

        VERSIONING: base + 'versioning'
    };
});
