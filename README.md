jsdoclets
=========

[jsdoc]:      http://usejsdoc.org/
[doclet]:     http://usejsdoc.org/about-plugins.html#event-newdoclet
[promise]:    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[observable]: https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md
[ramda]:      http://ramdajs.com/0.18.0/
[aboutcurry]: https://web.archive.org/web/20140714014530/http://hughfdjackson.com/javascript/why-curry-helps

Wrapper for [JSDoc][jsdoc] [doclet][doclet] generation via the
[command-line](#command-line-usage), or through the [asynchronous API](#api).

Installation
------------

```sh
$ npm install jsdoclets
```


Command Line Usage
------------------

```
$ jsdoclets -h

  Usage: jsdoclets [options] <files...>

  Output to STDOUT the serialized JSON array of JSDoc doclets for the given files or directories.

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -p, --privates            Include private symbols in the generated doclets.
    -r, --recurse             Recursively include sub-directories when looking for source files.
    -e, --encoding <ENC>      Encoding to read source files as. Default 'utf8'.
    -i, --include <PATTERN>   A Regular Expression pattern to determine which file paths to include.
    -x, --exclude <PATTERN>   A Regular Expression pattern to determine which file paths to exclude.
    -a, --allow-unknown-tags  Tell JSDoc to allow unknown tags in doclets.
    -d, --dictionary <NAME>   Which dictionary to use with JSDoc. [*]

  [* Indicates the option can be specified multiple times, or as a comma-delimited string.]

  See the following links for more information on the various options for JSDoc:

    http://usejsdoc.org/about-commandline.html
    http://usejsdoc.org/about-configuring-jsdoc.html

```


API
---

```js
var jsdoclets = require('jsdoclets');

jsdoclets(null, ['path/to/directory']).
    then(function (doclets) {
        // ...
    });
```

### `jsdoclets(options, globs)` : [`Promise`][promise] | [`Observable`][observable]

#### `options : Object`

*   `privates : Boolean` - Include private symbols in the generated doclets?
*   `recurse : Boolean` - Recursively include sub-directories when looking for
    source files.
*   `encoding : String` - Encoding to read source files as. Default `'utf8'`.
*   `promised : Boolean` - Return a [`Promise`](promise), otherwise return an
    [`Observable`](observable). Default `true`.
*   `include : RegExp` - Regular Expression to determine which files should be
    included.
*   `exclude : RegExp` - Regular Expression to determine which files should
    be excluded.
*   `allowUnknownTags: Boolean` - Boolean passed along to [JSDoc][jsdoc] to
    allow unknown tags.
*   `dictionary : String[]` - Passed along to let [JSDoc][jsdoc] know which
    dictionaries it should use.

#### `globs : String[]`

One, or more, file patterns to run [JSDoc][jsdoc] against.

#### Returns

*   A [Promise][promise] with an array of [doclets][doclet] as its argument.
*   Otherwise, if `promised === false`, an [Observable][observable] that will
    `onNext` each [doclet][doclet].

**Note:** jsdoclets is a curried function and will return a function waiting for
the next parameter if only invoked with one argument.

```js
var jsdoclets = require('jsdoclets');

var privates = jsdoclets({ privates: true });

privates(['path/to/files']).
    then(function (doclets) {
        // ...
    });
```

See [Why Curry Helps](aboutcurry) for more information on currying, and
[Ramda](ramda) for a great library for doing so.


Report an Issue
---------------

* [Bugs](http://github.com/jhamlet/metalsmith-babylast/issues)
* Contact the author: <jerry@hamletink.com>


License
-------

> Copyright (c) 2015 Jerry Hamlet <jerry@hamletink.com>
> 
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation
> files (the "Software"), to deal in the Software without
> restriction, including without limitation the rights to use,
> copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the
> Software is furnished to do so, subject to the following
> conditions:
> 
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
> 
> The Software shall be used for Good, not Evil.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
> OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
> HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
> WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
> FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
> OTHER DEALINGS IN THE SOFTWARE.
