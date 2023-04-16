
import axios from 'axios'

//创建axios实例
const request = axios.create({
    baseUrl: "/app",
    timeout: '6000',
})
let token = localStorage.getItem('token')

//请求拦截
request.interceptors.request.use(function (config) {
    console.log(config, '配置')
    if (token && token.length > 0) {
        config.headers.token = token
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

//响应拦截
request.interceptors.response.use(function (response) {
    console.log(response, '请求结果')
    if (response.status == 200) {
        response = response.data
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default request