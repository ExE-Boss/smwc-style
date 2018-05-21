const gulp	= require("gulp");
const postcss	= require("gulp-postcss");
const sourcemaps	= require("gulp-sourcemaps");
const browserSync	= require("browser-sync");

const autoprefixer	= require("autoprefixer");
const postcssImport	= require("postcss-import");
const postcssScopify	= require("postcss-scopify");

const stylelint	= require("gulp-stylelint");

const argsBuilder = require("yargs")
	.exitProcess(false)
	.option("dest", {
		alias: "destination",
		default: "./dist"
	});

/* Building */

gulp.task("post-layout", () => {
	const args = argsBuilder.argv;

	return gulp.src("./src/post-layout/exe-boss.css")
		.pipe(sourcemaps.init())
		.pipe(postcss(file => ({
			plugins: [
				postcssImport({root: file.base}),
				postcssScopify(".exe-boss-post-root"),
				autoprefixer({cascade: false})
			]
		})))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(args.dest || "./dist"))
		.pipe(browserSync.stream());
});

gulp.task("post-layout-html", () => {
	const args = argsBuilder.argv;

	return gulp.src("./src/post-layout/smw-central.html")
		.pipe(gulp.dest(args.dest || "./dist"));
});

gulp.task("serve", ["post-layout", "post-layout-html"], () => {
	gulp.src("./src/post-layout/smw-central.html")
		.pipe(gulp.dest("./dist"));

	browserSync.init({
		open: false,
		server: "./dist"
	});

	gulp.watch("./src/post-layout/*.css",	["post-layout"]);
	gulp.watch("./src/post-layout/*.html",	["post-layout-html"])
		.on("change", browserSync.reload);
});

/* Linting */

gulp.task("lint", ["post-layout-lint"]);

gulp.task("post-layout-lint", () => {
	return gulp.src("./src/post-layout/**/*.css")
		.pipe(postcss(() => ({
			plugins: [
				postcssScopify(".exe-boss-post-root")
			]
		})))
		.pipe(stylelint({
			reporters: [{
				formatter: "string",
				console: true
			}]
		}));
});
