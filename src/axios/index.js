import Vue from 'vue'
import axios from 'axios'

import AuthService from "../auth/AuthService";

const auth = new AuthService();
const { getAccessToken } = auth

axios.interceptors.request.use(
    request => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`
        return request
    },
    error => Promise.reject(error)
)

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }
})