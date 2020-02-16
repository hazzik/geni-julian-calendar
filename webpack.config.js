const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	devtool: 'sourcemap',
	plugins: [
		new CopyPlugin([
            { from: 'src/manifest.json' }
        ])
	]
};
