var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

var coffeeSrcs = ['components/coffeescript/*.coffee'];
var jsSrcs = [	'components/scripts/*.js'];
var sassSrcs = ['components/sass/style.scss'];

gulp.task('coffeeConv', function(){
	gulp.src(coffeeSrcs)
	.pipe(coffee({bare: true})
		.on('error', gutil.log))
	.pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
	gulp.src(jsSrcs)
	.pipe(concat('script.js'))
	.pipe(browserify())
	.pipe(gulp.dest('builds/development/js'))
	.pipe(connect.reload())
});

gulp.task('compass', function(){
	gulp.src(sassSrcs)
	.pipe(compass({
      sass: 'components/sass',
      image: 'builds/development/images',
      style: 'expanded'
    })
		.on('error', gutil.log))
	.pipe(gulp.dest('builds/development/css'))
	.pipe(connect.reload())
});

gulp.task('connect', function(){
	connect.server({
		root: 'builds/developement',
		livereload: true
	});
});

gulp.task('watch', function(){
	gulp.watch(coffeeSrcs, ['coffeeConv']);
	gulp.watch(jsSrcs, ['js']);
	gulp.watch(sassSrcs, ['compasstomarto']);
});
gulp.task('default', ['coffeeConv', 'js', 'compass', 'connect', 'watch']);

// gulp.task('log', function (){
// 	gutil.log('this is working');
// });