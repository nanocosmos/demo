/**
 * @license NanoTools 2.0.0
 * Copyright (c) 2016-2022 nanocosmos IT GmbH. All rights reserved.
 * https://www.nanocosmos.de
 */
/*eslint-disable no-undef, no-console, no-unused-vars */
(function () {
    'use strict';

    var NanoTools = {};

    // Parse the supplied JSON, or return null if parsing fails.
    NanoTools.parseJSON = function (json) {
        if (typeof json === 'object') {
            return json;
        }
        try {
            return JSON.parse(json);
        }
        catch (e) {
            trace('Error parsing json: ' + json);
        }
        return null;
    };

    // HTTP Params / Query String
    NanoTools.HTTPParams = undefined;
    NanoTools.getHTTPParam = function (paramKey) {
        // if params dont exist, create/read them
        if (!NanoTools.HTTPParams) {
            NanoTools.HTTPParams = [];
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
                    NanoTools.HTTPParams[decodeURIComponent(k)] = decodeURIComponent(v);
                }
            }
        }
        // return requested param, if exists
        try {
            return NanoTools.HTTPParams[paramKey];
        }
        catch (e) {
            return undefined;
        }
    };

    /**
     * Used as a shortcut for finding DOM elements by ID.
     * @param {string} id is a case-sensitive string representing the unique ID of
     *     the element being sought.
     * @return {object} id returns the element object specified as a parameter
     */

    // incompatible to jquery!
    NanoTools.getElement = function (id) {
        var el = document.getElementById(id);
        try {
            if (el)
                return el;
        }
        catch (e) {
            NanoTools.debug_('element not found' + id);
        }
        // element with id not found, return empty container:
        var dummycontainer = {};
        dummycontainer.value = undefined;
        dummycontainer.checked = undefined;
        dummycontainer.options = {};
        dummycontainer.options.length = 0;
        dummycontainer.innerHTML = '';
        dummycontainer.enabled = undefined;
        dummycontainer.textContent = undefined;
        dummycontainer.style = {};
        dummycontainer.src = '';
        dummycontainer.click = function () {
            return null;
        };
        dummycontainer.classList = '';
        dummycontainer.show = function () {
            return null;
        };
        dummycontainer.hide = function () {
            return null;
        };

        return dummycontainer;
    };

    NanoTools.defineObjects = function () {
        if (arguments.length > 0) {
            for (var i = 0; i < arguments.length; i += 1) {
                if (typeof arguments[i] === 'object') { // Array
                    for (var j = 0; j < arguments[i].length; j += 1) {
                        window[arguments[i][j]] = window[arguments[i][j]] || {};
                    }
                }
                else if (typeof arguments[i] === 'string') {
                    window[arguments[i]] = window[arguments[i]] || {};
                }
            }
        }
    };

    NanoTools.setGlobals = function () {
        if (arguments.length > 0) {
            for (var i = 0; i < arguments.length; i += 1) {
                if (typeof arguments[i] === 'object' && typeof arguments[i][0] === 'string') { // Arrays with keypairs
                    if (arguments[i].length === 2) {
                        window[arguments[i][0]] = arguments[i][1];
                    }
                    else if (arguments[i].length === 1) {
                        window[arguments[i][0]] = undefined;
                    }
                }
            }
        }
    };

    NanoTools.elementExists = function (id) {
        var el = document.getElementById(id);
        if (el)
            return true;
        else
            return false;
    };

    //$ = getElement;

    NanoTools.showElement = function (id, show) {
        try {
            if (typeof show === 'undefined')
                NanoTools.getElement(id).style.display = 'block';
            else if (show)
                NanoTools.getElement(id).style.display = 'block';
            else
                NanoTools.getElement(id).style.display = 'none';
        }
        catch (e) { }
    };

    NanoTools.disableElement = function (id) {
        NanoTools.getElement(id).disabled = true;
    };

    // LOGGING

    /**
     * @param {string} message Text to print.
     */
    NanoTools.print_ = function (message) {
        NanoTools.print_handler_(message, 'messages');
    };

    /**
     * @param {string} message Text to print.
     */
    NanoTools.success_ = function (message) {
        NanoTools.print_handler_(message, 'messages', 'green');
    };

    /**
     * @param {string} message Text to print.
     */
    NanoTools.warning_ = function (message) {
        NanoTools.print_handler_(message, 'messages', 'orange');
    };

    /**
     * Print error message in the debug log + JS console and throw an Error.
     * @param {string} message Text to print.
     * @param {int} errorlevel 1: only log the error, 2: additionally throw the error
     */
    NanoTools.error_ = function (message, errorlevel) {
        if (!errorlevel)
            errorlevel = 1;
        // log errors in errors and messages to be sure the user sees it
        NanoTools.print_handler_(message, 'messages', 'red');
        NanoTools.print_handler_(message, 'errors', 'red', errorlevel);
    };

    /** @private */
    NanoTools.failure_ = function (method, error) {
        try {
            if (error instanceof Object) {
                error = JSON.stringify(error);
            }
        }
        catch (e) { }
        NanoTools.error_(method + '() failed: ' + error);
        alert('Error in ' + method + ' : ' + error);
    };

    /**
     * @private
     * @param {string} message Text to print.
     */
    NanoTools.debug_ = function (message) {
        if (NanoTools.debugLevel === 0) return;
        NanoTools.print_handler_(message, 'debug');
    };

    NanoTools.logTime = true;

    NanoTools.debugLevel = 0;

    NanoTools.debugCount = 0;
    NanoTools.debugMax = 30;

    /**
     * @private
     * @param {string} message Text to print.
     * @param {string} textField Element ID of where to print.
     * @param {string} color Color of the text.
     */
    NanoTools.print_handler_ = function (message, textField, color, error) {
        if (typeof message === 'object') {
            message = JSON.stringify(message, null, ' ');
        }
        if (color === 'green')
            message = 'Success: ' + message;
        else if (color === 'red') {
            message = 'Error: ' + message;
        }
        else if (color === 'orange') {
            message = 'Warning: ' + message;
            console.warn(message);
        }
        if (NanoTools.logTime && window.performance) {
            var now = (window.performance.now() / 1E3).toFixed(3);
            message = now + ': ' + message;
        }

        if (color) {
            console.log('%c' + message, 'color:' + color);
        }
        else {
            console.log(message);//Changed this so it doesn't appear to the end client.
        }

        if (error) {
            var e = new Error(message);
            console.error(e);
            //throw e;
            //alert(message);
            if (error > 1) {
                throw e;
            }
        }

        var field = NanoTools.getElement(textField);
        if (field) {
            if (textField === 'debug' && NanoTools.debugCount > NanoTools.debugMax) {
                var span = field.firstChild;
                field.removeChild && field.removeChild(span);
            }
            var htmlMessage = '<span';
            if (color) {
                htmlMessage += ' style="color:' + color + ';">';
            }
            else {
                htmlMessage += '>';
            }
            htmlMessage += message + '</span><br>';
            field.innerHTML += htmlMessage;
            if (textField === 'debug') NanoTools.debugCount++;
        }
    };

    // Overrides

    window.Number.prototype.toFloat = function (toFixed) {
        var a = 2;
        var b = toFixed;
        if (b)
            a = b;
        return parseFloat(this.toFixed(toFixed));
    };

    window.Number.prototype.toInt = function () {
        var float = this;
        return parseInt(float.toString(), 10);
    };

    window.String.prototype.contains = function (searchString) {
        var index = this.indexOf(searchString);
        return (index !== -1);
    };

    /// format string with arguments
    window.String.format = function () {
        // The string containing the format items (e.g. "{0}")
        // will and always has to be the first argument.
        var theString = arguments[0];

        // start with the second argument (i = 1)
        for (var i = 1; i < arguments.length; i++) {
            // "gm" = RegEx options for Global search (more than one instance)
            // and for Multiline search
            var regEx = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            theString = theString.replace(regEx, arguments[i]);
        }

        return theString;
    };

    window.String.prototype.contain = function (searchString) {
        var hasString = 0;
        var hasLength = 0;
        var parts = searchString.split('*');
        for (var i in parts) {
            if (parts[i].length > 0)
                hasLength++;
            else continue;
            if (this.indexOf(parts[i]) !== -1)
                hasString++;
        }
        return (hasString === hasLength);
    };

    Storage.prototype.setObject = function (key, value) {
        this.setItem(key, JSON.stringify(value));
    };

    Storage.prototype.getObject = function (key) {
        var value = this.getItem(key);
        return value && JSON.parse(value);
    };

    Storage.prototype.removeObject = function (key) {
        this.removeItem(key);
    };

    Element.prototype.redraw = function () {
        element = this;
        var n = document.createTextNode(' ');
        element.appendChild(n);
        n.parentNode.removeChild(n);
    };

    Element.prototype.show = function () {
        this.style.display = 'block';
    };

    Element.prototype.hide = function () {
        this.style.display = 'none';
    };

    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    };

    Number.prototype.toHHMMSS = function () {
        var sec_num = this; // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    };

    NanoTools.isType = function (el, type) {
        var string = Object.prototype.toString.call(el);// === "[object Array]"
        return (type.toLowerCase() === string.split(' ')[1].replace(']', '').toLowerCase());
    };

    NanoTools.isWhat = function (el) {
        var string = Object.prototype.toString.call(el);// === "[object Array]"
        return string.split(' ')[1].replace(']', '').toLowerCase();
    };

    NanoTools.extend = function (from, to) {
        for (var i in from) to[i] = from[i];
    };

    // date-helpers

    NanoTools.getDateTime = function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (month.toString().length === 1) {
            month = '0' + month;
        }
        if (day.toString().length === 1) {
            day = '0' + day;
        }
        if (hour.toString().length === 1) {
            hour = '0' + hour;
        }
        if (minute.toString().length === 1) {
            minute = '0' + minute;
        }
        if (second.toString().length === 1) {
            second = '0' + second;
        }
        var dateTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + '+' + second + '00';
        return dateTime;
    };

    NanoTools.getTime = function (startDate, endDate) {
        endDate = endDate || new Date();
        var timeDifference = {};
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var startDate_ms = startDate.getTime();
        var endDate_ms = endDate.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = endDate_ms - startDate_ms;
        timeDifference.milliseconds = Math.floor(difference_ms % 1000);
        //take out milliseconds
        difference_ms = difference_ms / 1000;
        timeDifference.seconds = Math.floor(difference_ms % 60);
        difference_ms = difference_ms / 60;
        timeDifference.minutes = Math.floor(difference_ms % 60);
        difference_ms = difference_ms / 60;
        timeDifference.hours = Math.floor(difference_ms % 24);
        timeDifference.days = Math.floor(difference_ms / 24);

        return timeDifference;
    };

    NanoTools.getTimeSeconds = function (startDate, endDate) {
        endDate = endDate || new Date();
        return Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
    };

    NanoTools.getTimeSecondsFromPerformance = function (startPerformance) {
        var currentPerformance = window.performance.now();
        return Math.floor((currentPerformance - startPerformance) / 1000);
    };

    NanoTools.getRandomNumber = function () {
        return Math.floor(Math.random() * 10000);
    };

    NanoTools.rectime = function (secs) {
        var hr = Math.floor(secs / 3600);
        var min = Math.floor((secs - (hr * 3600)) / 60);
        var sec = secs - (hr * 3600) - (min * 60);

        if (hr < 10) {
            hr = '0' + hr;
        }
        if (min < 10) {
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        if (hr) {
            hr = '00';
        }
        return hr + ':' + min + ':' + sec;
    };

    NanoTools.shortenText = function (s_, l) {
        var s = s_;
        if (!l) l = 40;
        s = s.replace(/[\n\r]/g, '');
        s = s.replace(/[\n]/g, '');
        s = s.replace(/[\r]/g, '');
        if (s.length > l) s = s.substr(0, l) + ' ...';
        return s;
    };

    // OS DETECTION
    (function () {
        /* test cases
                alert(
                    'browserInfo result: OS: ' + browserInfo.os +' '+ browserInfo.osVersion + '\n'+
                        'Browser: ' + browserInfo.browser +' '+ browserInfo.browserVersion + '\n' +
                        'Mobile: ' + browserInfo.mobile + '\n' +
                        'Cookies: ' + browserInfo.cookies + '\n' +
                        'Screen Size: ' + browserInfo.screen
                );
            */
        var unknown = 'Unknown';

        // screen
        var screenSize = '';
        if (screen.width) {
            var width = (screen.width) ? screen.width : '';
            var height = (screen.height) ? screen.height : '';
            screenSize += '' + width + ' x ' + height;
        }

        //browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }

        // NEWER Opera
        if ((verOffset = nAgt.indexOf('OPR/')) !== -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }

        //IE 11 no longer identifies itself as MS IE, so trap it
        //http://stackoverflow.com/questions/17907445/how-to-detect-ie11
        else if ((browser === 'Netscape') && ((verOffset = nAgt.indexOf('Trident/')) !== -1)) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 8);
            if ((verOffset = nAgt.indexOf('rv:')) !== -1) {
                version = nAgt.substring(verOffset + 3);
            }
        }

        // Microsoft Edge
        else if ((browser === 'Netscape') && ((verOffset = nAgt.indexOf('Edge/')) !== -1)) {
            browser = 'Microsoft Edge';
            version = nAgt.substring(verOffset + 5);
        }

        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }

        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                version = nAgt.substring(verOffset + 8);
            }

            // Chrome on iPad identifies itself as Safari. Actual results do not match what Google claims
            //  at: https://developers.google.com/chrome/mobile/docs/user-agent?hl=ja
            //  No mention of chrome in the user agent string. However it does mention CriOS, which presumably
            //  can be keyed on to detect it.
            if (nAgt.indexOf('CriOS') !== -1) {
                //Chrome on iPad spoofing Safari...correct it.
                browser = 'Chrome';
                //Don't believe there is a way to grab the accurate version number, so leaving that for now.
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() === browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) !== -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) !== -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) !== -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = !!(navigator.cookieEnabled);

        if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') !== -1);
        }

        // system
        var os = unknown;
        var clientStrings = [
            { 's' : 'Windows 3.11',
                'r' : /Win16/ },
            { 's' : 'Windows 95',
                'r' : /(Windows 95|Win95|Windows_95)/ },
            { 's' : 'Windows ME',
                'r' : /(Win 9x 4.90|Windows ME)/ },
            { 's' : 'Windows 98',
                'r' : /(Windows 98|Win98)/ },
            { 's' : 'Windows CE',
                'r' : /Windows CE/ },
            { 's' : 'Windows 2000',
                'r' : /(Windows NT 5.0|Windows 2000)/ },
            { 's' : 'Windows XP',
                'r' : /(Windows NT 5.1|Windows XP)/ },
            { 's' : 'Windows Server 2003',
                'r' : /Windows NT 5.2/ },
            { 's' : 'Windows Vista',
                'r' : /Windows NT 6.0/ },
            { 's' : 'Windows 7',
                'r' : /(Windows 7|Windows NT 6.1)/ },
            { 's' : 'Windows 8.1',
                'r' : /(Windows 8.1|Windows NT 6.3)/ },
            { 's' : 'Windows 8',
                'r' : /(Windows 8|Windows NT 6.2)/ },
            { 's' : 'Windows NT 4.0',
                'r' : /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
            { 's' : 'Windows ME',
                'r' : /Windows ME/ },
            { 's' : 'Android',
                'r' : /Android/ },
            { 's' : 'Open BSD',
                'r' : /OpenBSD/ },
            { 's' : 'Sun OS',
                'r' : /SunOS/ },
            { 's' : 'Linux',
                'r' : /(Linux|X11)/ },
            { 's' : 'iOS',
                'r' : /(iPhone|iPad|iPod)/ },
            { 's' : 'Mac OS X',
                'r' : /Mac OS X/ },
            { 's' : 'Mac OS',
                'r' : /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { 's' : 'QNX',
                'r' : /QNX/ },
            { 's' : 'UNIX',
                'r' : /UNIX/ },
            { 's' : 'BeOS',
                'r' : /BeOS/ },
            { 's' : 'OS/2',
                'r' : /OS\/2/ },
            { 's' : 'Search Bot',
                'r' : /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;
        var parseResult = undefined;

        switch (os) {
            case 'Mac OS X':
                parseResult = /Mac OS X (\d+)_(\d+)_?(\d+)?/.exec(nAgt) || /Mac OS X ([._\d]+)/.exec(nAgt);
                if (parseResult !== null) {
                    osVersion = parseResult[1] + '.' + (parseResult[2] | 0) + '.' + (parseResult[3] | 0);
                }
                break;

            case 'Android':
                parseResult = /Android ([._\d]+)/.exec(nAgt);
                if (parseResult !== null) {
                    osVersion = parseResult[1];
                }
                break;

            case 'iOS':
                parseResult = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                if (parseResult !== null) {
                    osVersion = parseResult[1] + '.' + parseResult[2] + '.' + (parseResult[3] | 0);
                }
                break;

            default:
                if (/Windows/.test(os)) {
                    parseResult = /Windows (.*)/.exec(os);
                    if (parseResult !== null) {
                        osVersion = parseResult[1];
                    }
                    os = 'Windows';
                }
                break;
        }

        window.browserInfo = {
            'screen'         : screenSize,
            'browser'        : browser,
            'browserVersion' : version,
            'mobile'         : mobile,
            'os'             : os,
            'osVersion'      : osVersion,
            'cookies'        : cookieEnabled
        };
    })();

    NanoTools.showRtcStats = function (tag, str, data) {
        var statsString = '';
        if (data) {
            for (var i = 0; i < data.length; ++i) {
                var res = data[i];
                var id = res.id;
                if (id) {
                    var ok = false;
                    ok = true; // get all
                    if (id === 'bweforvideo') { // we only want bwe
                        ok = true;
                    }
                    //ssrc...send
                    if (id.length > 19 && id.substring(0, 4) === 'ssrc' && id.contains('send')) {
                        ok = true;
                    }
                    if (id.contains('Certific') || id.contains('LibjingleSession')) {
                        ok = false;
                    }
                    if (ok && res.names) {
                        NanoTools.debug_('RTC-Stat-ID: ' + id + '\n');
                        var names = res.names();
                        if (names) {
                            statsString += '[' + id + ']: ';
                            for (var j = 0; j < names.length; ++j) {
                                var name = names[j];
                                if (!name.contains('Certific')) { // ignore certificates
                                    try {
                                        if (name.length > 4 && name.substring(0, 4) === 'goog') {
                                            name = name.substring(4);
                                        }
                                        statsString += name;
                                        statsString += ' : ';
                                        statsString += res.stat(names[j]) + ' '; // + "\r\n";
                                        //NanoTools.print_(statsString);
                                    }
                                    catch (e) {
                                        NanoTools.debug_(e);
                                    }
                                }
                            }
                            statsString += '\r\n';
                        }
                    }
                }
                else {
                    statsString += str;
                }
            }
        }
        if (statsString.length > 1) {
            NanoTools.debug_('RTC Status:' + statsString);
            var rtcstatsID = NanoTools.getElement(tag);
            if (rtcstatsID) {
                var s = statsString.replace(/\r?\n|\r/g, '<br>').replace(/\[/g, '<b>[').replace(/\]/g, ']</b>');
                rtcstatsID.innerHTML = '<b>RTC Status:</b><br>' + s;
            }
        }
    };

    // unused ?!
    NanoTools.showRtmpStats = function (id, stats) {
        var statId = NanoTools.getElement(id);
        if (statId) {
            NanoTools.debug_('RTMP Status: ' + stats);
            statId.innerHTML = '<b>RTMP Stats:</b><br>' + stats;
        }
        else {
            NanoTools.success_(event.text + ': ' + stats); // where does event come from !!
        }
    };

    NanoTools.getRandomString = function (randomType, length) {
        var chars0Az = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        var chars0z = '0123456789abcdefghiklmnopqrstuvwxyz';
        var chars0 = '0123456789';
        var chars = chars0z;
        switch (randomType) {
            case 0:
                chars = chars0;
                break;
            case 1:
                chars = chars0Az;
                break;
            case 2:
            default:
                chars = chars0z;
                break;
        }
        var stringLength = 6;
        if (typeof length === 'number') {
            stringLength = length;
        }
        var randomstring = '';
        for (var i = 0; i < stringLength; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    };

    return (window.NanoTools = NanoTools);
})();
