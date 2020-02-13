/**
 * Auth Module
 */
import Vue from 'vue'
import axios from 'axios'
import Nprogress from 'nprogress';
import router from '../../../router';
import AppConfig from "../../../constants/AppConfig";
import AuthService from "../../../auth/AuthService";

const auth = new AuthService();
const { setAccessToken, setRefreshToken, setCurrentUser, getCurrentUser } = auth

const state = {
    user: getCurrentUser()
}

// getters
const getters = {
    getUser: state => {
        return state.user
    }
}

// actions
const actions = {
    signinUser(context, payload) {
        context.commit('loginUser')
        axios.post(`${AppConfig.baseUrl}oauth/token`, payload)
            .then(res => {
                if (res.data.access_token) {
                    setAccessToken(res.data.access_token)
                    setRefreshToken(res.data.refresh_token)
                    context.dispatch("getCurrentUser");
                } else {
                    Nprogress.done()
                    context.commit('loginUserFailure', {message: 'E-mail ou senha inválidos, tente novamente!'})
                }
            })
            .catch(err => {
                // context.commit('loginUserFailure', err);
                context.commit('loginUserFailure', {message: 'E-mail ou senha inválidos, tente novamente!'});
                return err
            })
    },
    getCurrentUser(context) {
        axios.get(`${AppConfig.baseUrl}api/user/me`)
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
                // context.commit('loginUserFailure', err);
                context.commit('loginUserFailure', {message: 'não buscou o usuário!'});
                return err
            })
    }
}

// mutations
const mutations = {
    loginUser() {
        Nprogress.start();
    },
    loginUserSuccess(state, user) {
        state.user = user
        setCurrentUser(user)
        router.push("/default/dashboard/ecommerce");
        setTimeout(function(){
            Vue.notify({
                group: 'loggedIn',
                type: 'success',
                text: 'User Logged In Success!'
            });
       },1500);
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
        localStorage.removeItem(AppConfig.userKey);
        localStorage.removeItem(AppConfig.tokenKey);
        localStorage.removeItem(AppConfig.refreshTokenKey);
        router.push("/");
    },
    signUpUser() {
        Nprogress.start();
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
