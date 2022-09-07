(function () {
    var useMetrics = true;
    if (document.location.search.indexOf('metrics=0') !== -1) {
        useMetrics = false;
    }
    if (useMetrics) {
        window.nanoPlayerMetricsConfig = {
            accountId: 'nanocosmos-show-demos',
            accountKey: 'nanoshowdemos',
            userId: 'mbrdemo',
            eventId: 'mbrdemo',
            statsInterval: 10
        }
    }
})(window);