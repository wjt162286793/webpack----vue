const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


const prodConfig = {
    mode: 'production',
    plugins:[
        new CompressionPlugin({
            algorithm: 'gzip', // 使用gzip算法进行压缩
            test: /\.(js|css)$/, // 需要压缩的文件类型
            threshold: 10240, // 文件大小大于10KB才会被压缩
            minRatio: 0.8, // 压缩比例达到0.8才会被压缩
            deleteOriginalAssets: false, // 是否删除原始文件
          }),
          new BundleAnalyzerPlugin()
    ],
    optimization: {
        //生产环境上干掉所有的js注释和日志
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false,
              },
            },
            extractComments: false,
          }),
        ],
      },
    externals:{
        'vue':'Vue',
        'axios':'axios',
        'vue-router':'VueRouter',
        'vuex':'Vuex',
        'lodash':'_',
        'html2canvas':'html2canvas',
        'jsplumb':'JSPlUMB'
    },
    devtool: false
}

module.exports = prodConfig