var Rx         = require('rx');
var Observable = Rx.Observable;

var fs   = require('fs');
var temp = require('temp');
// call track to get automatic cleanup on process exit
temp.track();

var write = Observable.fromNodeCallback(fs.write);
var close = Observable.fromNodeCallback(fs.close);
var open  = Observable.fromNodeCallback(temp.open);

/**
 * Generates a temporary conf.json file for JsDoc to use for its command-line
 * invocation.
 *
 * @param {Object}   opts
 * @param {Boolean}  [opts.privates=false]
 * @param {String}   [opts.recurse=true]
 * @param {String}   [opts.encoding='utf8']
 * @param {String[]} [opts.plugins]
 * @param {RegExp}   [opts.include]
 * @param {RegExp}   [opts.exclude]
 * @param {Boolean}  [opts.allowUnknownTags]
 * @param {String[]} [opts.dictionary]
 * @returns {Observable<Object>}
 */
module.exports = function config (opts) {
    var cfg = {
        opts: {
            'private': opts.privates,
            recurse:   opts.recurse,
            encoding:  opts.encoding
        }
    };

    if (opts.allowUnknownTags || opts.dictionary) {
        cfg.tags = {};
        if (opts.allowUnknownTags) {
            cfg.tags.allowUnknownTags = true;
        }

        if (opts.dictionaries) {
            cfg.tags.dictionary = opts.dictionary;
        }
    }

    if (opts.plugins) {
        cfg.plugins = opts.plugins;
    }

    if (opts.include || opts.exclude) {
        cfg.source = {};
    }

    if (opts.include) {
        cfg.source.includePattern = opts.include.source;
    }

    if (opts.exclude) {
        cfg.source.excludePattern = opts.exclude.source;
    }

    return open({ suffix: '.json' }).
        flatMap(function (tmp) {
            return write(tmp.fd, JSON.stringify(cfg), 'utf8').
                flatMap(function () { return close(tmp.fd); }).
                map(function () {
                    cfg.filename = tmp.path;
                    return cfg;
                });
        });
};
