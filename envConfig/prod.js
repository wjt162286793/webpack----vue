const prodConfig = {
    mode: 'production',
    //配置代理服务器
    devServer: {
        static: './dist',
        open: true,
        proxy: {
            '/newApi': {
                target: 'http://82.157.193.128:8080/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/newApi': ''
                }
            }

        }
    },
}

module.exports = prodConfig