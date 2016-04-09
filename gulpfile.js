var gulp = require('gulp');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var concatcss = require('gulp-concat-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');
var mongodbData = require('gulp-mongodb-data');

gulp.task('default', ['sass', 'concat-vendor-js', 'concat-js', 'compile-templates']);

gulp.task('sass', function(done){
	var paths = {
		sassSrc : './www/scss/**/*.scss',
		cssDst : './www/css/app.css',
		includePaths : ['./www/lib/bootstrap-sass/assets/stylesheets']
	};

	gulp.src(paths.sassSrc)
		.pipe(sass({
			style: 'compressed',
			errLogToConsole: true,
			includePaths: paths.includePaths
		}))
		.pipe(concatcss(paths.cssDst))
		.pipe(minifycss())
		.pipe(gulp.dest('./'));

	done();
});


gulp.task('concat-vendor-js', function(done){
	var paths = {
		src : [
			'./www/lib/angular/angular.min.js',
			'./www/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'./www/lib/angular-ui-router/release/angular-ui-router.js',
			'./www/lib/ui-select/dist/select.min.js',
			'./www/lib/angular-sanitize/angular-sanitize.min.js',
			'./www/lib/angular-cookies/angular-cookies.js',
			'./www/lib/ng-table/dist/ng-table.min.js'
		],
		dst : './www/js/core.js'
	};

	gulp.src(paths.src)
		.pipe(concat(paths.dst))
		.pipe(gulp.dest('./'));

	done();
});

gulp.task('concat-js', function(done){
	var paths = {
		src : [
			'./www/oms/module.js', './www/oms/app.js',
			'./www/oms/auth/module.js', './www/oms/auth/*.js',
			'./www/navbar/module.js', './www/navbar/*.js',
			'./www/login/module.js', './www/login/*.js',
			'./www/customers/module.js','./www/customers/*.js',
			'./www/orders/module.js','./www/orders/*.js',
			'./www/oms/asyncOverlay.js'

		],
		dst : './www/js/app.js'
	}

	gulp.src(paths.src)
		.pipe(concat(paths.dst))
		//.pipe(uglify())
		.pipe(gulp.dest('./'));

	done();
});

gulp.task('compile-templates', function(done){
	var paths = {
		src: './www/**/templates/*.template.html',
		dst: './www/js/'
	}
	gulp.src(paths.src)
        .pipe(templateCache({
						standalone:true
					}))
				.pipe(uglify())
				.pipe(gulp.dest(paths.dst));
	done();
});

gulp.task('install', ['default'], function(done){
	gulp.src('./db/*.json')
		.pipe(mongodbData({
			mongoUrl: 'mongodb://localhost/oms',
			dropCollection: true
		}));
	done();
});
