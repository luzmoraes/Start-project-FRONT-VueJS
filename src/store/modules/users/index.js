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
    },
    getUserFromId({commit, state}, payload) {
        const users = [...state.users]
        if (users.length == 0) {
            commit('changeLoader', true)
            ApiService.get('api/user/list')
                .then((res) => {
                    commit('changeLoader', false)
                    commit('setUsers', res.data)
                    const user = users.filter(user => user.id == payload)
                    commit('setSelectedUser', user[0])
                    return user[0]
                })
                .catch(err => {
                    commit('changeLoader', false)
                    console.error(err)
                })
        } else {
            const user = users.filter(user => user.id == payload)
            commit('setSelectedUser', user[0])
            return user[0]
        }

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
    setSelectedUser(state, user) {
        state.selectedUser = user
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
