/**
 * Auth Module
 */

import ApiService from '../../../common/api.service'

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
const actions = {
    loadUsers(context) {
        context.commit('changeLoader', true)
        ApiService.get('api/user/list')
            .then((res) => {
                context.commit('changeLoader', false)
                context.commit('setUsers', res.data)
            })
            .catch(err => {
                context.commit('changeLoader', false)
                console.error(err)
            })
    },
    insertUser(context, payload) {
        return ApiService.post('api/user/insert', payload)
    }
}

// mutations
const mutations = {
    setUsers(state, users) {
        state.users = users;
    },
    insertUserSuccess(state, user) {
        state.users.push(user)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
