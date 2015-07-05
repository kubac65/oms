var gulp = require('gulp');

var paths = {
	sass = ['.www/scss/**/*.scss']	
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done){
	//sass processing
});