const gulp	= require("gulp");
const postcss	= require("gulp-postcss");
const sourcemaps	= require("gulp-sourcemaps");

const autoprefixer	= require("autoprefixer");
const postcssImport	= require("postcss-import");

const argsBuilder = require("yargs")
	.exitProcess(false)
	.option("dest", {
		alias: "destination",
		default: "./dist/"
	});

gulp.task("post-layout", () => {
	const args = argsBuilder.argv;

	return gulp.src("./src/post-layout/exe-boss.css")
		.pipe(sourcemaps.init())
		.pipe(postcss(file => ({
			plugins: [
				postcssImport({root: file.base}),
				autoprefixer
			]
		})))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(args.dest || "./dist/"));
});
