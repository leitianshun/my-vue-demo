// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
Vue.use(ElementUI)

// Vue.filter('formDate', (date) => {   //全局过滤器使用
//   return moment(date).format('YYYY-MM-DD, HH:mm:ss ')
// })


Vue.filter('formDate', (date) => {   //全局时间过滤器
  let diff = new Date().getTime() - new Date(date).getTime()
  if (!date) return
  if (diff < 0) return
  if ((diff / 1000) < 30) {
    return '刚刚'
  } else if ((diff / 1000) < 60) {
    return parseInt(diff / 1000) + '秒前'
  } else if ((diff / 60 / 1000) < 60) {
    return parseInt(diff / 60000) + '分前'
  } else if ((diff / 60 / 60 / 1000) < 24) {
    return parseInt(diff / 3600000) + '小时前'
  } else if ((diff / 24 / 60 / 60 / 1000) < 31) {
    return parseInt(diff / 24 / 3600000) + '天前'
  } else if ((diff / 31 / 24 / 60 / 60 / 1000) < 12) {
    return parseInt(diff / 31 / 24 / 60 / 60 / 1000) + '月前'
  } else {
    return parseInt(diff / 12 / 31 / 24 / 60 / 60 / 1000) + '年前'
  }
})



Vue.prototype.$moment = moment  //原型挂载使用

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






// router.afterEach((to, from) => {
//   alert("你切换了路由");    //切换路由时就会执行
// })