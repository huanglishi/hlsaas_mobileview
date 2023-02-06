import axios from 'axios';
import md5 from 'md5';
import urls from './url';
const API_SECRET = 'hltw888';
const serviceParams = {
    timeout: 5000,
}
if (!import.meta.env.DEV) {
    serviceParams['baseURL'] = import.meta.env.VITE_BASE_URL
}
const service = axios.create(serviceParams)

// 请求拦截
service.interceptors.request.use((config: any) => {
    const timestamp: number = Date.parse(new Date().toString()) / 1000;
    config.headers['verify-time'] = timestamp
    config.headers['verify-encrypt'] = md5(API_SECRET + timestamp)
    return config
})
// 响应拦截
service.interceptors.response.use(response => {
    return response
}, error => {
    console.log('超时', error)
    return error
})

// 普通请求
const http = (urlName: string, params: any) => {
    const url = urls[urlName][0];
    const method = urls[urlName][1];
    const fetchParams: any = {
        url,
        method,
        headers: {}
    }
    if (method === 'get') {
        fetchParams['params'] = params;
    } else {
        fetchParams['data'] = params;
        fetchParams.headers['Content-Type'] = 'application/json; charset=utf-8'

    }
    return service(fetchParams)
}
export default http;

// 上传图片
export const uploadImg = (formData: any) => {
    const url = urls.uploadImage[0];
    const method = urls.uploadImage[1];
    return service({
        url,
        method,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}
