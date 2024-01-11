const { merge } = require('webpack-merge');
const baseConfig = require('./envConfig/base')
const dev_localConfig = require('./envConfig/dev_local')
const dev_onlineConfig = require('./envConfig/dev_online')
const prodConfig = require('./envConfig/prod')
const fs = require('fs')
const path = require('path')
module.exports = (env) => {
    // console.log(env.envname, '???第一手')
    console.log(process.env.envname, '环境变量')
    console.log(process.env.apiUrl, '前置代理路径')
    let local = process.env.envname || 'dev_local'
    let activeConfig = null
    // if (process.env.envname) {
    //     let envData = JSON.stringify({
    //         envname: process.env.envname,
    //         apiUrl: process.env.apiUrl
    //     })
    //     fs.writeFile(path.join(__dirname, './src/javascript/envname.js'), `
    //     export const envname = ${envData}`, (error) => {
    //         if (error) {
    //             console.error('写入变量文件报错', error)
    //         }

    //     })
    // }

    switch (local) {
        case 'dev_local':
            activeConfig = dev_localConfig
            break
        case 'dev_online':
            activeConfig = dev_onlineConfig
            break
        case 'prod':
            activeConfig = prodConfig
            break
        default:
            console.error('Invalid environment:', local);
            process.exit(1);
    }

    // 使用 webpack-merge 合并配置
    let config = merge(baseConfig, activeConfig, {
        // 这里可以添加一些额外的配置项
    });
    return config;
}
