// import auth0 from 'auth0-js'
// import { AUTH_CONFIG } from './auth0-variables'
// import EventEmitter from 'eventemitter3'
// import router from '../router'
// import { store } from '../store/store';
import AppConfig from '../constants/AppConfig'

class AuthService {

  constructor() {
    // this.login = this.login.bind(this)
    // this.setSession = this.setSession.bind(this)
    // this.logout = this.logout.bind(this)
    // this.isAuthenticated = this.isAuthenticated.bind(this)
    // this.authenticated = this.isAuthenticated()
    // this.authNotifier = new EventEmitter()
    // this.auth0 = new auth0.WebAuth({
    //   domain: AUTH_CONFIG.domain,
    //   clientID: AUTH_CONFIG.clientId,
    //   redirectUri: AUTH_CONFIG.callbackUrl,
    //   audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    //   responseType: 'token id_token',
    //   scope: 'openid'
    // })
  }

  setAccessToken(token) {
    localStorage.setItem(AppConfig.tokenKey, btoa(JSON.stringify(token)))
  }

  setRefreshToken(refreshToken) {
    localStorage.setItem(AppConfig.refreshTokenKey, btoa(JSON.stringify(refreshToken)))
  }

  getAccessToken() {
    return localStorage.getItem(AppConfig.tokenKey)
      ? JSON.parse(atob(localStorage.getItem(AppConfig.tokenKey)))
      : null
  }

  getRefreshToken() {
    return localStorage.getItem(AppConfig.refreshTokenKey)
      ? JSON.parse(atob(localStorage.getItem(AppConfig.refreshTokenKey)))
      : null
  }
  
  setCurrentUser(user) {
    localStorage.setItem(AppConfig.userKey, btoa(JSON.stringify(user)))
  }
  
  getCurrentUser() {
    return localStorage.getItem(AppConfig.userKey)
      ? JSON.parse(atob(localStorage.getItem(AppConfig.userKey)))
      : null
  }
  // login() {
  //   this.auth0.authorize()
  // }

  // handleAuthentication() {
  //   this.auth0.parseHash((err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       this.setSession(authResult)
  //       router.replace('/default/dashboard/ecommerce')
  //     } else if (err) {
  //       router.replace('/')
  //       console.log(err)
  //       alert(`Error: ${err.error}. Check the console for further details.`)
  //     }
  //   })
  // }

  // setSession(authResult) {
  //   store.dispatch('signInUserWithAuth0', authResult)
  //   localStorage.setItem('isUserSigninWithAuth0', true)
  //   // Set the time that the access token will expire at
  //   let expiresAt = JSON.stringify(
  //     authResult.expiresIn * 1000 + new Date().getTime()
  //   )
  //   localStorage.setItem('access_token', authResult.accessToken)
  //   localStorage.setItem('id_token', authResult.idToken)
  //   localStorage.setItem('expires_at', expiresAt)
  //   this.authNotifier.emit('authChange', { authenticated: true })
  // }

  // logout() {
  //   store.dispatch('signOutUserFromAuth0')
  //   // Clear access token and ID token from local storage
  //   localStorage.removeItem('access_token')
  //   localStorage.removeItem('id_token')
  //   localStorage.removeItem('expires_at')
  //   this.userProfile = null
  //   this.authNotifier.emit('authChange', false)
  //   // navigate to the home route
  //   router.push('/session/login')
  // }

  // isAuthenticated() {
  //   // Check whether the current time is past the
  //   // access token's expiry time
  //   let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
  //   return new Date().getTime() < expiresAt
  // }
}

export default AuthService;