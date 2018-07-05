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
const postcssVariables	= require("postcss-simple-vars");

const range	= require("lodash.range");

const argsBuilder = require("yargs")
	.option("destination", {
		alias: ["dest", "d"],
		default: "./dist/",
		description: "The destination folder for all build processes",
	})
	.alias("help", ["h", "?"])
	.alias("version", "V");
const args = argsBuilder.parse(process.argv);

/* Constants */

const LINE_NUMBERS = range(1,10000).join("\\A ");

/* Building */

gulp.task("post-layout", () => {
	/** @return {NodeJS.ReadWriteStream} */
	const streamFactory = () => gulp.src("./src/post-layout/exe-boss.css")
		.pipe(sourcemaps.init())
		.pipe(postcss(() => ({
			plugins: [
				postcssImport({path: ["./node_modules/bootstrap/dist/css/"]}),
				postcssScopify(".exe-boss-post-root"),
				postcssVariables({variables:{
					"line-numbers": LINE_NUMBERS,
				}}),
				autoprefixer({cascade: false}),
			],
		})));

	return mergeStream(
		streamFactory()
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest(args.dest))
			.pipe(browserSync.stream()),
		streamFactory()
			.pipe(cleanCSS())
			.pipe(gulpRename(path => path.basename = /\.css/.test(path.basename)
				? path.basename.replace(/\.css/, ".min.css")
				: `${path.basename}.min`))
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest(args.dest))
			.pipe(browserSync.stream())
	);
});

gulp.task("post-layout-html", () => {
	return gulp.src("./src/post-layout/smw-central.html")
		.pipe(gulp.dest(args.dest));
});

gulp.task("serve", ["post-layout", "post-layout-html"], () => {
	gulp.src("./src/post-layout/smw-central.html")
		.pipe(gulp.dest(args.dest));

	browserSync.init({
		open: false,
		server: args.dest,
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
