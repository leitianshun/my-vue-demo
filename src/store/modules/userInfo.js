const state = {
    username: '',
    count: 0
}
const getters = {
    user: state => state.username,
    num: state => state.count,
}
const mutations = {
    setUsername(state, payload) {
        state.username = payload.user
        // console.log(payload.user)
        console.log(state.username)
    },
    add(state, num) {
        state.count += num
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
    }
}

export default { state, mutations, getters, actions }