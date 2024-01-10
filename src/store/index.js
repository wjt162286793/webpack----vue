const Vuex = require('vuex')

import user from './modules/user'
import role from './modules/role'
const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        user,
        role
    }
})

export default store