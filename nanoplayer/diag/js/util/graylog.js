/**
 * Created by nandor.kostyo on 8/21/2017.
 */
define([], function () {
    function log(data) {
        var url = 'https://glog1.nanocosmos.de/gelf/hfgwj472649fkjah'
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        for (var a in self.header) {
            request.setRequestHeader(a, self.header[a]);
        }
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {

            }
            else if (request.readyState === 4 && request.status !== 200) {

            }
        };
        request.onabort = function () {

        };
        request.onerror = function () {

        };
        request.ontimeout = function () {

        };
        if (typeof data !== 'undefined') {
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data);
                }
                catch (e) {
                    data = null;
                }
            }
            if (typeof data === 'object') {
                try {
                    data = JSON.stringify(data);
                    request.send(data);
                }
                catch (e) {
                }
            }
        }
        else {
            request.send();
        }
    };

    return {
        'log': log
    };
});
