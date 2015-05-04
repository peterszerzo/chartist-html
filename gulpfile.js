var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('lint', function() {
	return gulp.src('./src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('spec', function() {
	return gulp.src('./spec/runner.html')
		.pipe(mochaPhantomJS());
});

gulp.task('default', [ 'lint', 'spec' ])