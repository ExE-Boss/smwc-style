module.exports = (ctx) => ({
	map:	ctx.options.map,
	parser:	ctx.file.extname === '.sss' ? 'sugarss' : false,
	plugins: {
		'autoprefixer': { root: ctx.file.dirname },
	}
});
