// import axios from 'axios'
import { reject } from 'lodash';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';   //导入样式
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




const request = (url, method, data) => {
  let token = window.localStorage.getItem('token')
  NProgress.start()
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(`${method}`, `//blog-server.hunger-valley.com${url}`, true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('Authorization', token)
    xhr.send(data)
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // console.log(xhr.responseText)
        NProgress.done()
        let res = JSON.parse(xhr.responseText)  //对后端返回的json格式数据统一转换为js格式
        resolve(res)
      }
    }
  }).catch(err => {
    NProgress.done()
    reject(err)
  })
}

// request('/auth/login', 'POST', 'username=lts&password=123456')

export default request


