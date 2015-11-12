var defaults = require('lodash/object/defaults');
var curry    = require('ramda/src/curry');
var concat   = require('ramda/src/concat');
var from     = require('protean/rx/from');
var jsdoc    = require('./jsdoc');

var DEFAULTS = {
    privates: false,
    recurse:  false,
    encoding: 'utf8',
    promised: true
};

/**
 * @param {Object}   opts
 * @param {Boolean}  [opts.privates=false]
 * @param {String}   [opts.recurse=true]
 * @param {String}   [opts.encoding='utf8']
 * @param {Boolean}  [opts.promised=true]
 * @param {String[]} [opts.plugins]
 * @param {RegExp}   [opts.include]
 * @param {RegExp}   [opts.exclude]
 * @param {Boolean}  [opts.allowUnknownTags]
 * @param {String[]} [opts.dictionary]
 * @param {String}   globs
 * @returns {Observable<Doclet>|Promise<Array<Doclet>>}
 */
module.exports = curry(function jsdoclets (opts, globs) {
    opts = defaults(opts || {}, DEFAULTS);

    return opts.promised ?
        jsdoc(opts, globs).
            reduce(concat, []).
            toPromise()
        :
        jsdoc(opts, globs).flatMap(from);
});
