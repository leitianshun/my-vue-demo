import axios from 'axios'
import { Message } from 'element-ui'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css';   //导入样式

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

nprogress.configure({  //配置  是否显示右上角螺旋动画
  showSpinner: false
})

axios.defaults.baseURL = 'https://note-server.hunger-valley.com'
axios.defaults.withCredentials = true
axios.defaults.validateStatus = (status) => {
  return status >= 200 && status < 500
}
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 3000

const request = (url, method, data) => {
  nprogress.start()
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
      nprogress.done()
      if (res.status == 200) {
        resolve(res.data)
      } else {
        reject(res)
        Message({ message: res.data.msg, type: 'error' })
      }
    }).catch(err => {
      nprogress.done()
      reject(err)
      console.log(err)
    })
  })

}

export default {
  request,
  getInfo: () => {
    return request('/auth', 'get')
  },
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
  getNoteFromNoteBook: (id) => {
    return request('/notes/from/' + id, 'get')
  },
  addNote(id, data = '') {
    return request(`/notes/to/${id}`, 'POST', data)
  },
  updateNote: (id, data) => {
    return request('/notes/' + id, 'PATCH', data)
  },
  delNOte: (id) => {
    return request(`/notes/${id}`, 'DELETE')
  },
  getNoteByTrash: () => {
    return request('/notes/trash', 'get', null)
  },
  revertNote: (noteId) => {
    let url = '/notes/:noteId/revert'
    return request(url.replace(':noteId', noteId), 'PATCH')
  },
  deleteNote(noteId) {
    return request(`/notes/${noteId}/confirm`, 'DELETE')
  }
}




