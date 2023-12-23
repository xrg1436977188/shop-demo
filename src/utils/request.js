import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
// 创建axios实例 将来对创建出来的实例 进行自定义配置
// 优点：不会污染原始的axios实例
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000

})

// 自定义配置（请求、响应拦截器）
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 添加加载效果
  Toast.loading({
    message: '加载中...', // 文本
    forbidClick: true, // 加载中无法点击背景
    loadingType: 'spinner', // 样式
    duration: 0// 0秒后关闭
  })
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const res = response.data
  if (res.status !== 200) {
    // 给提示
    Toast(res.message)
    // 抛出一个错误的promise
    return Promise.reject(res.message)
  } else {
    // 清除架加载效果
    Toast.clear()
  }
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出
export default instance
