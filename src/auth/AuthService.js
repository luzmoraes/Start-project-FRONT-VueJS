import { CONFIG } from '../common/config'

class AuthService {

  constructor() {}

  setAccessToken(token) {
    localStorage.setItem(CONFIG.tokenKey, btoa(JSON.stringify(token)))
  }

  setRefreshToken(refreshToken) {
    localStorage.setItem(CONFIG.refreshTokenKey, btoa(JSON.stringify(refreshToken)))
  }

  getAccessToken() {
    return localStorage.getItem(CONFIG.tokenKey)
      ? JSON.parse(atob(localStorage.getItem(CONFIG.tokenKey)))
      : null
  }

  getRefreshToken() {
    return localStorage.getItem(CONFIG.refreshTokenKey)
      ? JSON.parse(atob(localStorage.getItem(CONFIG.refreshTokenKey)))
      : null
  }
  
  setCurrentUser(user) {
    localStorage.setItem(CONFIG.userKey, btoa(JSON.stringify(user)))
  }
  
  getCurrentUser() {
    return localStorage.getItem(CONFIG.userKey)
      ? JSON.parse(atob(localStorage.getItem(CONFIG.userKey)))
      : null
  }

  getCurrentCompany() {
    const user = localStorage.getItem(CONFIG.userKey)
      ? JSON.parse(atob(localStorage.getItem(CONFIG.userKey)))
      : null
    return user ? user.company : null
  }

  clearCredentials() {
    localStorage.removeItem(CONFIG.tokenKey)
    localStorage.removeItem(CONFIG.refreshTokenKey)
    localStorage.removeItem(CONFIG.userKey)
  }
}

export default AuthService;