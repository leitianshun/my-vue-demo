// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
Vue.use(ElementUI)


Vue.config.productionTip = false
Vue.prototype.$event = new Vue()

Vue.config.errorHandler = (err) => {
  alert(err);
};



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


router.beforeEach((to, from, next) => {   //全局前置守卫
  if (to.path === '/login') next()
  let token = window.localStorage.getItem('token')
  if (token) {
    next()
    return
  } else {
    next('/login')
  }
  // if (!token && to.path === '/') {
  //   next('/login')
  // }
})


// router.afterEach((to, from) => {
//   alert("你切换了路由");    //切换路由时就会执行
// })