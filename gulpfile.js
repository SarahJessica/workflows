var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

var env, 
	coffeeSrcs,
	jsSrcss,
	sassSrcs,
	sassStyle,
	htmlSrcs,
	jsonSrcs,
	outputDir;

env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	outputDir = 'builds/development';
	sassStyle = 'expanded';
} else {

	outputDir = 'builds/production';
	sassStyle = 'compressed';
}

coffeeSrcs = ['components/coffeescript/*.coffee'];
jsSrcs = [	'components/scripts/*.js'];
jsSrcs = [	outputDir + '/*.html'];
jsSrcs = [	outputDir + '/*.json'];
sassSrcs = ['components/sass/style.scss'];

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
	.pipe(gulp.dest(outputDir + '/js'))
	.pipe(connect.reload())
});

gulp.task('compass', function(){
	gulp.src(sassSrcs)
	.pipe(compass({
      sass: 'components/sass',
      image: outputDir + '/images',
      style: sassStyle
    })
		.on('error', gutil.log))
	.pipe(gulp.dest( outputDir + '/css'))
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