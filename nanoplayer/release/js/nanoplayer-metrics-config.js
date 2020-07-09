(function () {
    var useMetrics = true;
    var eventId = getHTTPParam('metrics.eventId');
    var userId = getHTTPParam('metrics.userId');
    var accountId = getHTTPParam('metrics.accountId');
    var accountKey = getHTTPParam('metrics.accountKey');
    var customAccountData = accountId && accountKey;

    if (useMetrics || eventId || customAccountData || userId) {
        window.nanoPlayerMetricsConfig = {
            'accountId': customAccountData ? accountId : 'nanocosmos1',
            'accountKey': customAccountData ? accountKey : 'nc1wj472649fkjah',
            'userId': userId ? userId : 'nanoplayer-demo',
            'eventId': eventId ? eventId : 'nanocosmos-demo',
            'statsInterval': 10,
            'customField1': 'demo',
            'customField2': 'public',
            'customField3': 'online resource',
            statsInterval: 10
        }
    }
})(window);