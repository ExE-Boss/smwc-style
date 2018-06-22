/*
 * Copyright (C) 2018 ExE Boss
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
const gulp	= require("gulp");
const browserSync	= require("browser-sync");
const mergeStream	= require("merge-stream");

const postcss	= require("gulp-postcss");
const cleanCSS	= require("gulp-clean-css");
const stylelint	= require("gulp-stylelint");
const gulpRename	= require("gulp-rename");
const sourcemaps	= require("gulp-sourcemaps");

const autoprefixer	= require("autoprefixer");
const postcssImport	= require("postcss-import");
const postcssScopify	= require("postcss-scopify");


const argsBuilder = require("yargs")
	.exitProcess(false)
	.option("dest", {
		alias: "destination",
		default: "./dist"
	});

/* Building */

gulp.task("post-layout", () => {
	const args = argsBuilder.argv;
	const streamFactory = () => gulp.src("./src/post-layout/exe-boss.css")
		.pipe(sourcemaps.init())
		.pipe(postcss(() => ({
			plugins: [
				postcssImport({path: ["./node_modules/bootstrap/dist/css/"]}),
				postcssScopify(".exe-boss-post-root"),
				autoprefixer({cascade: false})
			]
		})));

	return mergeStream(
		streamFactory()
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest(args.dest || "./dist"))
			.pipe(browserSync.stream()),
		streamFactory()
			.pipe(cleanCSS())
			.pipe(sourcemaps.write("."))
			.pipe(gulpRename(path => path.basename = /\.css/.test(path.basename)
				? path.basename.replace(/\.css/, ".min.css")
				: `${path.basename}.min`))
			.pipe(gulp.dest(args.dest || "./dist"))
			.pipe(browserSync.stream())
	);
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
