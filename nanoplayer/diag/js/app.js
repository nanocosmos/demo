/**
 * Created by nandor.kostyo on 2016-09-17.
 */

define([
    'log',
    'eventemitter',
    'components/ui',
    'components/nanohandler',
    'components/streamdump',
    'components/timerange',
    'components/diag'
], function (
    logger,
    EventEmitter,
    ui,
    nanoHandler,
    streamDump,
    timeRange,
    diag
) {
    var log = logger.create('app');
    var emitter = new EventEmitter();
    var components = [];

    function init() {
        document.cookie = 'nanoDump=1';

        components.push(nanoHandler.create(emitter));
        components.push(streamDump.create(emitter));
        components.push(timeRange.create(emitter));
        components.push(diag.create(emitter));
        components.push(ui.create(emitter));

        log('ready to use');
    }

    init();
});