/**
 * Auth Module
 */
import Vue from 'vue'
import axios from 'axios'
import Nprogress from 'nprogress';
import router from '../../../router';
import { AUTH_CONFIG } from '../../../auth/auth-variables';
import AuthService from "../../../auth/AuthService";

const auth = new AuthService();
const { setAccessToken, setRefreshToken, setCurrentUser, getCurrentUser, getCurrentCompany, clearCredentials } = auth

const state = {
    user: getCurrentUser(),
    company: getCurrentCompany()
}

// getters
const getters = {
    getUser: state => {
        return state.user
    },
    getCompany: state => {
        return state.company
    }
}

// actions
const actions = {
    signinUser(context, payload) {
        context.commit('loginUser')
        axios.post(`${AUTH_CONFIG.baseUrl}oauth/token`, payload)
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
        axios.get(`${AUTH_CONFIG.baseUrl}api/user/me`)
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
        axios.get(`${AUTH_CONFIG.baseUrl}api/user/logout`)
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
        router.push("/default/dashboard/ecommerce")
        Vue.notify({
            group: 'loggedIn',
            type: 'success',
            text: 'Usuário autenticado com sucesso!'
        });
    },
    loginUserFailure(state, error) {
        Nprogress.done();
        Vue.notify({
            group: 'loggedIn',
            type: 'error',
            text: error.message
        });
    },
    logoutUser(state) {
        state.user = null
        clearCredentials()
        router.push("/session/login");
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
