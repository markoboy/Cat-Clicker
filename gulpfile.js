var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('default', function() {
	console.log('Gulp is running!');
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'src'
		}
	});
});

gulp.task('watch', ['browserSync'], function() {
	gulp.watch('src/css/**/*.css', browserSync.reload);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});