/**
 * Auth Module
 */

import Vue from 'vue'
// import axios from 'axios'
// import Nprogress from 'nprogress';
// import { AUTH_CONFIG } from '../../../auth/auth-variables';

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
    // insertUser(context, payload) {
    //     Nprogress.start()
        

    // }
}

// mutations
const mutations = {
    setUsers(state, users) {
        state.users = users;
    },
    insertUserSuccess(state, user) {
        state.users.push(user)
        Vue.notify({
            group: 'insertUser',
            type: 'success',
            text: this.$t('message.userSuccessfullyRegistered')
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
