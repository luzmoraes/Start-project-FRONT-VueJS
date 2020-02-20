import { AUTH_CONFIG } from './auth-variables'

class AuthService {

  constructor() {}

  setAccessToken(token) {
    localStorage.setItem(AUTH_CONFIG.tokenKey, btoa(JSON.stringify(token)))
  }

  setRefreshToken(refreshToken) {
    localStorage.setItem(AUTH_CONFIG.refreshTokenKey, btoa(JSON.stringify(refreshToken)))
  }

  getAccessToken() {
    return localStorage.getItem(AUTH_CONFIG.tokenKey)
      ? JSON.parse(atob(localStorage.getItem(AUTH_CONFIG.tokenKey)))
      : null
  }

  getRefreshToken() {
    return localStorage.getItem(AUTH_CONFIG.refreshTokenKey)
      ? JSON.parse(atob(localStorage.getItem(AUTH_CONFIG.refreshTokenKey)))
      : null
  }
  
  setCurrentUser(user) {
    localStorage.setItem(AUTH_CONFIG.userKey, btoa(JSON.stringify(user)))
  }
  
  getCurrentUser() {
    return localStorage.getItem(AUTH_CONFIG.userKey)
      ? JSON.parse(atob(localStorage.getItem(AUTH_CONFIG.userKey)))
      : null
  }

  getCurrentCompany() {
    const user = localStorage.getItem(AUTH_CONFIG.userKey)
      ? JSON.parse(atob(localStorage.getItem(AUTH_CONFIG.userKey)))
      : null
    return user ? user.company : null
  }

  clearCredentials() {
    localStorage.removeItem(AUTH_CONFIG.tokenKey)
    localStorage.removeItem(AUTH_CONFIG.refreshTokenKey)
    localStorage.removeItem(AUTH_CONFIG.userKey)
  }
}

export default AuthService;