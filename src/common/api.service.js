// import Vue from 'vue'
import axios from 'axios'
import { CONFIG } from './config'

const ApiService = {

  query (resource, params) {
    return axios.get(resource, params)
  },

  get (resource, slug = '') {
    return axios.get(`${CONFIG.baseUrl + resource}/${slug}`)
  },

  post (resource, params) {
    return axios.post(`${CONFIG.baseUrl + resource}`, params)
  },

  upload (resource, params) {
    return axios.post(`${CONFIG.baseUrl + resource}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  update (resource, params) {
    return axios.put(`${CONFIG.baseUrl + resource}`, params)
  },

  put (resource, params) {
    return axios.put(`${CONFIG.baseUrl + resource}`, params)
  },

  delete (resource) {
    return axios.delete(CONFIG.baseUrl + resource)
  }
}

export default ApiService