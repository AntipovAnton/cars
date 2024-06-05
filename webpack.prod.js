const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
    return {
        target: 'web',
        entry: './src/index.tsx',
        mode: 'production',
        devtool: 'source-map',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: "[name].bundle.js",
            publicPath: "/",
            assetModuleFilename: 'images/[name][ext]',
            clean: true,
            chunkFilename: "[name].chunk.js",
        },

        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {output: {comments: false}},
                    extractComments: false,
                }),
            ],
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            plugins: [new TsconfigPathsPlugin()],
        },

        module: {
            rules: [
                {
                    test: /\.(tsx|ts)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ]
                },
                {
                    test: /\.m?js/,
                    type: "javascript/auto",
                    resolve: {
                        fullySpecified: false,
                    },
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader'
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ],
                },
                {
                    test: /.*\.(gif|png|jp(e*)g|svg)$/i,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 249856 //244kb
                        }
                    }
                },
            ]
        },
        plugins: [
            new CompressionPlugin(),
            new HtmlWebpackPlugin({
                template: './src/assets/index.html'
            }),
            new CopyPlugin({
                patterns: [
                    {from: `src/${env.ENV_NAME}.env.js`, to: './env.js'},
                    {from: 'src/assets/input_1.json', to: './input_1.json'},
                    {from: 'src/assets/input_2.json', to: './input_2.json'},
                ],
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
        ],
    }
};
