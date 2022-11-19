// import axios from 'axios'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css';   //导入样式
// import { Message } from 'element-ui'


// NProgress.configure({  //配置  是否显示右上角螺旋动画
//   showSpinner: false
// })

// axios.defaults.baseURL = 'http://blog-server.hunger-valley.com'
// // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.timeout = 3000
// axios.defaults.withCredentials = true
// axios.defaults.validateStatus = (status) => {
//   return status >= 200 && status < 500
// }


// const request = (url, method, data) => {
//   NProgress.start()
//   return new Promise((resolve, reject) => {
//     let options = {
//       url,
//       method
//     }
//     if (method == 'get') {
//       options.params = data
//     } else {
//       options.data = data
//     }
//     axios(options).then(res => {
//       NProgress.done()
//       if (res.status == 200) {
//         resolve(res.data)
//       }
//     }).catch(err => {
//       NProgress.done()
//       reject(err)
//       Message({
//         message: err.msg,
//         type: 'error'
//       })
//     })
//   })
// }
// export default {
//   request,
//   login: (data) => {
//     return request('/auth/login', 'POST', data)
//   }
// }
