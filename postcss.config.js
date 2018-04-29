module.exports = (ctx) => ({
	map:	ctx.options.map,
	parser:	ctx.file.extname === '.sss' ? 'sugarss' : false,
	plugins: {
		'postcss-import': { root: ctx.file.dirname },
		'autoprefixer': { root: ctx.file.dirname },
	}
});
