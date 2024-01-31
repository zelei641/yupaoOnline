import axios, {AxiosInstance} from "axios";

export const URL = 'localhost:8081/api';

//定义要向那个地址发送请求 myAxios相当于是自己定义的axios对象
const myAxios : AxiosInstance = axios.create({
    baseURL: 'http://localhost:8081/api'
});

myAxios.defaults.withCredentials = true; //表示向后端发送请求的时候要发送cookie

//全局请求拦截器
myAxios.interceptors.request.use(function (config) {
    console.log("我要发请求啦",config)
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

//全局响应拦截器
myAxios.interceptors.response.use(function (response) {
    console.log("我收到请求啦",response)
    if (response?.data?.code === 40100)
    {
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`
    }
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;


