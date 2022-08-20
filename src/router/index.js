import Vue from 'vue'
import Router from 'vue-router'






Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld'),
      meta: {
        keepAlive: true   //组件缓存，组件中的状态会被保留
      }
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
      component: () => import('../../pages/gen')
    },
    {
      path: '/login',
      component: () => import('@/components/login')
    }
  ]
})



