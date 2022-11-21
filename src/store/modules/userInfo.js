import api from '@/utils/http/axios';
import router from '../../router';

const state = {
    username: '',
    isLogin: false
}
const getters = {
    user: state => state.username,
    num: state => state.count,
    isLogin: state => state.isLogin
}
const mutations = {
    setUsername(state, payload) {
        state.username = payload.user
        // console.log(payload.user)
        console.log(state.username)
    },
    add(state, num) {
        state.count += num
    },
    setLogin(state, payload) {

        state.isLogin = payload.isLogin
        // console.log(state.isLogin)
    }
}

const actions = {
    setUser({ commit }, payload) {
        setTimeout(() => {
            commit('setUsername', payload)
        }, 1000)
    },
    setCount({ commit }, num) {
        setTimeout(() => {
            commit('add', num)
        }, 1000)
    },
    setLogin({ commit }, payload = { path: '/login' }) {
        api.getInfo().then((res) => {
            console.log(res)
            if (!res.isLogin) {
                // router.push(payload)
                this.$message.error('请先登录')
            } else {
                commit('setLogin', { isLogin: true })

            }
        })
    }

}
console.log(state.isLogin)

export default { state, mutations, getters, actions }