module.exports = {
    plugins: [],
    modifyWebpackConfig: ({ webpackConfig: config, env: { target, dev }, webpackObject: webpack }) => {
        // Add Node.js polyfills for webpack 5
        if (!config.resolve) config.resolve = {};
        if (!config.resolve.fallback) config.resolve.fallback = {};
        config.resolve.fallback = {
            ...config.resolve.fallback,
            "url": require.resolve("url/"),
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "buffer": require.resolve("buffer"),
            "util": require.resolve("util"),
            "path": require.resolve("path-browserify"),
        };

        // Disable minification to avoid terser issues with ESM packages
        config.optimization = {
            ...config.optimization,
            minimize: false,
            minimizer: [],
        };

        if (Array.isArray(config.plugins)) {
            config.plugins = config.plugins.filter(plugin => {
                return plugin.constructor?.name !== 'TerserPlugin';
            });
        }

        // load webfonts
        rules = config.module.rules || [];
        rules.push({
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: [
                {
                    loader: require.resolve('file-loader'),
                    options: {
                        name: 'public/fonts/[name].[ext]',
                    },
                },
            ],
        });
        config.module.rules = rules;

        return config;
    },
};
