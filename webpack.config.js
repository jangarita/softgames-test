/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, '/src/app/main.ts'),
    devtool: 'source-map',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '/dist'),
        assetModuleFilename: 'assets/[name][ext][query]'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf|mp3|ogg|mp4)$/,
                type: 'asset/resource',
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            PIXI: 'pixi.js'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src',
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: [
                            '**/index.html',
                            '**/app/**',
                            '**/*.ts'
                        ],
                    },
                },
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '/src/index.html'),
            inject: 'body',
            hash: true,
        }),
    ],
    devServer: {
        host: 'local-ip',
    },
};
