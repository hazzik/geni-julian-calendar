const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	mode: 'production',	
	plugins: [
		new CopyPlugin({
			patterns: [
            	{ from: 'src/manifest.json' }
    	    ]
		})
	]
};
