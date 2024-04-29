const CopyPlugin = require('copy-webpack-plugin');
const package = require('./package.json');

module.exports = (env) => ({
	devtool: 'source-map',
	mode: 'production',	
	plugins: [
		new CopyPlugin({
			patterns: [
            	{ 
					from: 'src/manifest.json',
					transform(content) {
						const manifest = JSON.parse(content.toString());
						manifest.version = package.version;
						if (env.AMO_EXTENSION_ID) {
							manifest.browser_specific_settings = {
								...manifest.browser_specific_settings,
								gecko: { id: env.AMO_EXTENSION_ID }
							};
						}
						return JSON.stringify(manifest);
					}
				}
    	    ]
		})
	]
});
