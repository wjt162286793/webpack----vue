const path = require('path')
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (env) => {
    return {
        mode: 'development',
        entry: './src/main.js',
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.css$/i,
                    use: ['vue-style-loader', 'style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(csv|tsv)$/i,
                    use: ['csv-loader'],
                },
                {
                    test: /\.xml$/i,
                    use: ['xml-loader'],
                },
                {
                    test: /\.toml$/i,
                    type: 'json',
                    parser: {
                        parse: toml.parse,
                    },
                },
                {
                    test: /\.yaml$/i,
                    type: 'json',
                    parser: {
                        parse: yaml.parse,
                    },
                },
                {
                    test: /\.json5$/i,
                    type: 'json',
                    parser: {
                        parse: json5.parse,
                    },
                },
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                    options: {
                        sources: false,
                    },
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-object-rest-spread']
                        }
                    }
                },
                {
                    test: /\.js$/,
                    enforce: "pre",
                    use: ["source-map-loader"],
                },
                {
                    test: /\.less$/i,
                    use: [
                        // compiles Less to CSS
                        'style-loader',
                        'css-loader',
                        'less-loader',
                    ],
                },

            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                // title: 'webpack搭建vue脚手架',
                minify: {

                    removeAttributeQuotes: true

                },

                hash: true,

                template: './public/index.html'
            }),
            new VueLoaderPlugin()
        ],
        devServer: {
            static: './dist',
        },
        optimization: {
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
              resolve:{
          extensions:['.js','.vue','json','.css','.less'],
          alias:{
            '@':resolve('src'),
            'assets':resolve('src/assets'),
            'pages':resolve('src/pages'),
            'dashboard':resolve('src/pages/dashboard')
          }
        }
    }
}
