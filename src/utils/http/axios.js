import axios from 'axios'
import { Message } from 'element-ui'


// const options = {
//   baseURL: 'https://note-server.hunger-valley.com',
//   method: 'post',
//   timeout: 5000,
//   header: {
//     'content-type': 'application/x-www-form-urlencoded'
//   },
//   withCredentials: true
// }

// const servince = axios.create(options)
// servince.interceptors.request.use(config => {
//   return config
// }, error => {
//   return Promise.reject(error)
// })

// servince.interceptors.response.use(res => {
//   if (res.status == 200) {
//     return res.data
//   }
// }, error => {
//   this.$message.success(error)
//   return Promise.reject(error)
// })

// export default {
//   servince,
//   login: (data) => {
//     return servince.request({
//       url: '/auth/login',
//       method: 'POST',
//       data: data
//     })
//   },
//   register: (data) => {
//     return servince({
//       url: '/auth/register',
//       method: 'POST',
//       data: data
//     })
//   },
//   logout: () => {
//     return servince.request({
//       url: '/auth/logout',
//       method: 'get'
//     })
//   }

// }



axios.defaults.baseURL = 'https://note-server.hunger-valley.com'
axios.defaults.withCredentials = true
axios.defaults.validateStatus = (status) => {
  return status >= 200 && status < 500
}
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 3000

const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    let options = {
      url,
      method,
    }
    if (method == 'get') {
      options.params = data
    } else {
      options.data = data
    }
    axios(options).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      } else {
        reject(res)
        Message({ message: res.data.msg, type: 'error' })
      }
    }).catch(err => {
      reject(err)
      console.log(err)
    })
  })

}

export default {
  request,
  login: (data) => {
    return request('/auth/login', 'POST', data)
  },
  logout() {
    return request('/auth/logout', 'get')
  },
  register: (data) => {
    return request(
      '/auth/register', 'POST', data
    )
  },
  getAllNoteBook: () => {
    return request('/notebooks')
  },
  addNoteBook(data) {
    return request('/notebooks', 'POST', data)
  },
  deleteNoteBook: (id) => {
    return request('/notebooks/' + id, 'DELETE',)
  },
  editNoteBook: (id, data) => {
    return request('/notebooks/' + id, 'PATCH', data)
  },
  getNoteFromNoteBook:(id)=>{
    return request('/notes/from/' + id,'get')
  }
}




