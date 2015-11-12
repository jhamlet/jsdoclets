var app  = require('commander');
var path = require('path');
var pkg  = require(path.join(__dirname, '..', 'package'));

function collect (arg, memo) {
    var args = arg.split(',');
    memo.push.apply(memo, args);
    return memo;
}

function regexp (arg) { return new RegExp(arg); }

app.
    version(pkg.version).
    description([
        'Output to STDOUT the serialized JSON array of JSDoc doclets for the ',
        'given files or directories.'
    ].join('')).
    arguments('<files...>').
    option(
        '-p, --privates',
        'Include private symbols in the generated doclets.'
    ).
    option(
        '-r, --recurse',
        'Recursively include sub-directories when looking for source files.'
    ).
    option(
        '-e, --encoding <ENC>',
        'Encoding to read source files as. Default \'utf8\'.'
    ).
    option(
        '-i, --include <PATTERN>',
        'A Regular Expression pattern to determine which file paths to include.',
        regexp
    ).
    option(
        '-x, --exclude <PATTERN>',
        'A Regular Expression pattern to determine which file paths to exclude.',
        regexp
    ).
    option(
        '-a, --allow-unknown-tags',
        'Tell JSDoc to allow unknown tags in doclets.'
    ).
    option(
        '-d, --dictionary <NAME>',
        'Which dictionary to use with JSDoc. [*]',
        collect,
        []
    ).
    on('--help', function () {
        console.log([
            '  [* Indicates the option can be specified multiple times, ',
            'or as a comma-delimited string.]'
        ].join(''));
        console.log('');
        console.log([
            '  See the following links for more information on the various ',
            'options for JSDoc:'
        ].join(''));
        console.log('');
        console.log('    http://usejsdoc.org/about-commandline.html');
        console.log('    http://usejsdoc.org/about-configuring-jsdoc.html');
        console.log('');
    });

module.exports = app;
