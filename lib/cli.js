var jsdoclets = require('./');
var opts = require('./options');

opts.parse(process.argv);

jsdoclets(opts, opts.args).
    then(function (doclets) {
        console.log(JSON.stringify(doclets, null, 4));
    }, function (error) {
        console.log('Error: ' + error.message);
        console.log(error.stack);
    });
