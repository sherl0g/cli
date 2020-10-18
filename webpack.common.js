const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true, entryOnly: true }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new NodemonPlugin({
            verbose: true
        }),
    ],
    output: {
        filename: 'sherlog.js',
        path: path.resolve(__dirname, 'bin'),
    },
    externals: [
        nodeExternals(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: 'shebang-loader'
                    },
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@root': path.resolve(__dirname),
            '@kernel': path.resolve(__dirname, 'src/kernel'),
            '@libs': path.resolve(__dirname, 'src/libs'),
            '@stubs': path.resolve(__dirname, 'src/stubs'),
        }
    },
    target: 'node'
};
