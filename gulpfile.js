var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass')
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
});

// gulp.task('log', function (){
// 	gutil.log('this is working');
// });