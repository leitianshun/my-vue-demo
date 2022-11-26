import Vue from 'vue'
import Router from 'vue-router'
import { Message } from "element-ui"


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/notebook',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld'),
      meta: {
        isAuth: true,
        keepAlive: true   //组件缓存，组件中的状态会被保留
      },
      children: [{
        path: 'notebook',
        name: 'notebook',
        component: () => import('@/pages/note/notebook')
      },
      {
        name: 'note',
        path: 'note',
        meta: {
          title: 'Permission',
          roles: ['admin', 'editor'] // 普通的用户角色
        },
        component: () => import('@/pages/note/note')
      },
      {
        path: 'collection',
        component: () => import('@/pages/note/collection')
      }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/components/Test'),
      children: [{
        path: 'tes',
        component: () => import('@/components/Tes')
      },
      {
        path: 'tes2',
        component: () => import('@/components/Tes2')
      },
      {
        path: 'tes3',
        component: resolve => require(['@/components/Tes3'], resolve)
      },
      {
        path: 'tes4',
        component: () => import('@/components/Tes4')
      },
      {
        path: 'tes5',
        component: () => import('@/components/Tes5')
      }
      ]

    },
    {
      path: '/about',
      component: () => import('@/components/about')
    },
    {
      path: '/gen',
      component: () => import('../pages/gen')
    },
    {
      path: '/login',
      component: () => import('@/components/login')
    }
  ]
})

export default router

router.beforeEach(async (to, from, next) => {   //全局前置守卫
  let token = await window.localStorage.getItem('token')
  if (!token && to.path !== '/login') {
    next('/login')
    Message({
      message: '请先登录',
      type: 'error'
    })
  } else {
    next()
  }
  // if (!token && to.path === '/') {
  //   next('/login')
  // }
})


// 注册一个全局后置守卫
// router.afterEach((to) => {
//   if (to.meta.title) {
//     document.title = to.meta.title //修改网页的title
//   } else {
//     document.title = 'course_demo'
//   }
// })


