/**
 * Auth Module
 */
import Nprogress from 'nprogress'
import router from '../../../router'
import ApiService from '../../../common/api.service'
import AuthService from "../../../auth/AuthService"
import GlobalService from '../../../common/global.services'

const auth = new AuthService();
const { setCurrentUser, getCurrentUser, getCurrentCompany, clearCredentials } = auth

const state = {
    user: getCurrentUser(),
    company: getCurrentCompany()
}

// getters
const getters = {
    getUser: state => state.user
}

// actions
const actions = {
    async logoutCurrentUser(context) {
        try {
            Nprogress.start()
            await ApiService.get('api/user/logout')
            context.commit('logoutUser')
            Nprogress.done()
        } catch (err) {
            context.commit('logoutUser')
        }
    }
}

// mutations
const mutations = {
    loginUser() {
        Nprogress.start();
    },
    loginUserSuccess(state, user) {
        state.user = user;
        setCurrentUser(user)
    },
    loginUserFailure(state, error) {
        Nprogress.done();
        GlobalService.showNotification('global', 'error', error.message)
    },
    logoutUser(state) {
        state.user = null
        clearCredentials()
        router.push("/authentication/login");
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
