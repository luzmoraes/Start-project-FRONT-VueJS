/**
 * Auth Module
 */
import axios from 'axios'
import Nprogress from 'nprogress';
import router from '../../../router';
import { CONFIG } from '../../../common/config';
import AuthService from "../../../auth/AuthService";
import GlobalService from '../../../common/global.services'

const auth = new AuthService();
const { setAccessToken, setRefreshToken, setCurrentUser, getCurrentUser, getCurrentCompany, clearCredentials } = auth

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
    signinUser(context, payload) {
        context.commit('loginUser')
        axios.post(`${CONFIG.baseUrl}oauth/token`, payload)
            .then(res => {
                if (res.data.access_token) {
                    setAccessToken(res.data.access_token)
                    setRefreshToken(res.data.refresh_token)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
                    context.dispatch("getCurrentUser")
                } else {
                    Nprogress.done()
                    context.commit('loginUserFailure', {message: 'E-mail ou senha inválidos, tente novamente!'})
                }
            })
            .catch(error => {
                Nprogress.done()
                context.commit('loginUserFailure', {message: 'E-mail ou senha inválidos, tente novamente!'})
                return error
            });
    },
    getCurrentUser(context) {
        axios.get(`${CONFIG.baseUrl}api/user/me`)
            .then(res => {
                Nprogress.done()
                const user = {
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email,
                    created_at: res.data.created_at
                }
                context.commit('loginUserSuccess', user)
            })
            .catch(err => {
                context.commit('loginUserFailure', {message: 'Dados do usuário não pode ser carregado, tente novamente!'});
                return err
            })
    },
    logoutCurrentUser(context) {
        Nprogress.start();
        axios.get(`${CONFIG.baseUrl}api/user/logout`)
            .then((res) => {
                Nprogress.done();
                if (res.data.success) {
                    context.commit('logoutUser');
                } else {
                    context.commit('loginUserFailure', {message: 'Problema ao sair do sistema, tente novamente.'});    
                }
            })
            .catch(error => {
                context.commit('loginUserFailure', error);
            })
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
        router.push("/dashboard")
        GlobalService.showNotification('global', 'success', 'Usuário autenticado com sucesso!')
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
