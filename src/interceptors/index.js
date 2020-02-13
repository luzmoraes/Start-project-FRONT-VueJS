import axios from 'axios';
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

axios.interceptors.response.use(res => {
    // const array = []
    // for (let chave in res.data) {
    //     array.push({ id: chave, ...res.data[chave] })
    //     /*
    //         Equivalente a:
    //         array.push({ id: chave, nome: res.data[chave].nome, email: res.data[chave].email })
    //     */
    // }
    // res.data = array
    return res
}, error => Promise.reject(error))

export default {
    name: 'interceptor'
}