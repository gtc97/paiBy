import axios from 'axios' // 注意先安装哦
import config from './config.js' // 倒入默认配置
import qs from 'qs' // 序列化请求数据，视服务端的要求

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      // headers: config.headers,
      transformResponse: [function(data) { }]
    }
    )

    // request 拦截器
    instance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('TOKEN')
        if (token) {
          config.headers.TOKEN = token
        } else {
          localStorage.clear()
        }
        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method.toLocaleLowerCase() === 'post' || config.method.toLocaleLowerCase() === 'put' || config.method.toLocaleLowerCase() === 'delete') {
          config.data = qs.stringify(config.data)
        }

        return config
      },
      error => {
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = response.request.responseText
        } else {
          data = response.data
        }

        // 转换json数据
        data = JSON.parse(data)

        // 判断token是否过期

        // if (data.status === 1010) {
          // debugger
          // localStorage.removeItem('TOKEN')
          // location.reload()
        // }

        // 返回数据
        return data
      },
      err => {
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options)
      .then((res) => {
        resolve(res)
        return false
      })
      .catch((error) => {
        reject(error)
      })
  })
}
