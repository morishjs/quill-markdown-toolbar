var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
      "markdownToolbar": "./src/index.js",
      "markdownToolbar.min": "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'MarkdownToolbar'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        minimize: true
      })
    ],
    devtool: 'source-map'
};
