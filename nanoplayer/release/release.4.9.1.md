# NanoPlayer - Release Overview

# [4.9.1]

## Release Notes

This version introduces a redesign of the player internal icons and control bar appearance including customizable colors and transparency.
The default color scheme is providing a more modern and familiar look and feel.
The symbol color can be customized via the `config.style.symbolColor` parameter (default: "rgba(244,233,233,1)").
The control bar background color can be customized via the `config.style.controlBarColor` parameter (default: "rgba(0,0,0,0.5)").
The given color string can be a valid css (case insensitive) keyword, hex code with/without alpha, rgb, rgba, hsl or hsla. Example values: "white", "#ffffff", "rgba(237,125,14,0.5)".
The highlighting of the clickable buttons can be disabled via `config.style.buttonHighlighting=false`. The animation of the clickable buttons can be disabled via `config.style.buttonAnimation=false`.
Also the cursor at button mouseover (default: "pointer") can be customized over `config.style.buttonCursor` by passing a valid css cursor keyword or url.

Furthermore support for poster images has been added. Poster images can be applied via the config.style.poster parameter.
The string has to be a relative or absolute path to a valid "img" element source like "./assets/poster.png" or "https://[YOURDOMAIN]/assets/poster.gif".

## Changelog

### Added

- redesign of the player internal icons and control bar appearance
- customizable icon and control bar background colors and transparency
- customizable button behaviour
- support for poster images

### Improved

- iOS desktop mode detection and handling in Safari and Chrome

### Fixed

- setVolume method not applying the value 0/zero
- use 'parentNode' instead of 'parentElement'

## Release Package 4.9.1

* [4.9.1](https://files.nanocosmos.de/index.php/s/EMss2Yb2iyx9LDF)
* [latest 4.x](https://files.nanocosmos.de/index.php/s/4nndC45mcB6oSa6)
* [latest](https://files.nanocosmos.de/index.php/s/2tpCzgRjNEZDzeP)

# Documentation

* [docs.nanocosmos.de](https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api/)

# Release History

* [release history](https://demo.nanocosmos.de/nanoplayer/docs/nanoplayer/release-history.html)