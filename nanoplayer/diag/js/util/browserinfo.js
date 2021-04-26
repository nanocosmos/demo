/*
nanoStream Player Core
(c) 2016, nanocosmos gmbh
http://www.nanocosmos.de
sales@nanocosmos.de

LEGAL NOTICE:
This material is subject to the terms and conditions defined in
separate license conditions ('LICENSE.txt')
All information contained herein is, and remains the property
of nanocosmos GmbH and its suppliers if any. The intellectual and technical concepts
contained herein are proprietary to nanocosmos GmbH, and are protected by trade secret
or copyright law. Dissemination of this information or reproduction of this material
is strictly forbidden unless prior written permission is obtained from nanocosmos.
All modifications will remain property of nanocosmos.
*/

// browserInfo.js

define([], function () {
    'use strict';

    var unknown = 'Unknown';

    // screen
    var screenSize = '';
    if (screen.width) {
        var width = screen.width ? screen.width : '';
        var height = screen.height ? screen.height : '';
        screenSize += '' + width + ' x ' + height;
    }

    //browser
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var browserEngine = unknown;
    var nameOffset, verOffset, ix;
    var plugins = navigator.plugins;

    var hasMediaSource = !!window.MediaSource;
    var isMediaSourceH264Supported = hasMediaSource && window.MediaSource.isTypeSupported && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) !== -1) {
            version = nAgt.substring(verOffset + 8);
        }
        browserEngine = 'Chromium';
    }
    // Samsung Browser
    if ((verOffset = nAgt.indexOf('SamsungBrowser')) !== -1) {
        browser = 'Samsung Browser';
        version = nAgt.substring(verOffset + 15);
        browserEngine = 'Chromium';
    }
    // Chromium based Edge Browser
    else if ((verOffset = nAgt.indexOf('Edg/')) !== -1) {
        browser = 'Microsoft Edge Chromium';
        version = nAgt.substring(verOffset + 4);
        browserEngine = 'Chromium';
    }
    // UC Browser
    else if ((verOffset = nAgt.indexOf('UCBrowser')) !== -1) {
        browser = 'UC Browser';
        version = nAgt.substring(verOffset + 10);
        browserEngine = 'Blink';
    }
    // Yandex Browser
    else if ((verOffset = nAgt.indexOf('YaBrowser')) !== -1) {
        browser = 'Yandex Browser';
        version = nAgt.substring(verOffset + 10);
        browserEngine = 'Blink';
    }
    // Qihoo 360 Browser
    else if ((verOffset = nAgt.indexOf('QIHU 360EE')) !== -1 || (verOffset = nAgt.indexOf('360Browser')) !== -1) {
        browser = 'Qihoo 360 Browser';
        // known Qihoo user agent strings don't give answer about versions
        version = '0';
        browserEngine = 'Blink';
    }
    // Iron Browser
    else if ((verOffset = nAgt.indexOf('Iron')) !== -1) {
        browser = 'Iron Browser';
        version = nAgt.substring(verOffset + 5);
        browserEngine = 'Chromium';
    }
    // Vivaldi Browser
    else if ((verOffset = nAgt.indexOf('Vivaldi')) !== -1) {
        browser = 'Vivaldi Browser';
        version = nAgt.substring(verOffset + 8);
        browserEngine = 'Chromium';
    }
    // NEWER Opera
    else if ((verOffset = nAgt.indexOf('OPR/')) !== -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 4);
        browserEngine = 'Chromium';
    }
    else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
        // MSIE
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(verOffset + 5);
        browserEngine = 'Trident';
    }
    else if (browser === 'Netscape' && (verOffset = nAgt.indexOf('Trident/')) !== -1) {
        //IE 11 no longer identifies itself as MS IE, so trap it
        //http://stackoverflow.com/questions/17907445/how-to-detect-ie11
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(verOffset + 8);
        if ((verOffset = nAgt.indexOf('rv:')) !== -1) {
            version = nAgt.substring(verOffset + 3);
        }
        browserEngine = 'Trident';
    }
    else if (browser === 'Netscape' && (verOffset = nAgt.indexOf('Edge/')) !== -1) {
        // Microsoft Edge
        browser = 'Microsoft Edge Trident';
        version = nAgt.substring(verOffset + 5);
        browserEngine = 'Trident';
    }
    else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
        // Chrome
        var chromePlugins = ['Chromium PDF Viewer', 'Native Client', 'Chromium PDF Plugin'];
        browser = 'Chrome';

        version = nAgt.substring(verOffset + 7);
        browserEngine = 'Chromium';

        // Chromium
        if (hasMediaSource && !isMediaSourceH264Supported && parseInt(version, 10) >= 54) {
            browser = 'Chromium';
        }
        else {
            for (var i = 0; i < plugins.length; i++) {
                if (chromePlugins.includes(plugins[i].name)) browser = 'Chromium';
                break;
            }
        }
    }
    else if ((verOffset = nAgt.indexOf('PhantomJS')) !== -1) {
        // PhantomJS test framework - headless browser
        browser = 'PhantomJS';
        version = nAgt.substring(verOffset + 10);
        browserEngine = 'Webkit';
    }
    else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
        // Safari
        browser = 'Safari';
        version = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf('Version')) !== -1) {
            version = nAgt.substring(verOffset + 8);
        }

        // Chrome on iPad identifies itself as Safari. Actual results do not match what Google claims
        //  at: https://developers.google.com/chrome/mobile/docs/user-agent?hl=ja
        //  No mention of chrome in the user agent string. However it does mention CriOS, which presumably
        //  can be keyed on to detect it.
        if ((verOffset = nAgt.indexOf('CriOS')) !== -1) {
            //Chrome on iPad spoofing Safari...correct it.
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 6);
            //Don't believe there is a way to grab the accurate version number, so leaving that for now.
        }
        browserEngine = 'Webkit';
    }
    else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
        // Firefox
        browser = 'Firefox';
        version = nAgt.substring(verOffset + 8);
        browserEngine = 'Firefox';
    }
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        // Other browsers
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
    var cookieEnabled = !!navigator.cookieEnabled;

    if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
        document.cookie = 'testcookie';
        cookieEnabled = document.cookie.indexOf('testcookie') !== -1;
    }

    // system
    var os = unknown;
    var clientStrings = [
        {
            's' : 'Windows 3.11',
            'r' : /Win16/
        },
        {
            's' : 'Windows 95',
            'r' : /(Windows 95|Win95|Windows_95)/
        },
        {
            's' : 'Windows ME',
            'r' : /(Win 9x 4.90|Windows ME)/
        },
        {
            's' : 'Windows 98',
            'r' : /(Windows 98|Win98)/
        },
        {
            's' : 'Windows CE',
            'r' : /Windows CE/
        },
        {
            's' : 'Windows 2000',
            'r' : /(Windows NT 5.0|Windows 2000)/
        },
        {
            's' : 'Windows XP',
            'r' : /(Windows NT 5.1|Windows XP)/
        },
        {
            's' : 'Windows Server 2003',
            'r' : /Windows NT 5.2/
        },
        {
            's' : 'Windows Vista',
            'r' : /Windows NT 6.0/
        },
        {
            's' : 'Windows 7',
            'r' : /(Windows 7|Windows NT 6.1)/
        },
        {
            's' : 'Windows 8.1',
            'r' : /(Windows 8.1|Windows NT 6.3)/
        },
        {
            's' : 'Windows 8',
            'r' : /(Windows 8|Windows NT 6.2)/
        },
        {
            's' : 'Windows 10',
            'r' : /(Windows 10|Windows NT 10.0)/
        },
        {
            's' : 'Windows NT 4.0',
            'r' : /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
        },
        {
            's' : 'Windows ME',
            'r' : /Windows ME/
        },
        {
            's' : 'Android',
            'r' : /Android/
        },
        {
            's' : 'Open BSD',
            'r' : /OpenBSD/
        },
        {
            's' : 'Sun OS',
            'r' : /SunOS/
        },
        {
            's' : 'Linux',
            'r' : /(Linux|X11)/
        },
        {
            's' : 'iOS',
            'r' : /(iPhone|iPad|iPod)/
        },
        {
            's' : 'Mac OS X',
            'r' : /Mac OS X/
        },
        {
            's' : 'Mac OS',
            'r' : /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
        },
        {
            's' : 'QNX',
            'r' : /QNX/
        },
        {
            's' : 'UNIX',
            'r' : /UNIX/
        },
        {
            's' : 'BeOS',
            'r' : /BeOS/
        },
        {
            's' : 'OS/2',
            'r' : /OS\/2/
        },
        {
            's' : 'Search Bot',
            'r' : /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
        }
    ];
    // TODO for in iterates over the keys of an object !!!! for array iteration use forEach()
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
        }
    }

    var osVersion = unknown;
    var parseResult = undefined;

    // Returns null if pattern doesn't match, returns Array if pattern matches.
    // Array has complete string at index 0 and starting from index 1 the results. A result can be 'undefined' if covered in questionmarks (optional)

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

    var browserInfo = {
        'screen'          : screenSize,
        'browser'         : browser,
        'browserVersion'  : version,
        'mobile'          : mobile,
        'os'              : os,
        'osVersion'       : osVersion,
        'cookies'         : cookieEnabled,
        'browserEngine'   : browserEngine,
        'hasMediaSource'  : hasMediaSource,
        'isH264Supported' : isMediaSourceH264Supported
    };

    return browserInfo;
});
