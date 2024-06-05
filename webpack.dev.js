const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
    return {
        target: 'web',
        entry: './src/index.tsx',
        mode: 'development',
        devtool: 'source-map',
        devServer: {
            hot: true,
            port: 3000,
            open: true,
            historyApiFallback: true,
        },

        output: {
            path: path.join(__dirname, '/dist'),
            filename: "[name].[hash].bundle.js",
            publicPath: "/",
            assetModuleFilename: 'images/[name][ext]',
            chunkFilename: "[name].[chunkhash].chunk.js",
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
                {test: /\.json$/, type: 'json'},
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'source-map-loader'
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
                {
                    test: /\.(css|s[ac]ss)$/i,
                    use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/assets/index.html'
            }),
            new CopyPlugin({
                patterns: [
                    {from: 'src/assets/input_1.json', to: './input_1.json'},
                    {from: 'src/assets/input_2.json', to: './input_2.json'},
                    {from: `src/${env.ENV_NAME}.env.js`, to: './env.js'},
                ],
            }),
        ],
    }
};
