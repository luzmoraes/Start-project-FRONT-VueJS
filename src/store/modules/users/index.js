/**
 * Auth Module
 */
const state = {
    users: []
}

// getters
const getters = {
    getUsers: state => {
        return state.users
    }
}

// actions
const actions = {}

// mutations
const mutations = {
    setUsers(state, users) {
        state.users = users;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
