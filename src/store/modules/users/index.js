/**
 * Auth Module
 */

import ApiService from '../../../common/api.service'

const state = {
    users: [],
    selectedUser: null
}

// getters
const getters = {
    getUsers: state => {
        return state.users
    },
    getSelectedUser: state => {
        return state.selectedUser
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
    }
}

// mutations
const mutations = {
    setUsers(state, users) {
        state.users = users;
    },
    setSelectedUser(state, user) {
        state.selectedUser = user
    },
    insertUserSuccess(state, user) {
        state.users.push(user)
    },
    updateUserSuccess(state, user) {
        state.users.map(item => {
            if (item.id === user.id) item = user
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
