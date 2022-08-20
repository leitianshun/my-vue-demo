import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/userInfo.js'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user
    }
})


