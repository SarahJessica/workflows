var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee');

var coffeeSrcs = ['components/coffeescript/*.coffee'];

gulp.task('coffeeConv', function(){
	gulp.src(coffeeSrcs)
	.pipe(coffee({bare: true})
		.on('error', gutil.log))
	.pipe(gulp.dest('components/scripts'))
});

// gulp.task('log', function (){
// 	gutil.log('this is working');
// });