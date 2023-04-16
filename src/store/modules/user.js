const user = {
    state: {
        userInfo: {}
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