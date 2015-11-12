var Rx       = require('rx');
var cp       = require('child_process');
var defaults = require('lodash/object/defaults');

var Observable = Rx.Observable;
var spawn      = cp.spawn;

module.exports = function sh (command, opts) {
    return Observable.create(function (observer) {
        var disposed = false;
        var errored  = false;
        var output   = '';
        var errors   = '';

        opts = defaults(opts || {}, {
            cwd: process.cwd(),
            env: process.env,
            encoding: 'utf8'
        });

        var proc = spawn('sh', ['-c', command], opts);

        proc.on('error', function (error) {
            if (!disposed) {
                errored = true;
                observer.onError(error);
            }
        });

        proc.stdout.setEncoding(opts.encoding);
        proc.stderr.setEncoding(opts.encoding);

        proc.stdout.on('data', function (data) {
            output += data;
        });

        proc.stderr.on('data', function (data) {
            errored = true;
            errors += data;
        });

        proc.on('close', function () {
            if (!disposed) {
                if (!errored) {
                    observer.onNext(output);
                    observer.onCompleted();
                }
                else {
                    observer.onError(new Error(errors));
                }
            }
        });

        return Rx.Disposable.create(function () {
            disposed = true;
        });
    });
};

