//引入需要的依赖包
const path = require('path')
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (env) => {
    return {
        //模式:development是开发模式,production是生产模式
        mode: 'development',
        //入口文件,也可以配置多入口,具体看文档
        entry: './src/main.js',
        //输出配置
        output: {
            //文件名,使用hash算法生成文件名
            filename: '[name].[contenthash].js',
            //构建后文件的存放目录
            path: path.resolve(__dirname, 'assetProject'),
            publicPath: '/',
        },
        //代码源文件映射,方便调试
        devtool: 'inline-source-map',
        //配置各种loader
        module: {
            rules: [
                //vue的loader
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                //css的编译loader,这里记得把vue-style-loader写到前面
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                },
                //各类图片的loader
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                //字体文件的loader
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                //csv等表格的解析loader
                {
                    test: /\.(csv|tsv)$/i,
                    use: ['csv-loader'],
                },
                //xml标记文本的loader
                {
                    test: /\.xml$/i,
                    use: ['xml-loader'],
                },
                //toml类型文件的loader,其实吧,这个文件是干啥的,我也不知道
                {
                    test: /\.toml$/i,
                    type: 'json',
                    parser: {
                        parse: toml.parse,
                    },
                },
                //yaml文件的loader
                {
                    test: /\.yaml$/i,
                    type: 'json',
                    parser: {
                        parse: yaml.parse,
                    },
                },
                //json5文件的loader
                {
                    test: /\.json5$/i,
                    type: 'json',
                    parser: {
                        parse: json5.parse,
                    },
                },
                //html的配置loader
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                    options: {
                        sources: false,
                    },
                },
                //babel的配置loader,将es6+的代码转化为es5的
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
                //js的源代码映射
                {
                    test: /\.js$/,
                    enforce: "pre",
                    use: ["source-map-loader"],
                },
                //less的解析loader
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
        //插件
        plugins: [
            //这里是html的配置,目标指向public下面的index.html,也可以在这里配置里面一些东西
            new HtmlWebpackPlugin({
                // title: 'webpack搭建vue脚手架',
                favicon: path.resolve('./src/assets/favicon.ico'),
                minify: {
                    removeAttributeQuotes: true
                },
                hash: true,

                template: './public/index.html'
            }),
            //vue的插件
            new VueLoaderPlugin(),

    //自动导入vue的组合式api        
      require('unplugin-auto-import/webpack')({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'vue-router'],
      })
        ],
        //配置代理服务器
        devServer: {
            static: './dist',
            open: true,
            proxy: {
                '/app': 'http://127.0.0.1:3000',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/app': ''
                }

            }
        },
        //依赖包的抽取,减少大量的冗余代码,可以去看看
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
        //配置路径的快捷引用
        resolve: {
            extensions: ['.js', '.vue', 'json'],
            alias: {
                '@': path.resolve('src'),
                'assets': path.resolve('src/assets'),
                'pages': path.resolve('src/pages'),
                'dashboard': path.resolve('src/pages/dashboard')
            }
        }
    }
}
