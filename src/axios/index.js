import Vue from 'vue'
import axios from 'axios'
import router from '../router'

import { AUTH_CONFIG } from '../auth/auth-variables';
import AuthService from "../auth/AuthService";
const auth = new AuthService();
const { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken, clearCredentials } = auth

axios.interceptors.request.use(
    request => {
        const token = getAccessToken()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        return request
    },
    error => Promise.reject(error)
)

axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && originalRequest.url === `${AUTH_CONFIG.baseUrl}oauth/token`) {
        router.push("/authentication/login")
        clearCredentials()
        return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = AUTH_CONFIG.refreshTokenInfo
        refreshToken.refresh_token = getRefreshToken()
        return axios.post(`${AUTH_CONFIG.baseUrl}oauth/token`, refreshToken)
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    setAccessToken(res.data.access_token)
                    setRefreshToken(res.data.refresh_token)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`
                    return axios(originalRequest);
                }
            })
    } else{
        router.push("/authentication/login")
        clearCredentials()
        return Promise.reject(error)
    }
})

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }
})