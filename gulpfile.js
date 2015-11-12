var gulp    = require('gulp');
var fs      = require('fs');
var clean   = require('del');
var ejs     = require('gulp-ejs');
var pkg     = require('./package');
var LICENSE = fs.readFileSync('LICENSE', 'utf8');
var CLOBBER = [];
    
gulp.task('clobber', function (done) {
    clean(CLOBBER, done);
});

gulp.task('readme', function () {
    return gulp.
        src('./README.md').
        pipe(ejs({
            pkg: pkg,
            license: LICENSE
        }, {
            ext: '.md'
        })).
        pipe(gulp.dest('./'));
});

gulp.task('default', ['readme']);

