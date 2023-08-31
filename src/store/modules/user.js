const user = {
    state: {
        userInfo: undefined
    },
    mutations: {
        CHANGE_USERINFO: function (state, info) {
            state.userInfo = info
        }
    },
    actions: {
        changeUserInfo({ commit }, data) {
            commit('CHANGE_USERINFO', data)
        }
    }
}

export default user