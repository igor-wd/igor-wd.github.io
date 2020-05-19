let project_folder = require("path").basename(__dirname);
let source_folder = "#src";

let path={
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		js: project_folder + "/js/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/"
	},
	src:{
		html: source_folder + "/pug/index.pug",
		css: source_folder + "/sass/style.sass",
		js: source_folder + "/js/scripts.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/fonts/*.ttf"
	},
	watch: {
		html: source_folder + "/pug/**/*.pug",
		css: source_folder + "/sass/**/*.sass",
		js: source_folder + "/js/**/*.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
	},
	clean: "./" + project_folder + "/"
}
let {src, dest} = require("gulp"),
	gulp = require("gulp"),
	del = require("del"),
	browsersync = require("browser-sync").create(),
	sass = require("gulp-sass"),
	pug = require("gulp-pug"),
	autoprefixer = require("gulp-autoprefixer"),
	csso = require("gulp-csso"),
	rename = require("gulp-rename"),
	notify = require("gulp-notify"),
	gcmq = require("gulp-group-css-media-queries");

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		port: 3000,
		notify: false
	})
}

function html() {
	return src(path.src.html)
		.pipe(pug({pretty: true}))
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.src.js)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function css() {
	return src(path.src.css)
		.pipe(sass({outputStyle: "expanded"}))
		.pipe(gcmq())
		.pipe(autoprefixer({
			overrideBrowserslist: ["last 5 versions"],
			cascade: true
		}))
		.pipe(csso())
		.on("error", notify.onError({title: "S・A・S・S"}))
		.pipe(dest(path.build.css))
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);

}
function clean(params) {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;