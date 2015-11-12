var unary  = require('ramda/src/unary');
var glob   = require('globby');
var from   = require('protean/rx/from');
var config = require('./config');
var sh     = require('../sh');
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
 * @param {String[]} [opts.dictionaries]
 * @param {String}   globs
 * @returns {Observable<Object>}
 */
module.exports = function jsdoc (opts, globs) {
    return config(opts).
        zip(from(glob(globs)), function (cfg, filepaths) {
            var command = [
                require.resolve('jsdoc/jsdoc.js'),
                '-c', cfg.filename,
                '-X',
                filepaths.join(' ')
            ].join(' ');

            return sh(command).
                map(unary(JSON.parse));
        }).
        concatAll();
};
