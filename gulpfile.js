var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	concat = require('gulp-concat');

var coffeeSrcs = ['components/coffeescript/rclick.coffee'];
var jsSrcs = [	'components/scripts/*.js', 
				// 'components/scripts/tagline.js', 
				// 'components/scripts/template.js',
				// 'components/scripts/rclick.js'
			];

gulp.task('coffeeConv', function(){
	gulp.src(coffeeSrcs)
	.pipe(coffee({bare: true})
		.on('error', gutil.log))
	.pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
	gulp.src(jsSrcs)
	.pipe(concat('script.js'))
	.pipe(gulp.dest('builds/development/js'))
});

// gulp.task('log', function (){
// 	gutil.log('this is working');
// });