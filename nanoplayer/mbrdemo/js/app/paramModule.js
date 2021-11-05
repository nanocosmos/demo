/*
nanoStream Player
(c) 2015-2020, nanocosmos gmbh
https://www.nanocosmos.de
sales@nanocosmos.de

LEGAL NOTICE:
This material is subject to the terms and conditions defined in
separate license conditions ('LICENSE.txt' or nanocosmos.de/terms)
All information contained herein is, and remains the property
of nanocosmos GmbH and its suppliers if any. The intellectual and technical concepts
contained herein are proprietary to nanocosmos GmbH, and are protected by trade secret
or copyright law. Dissemination of this information or reproduction of this material
is strictly forbidden unless prior written permission is obtained from nanocosmos.
All modifications will remain property of nanocosmos.
*/
var paramModule = (function () {
    var httpParams = new Array();

    function init () {
        setHTTPParams();
    }

    function setHTTPParams () {
        if (document.location.search) {
            var strGET = document.location.search.substr(1, document.location.search.length);
            if (strGET === '' && document.location.href.indexOf('?') !== -1) {
                var pos = document.location.href.indexOf('?') + 1;
                strGET = document.location.href.slice(pos);
            }
            if (strGET !== '') {
                var gArr = strGET.split('&');
                for (var i = 0; i < gArr.length; ++i) {
                    var v = '';
                    var vArr = gArr[i].split('=');
                    var k = vArr[0];
                    if (vArr.length > 1) {
                        v = vArr[1];
                    }
                    httpParams[decodeURIComponent(k)] = decodeURIComponent(v);
                }
            }
        }
    }

    function getParamByKey (key) {
        try {
            return httpParams[key];
        }
        catch (e) {
            return undefined;
        }
    }

    function getParams () {
        return httpParams;
    }

    return {
        'init'          : init,
        'httpParams'    : httpParams,
        'getParamByKey' : getParamByKey,
        'getParams'     : getParams
    };
})();
