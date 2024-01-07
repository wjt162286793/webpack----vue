
import axios from 'axios'
import { envname } from '@/javascript/envname'

//创建axios实例
const request = axios.create({
    baseUrl: `/${envname.apiUrl}`,
    timeout: '6000',
})
let token = localStorage.getItem('token')

//请求拦截
request.interceptors.request.use(function (config) {
    //解决baseUrl不生效的问题
    config.url = config.baseUrl + config.url
    if (token && token.length > 0) {
        config.headers.token = token
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

//响应拦截
request.interceptors.response.use(function (response) {
    if (response.status == 200) {
        response = response.data
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default request