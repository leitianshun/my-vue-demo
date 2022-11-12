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

Vue.filter('formDate', (date) => {   //全局过滤器使用
  return moment(date).format('YYYY-MM-DD, HH:mm:ss ')
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