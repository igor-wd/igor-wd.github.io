"use strict";
var gulp = require('gulp'),
	smartgrid = require('smart-grid'),
	gp = require('gulp-load-plugins')(),
	browserSync = require('browser-sync').create();
	var settings = {
		outputStyle: 'sass',
		columns: 16,
		offset: '40px', /* gutter width px || % || rem */
		mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
		container: {
			maxWidth: '1280px', /* max-width оn very large screen */
			fields: '40px' /* side fields */
		},
		breakPoints: {
			lg: {
				width: '1100px', /* -> @media (max-width: 1100px) */
			},
			md: {
				width: '960px'
			},
			sm: {
				width: '780px',
				fields: '15px' /* set fields only if you want to change container.fields */
			},
			xs: {
				width: '560px'
			}
			/*
			We can create any quantity of break points.

			some_name: {
				width: 'Npx',
				fields: 'N(px|%|rem)',
				offset: 'N(px|%|rem)'
			}
			*/
		}
	};

	smartgrid('blocks/sass/', settings);

//SERVE
gulp.task('serve', function() {
	browserSync.init({
		server: {baseDir: "app"},
			notify: false
	});
	// browserSync.watch('app', browserSync.reload)
});
//	PUG
gulp.task('pug', function() {
	return gulp.src('blocks/pug/index.pug')
		.pipe(gp.pug({pretty:true}))
		.on("error", gp.notify.onError({title: "PUG -> HTML"}))
		.pipe(gulp.dest('app'))
		.on('end', browserSync.reload);
})

//sass
gulp.task('sass', function() {
	return gulp.src('blocks/sass/main.sass')
		// .pipe(gp.sourcemaps.init())
		.pipe(gp.sass())
		// .pipe(gp.autoprefixer({browsers: ['last 10 versions']}))
		// .pipe(gp.csso())
		.on("error", gp.notify.onError({title: "SASS -> CSS"}))
		// .pipe(gp.sourcemaps.write())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function() {
	gulp.watch('blocks/**/*.pug', gulp.series('pug'));
	gulp.watch('blocks/**/*.sass', gulp.series('sass'))
});

gulp.task('default',gulp.series(
	gulp.parallel('pug','sass'),
	gulp.parallel('watch','serve')
));