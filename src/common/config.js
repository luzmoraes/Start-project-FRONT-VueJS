const clientId = 2
const clientSecret = '4Lm5FlAZk9esJWhy5p44AnIptQbdNp0Zz3QYvMQE'
export const CONFIG = {
	authInfo: {
		grant_type: "password",
		client_id: clientId,
		client_secret: clientSecret,
		username: '',
		password: '',
		scope: ''
	},
	refreshTokenInfo: {
		grant_type: 'refresh_token',
		refresh_token: '',
		client_id: clientId,
		client_secret: clientSecret,
		scope: ''
	},
	userKey: "_currentUser",
	tokenKey: "_currentToken",
	refreshTokenKey: "_refreshToken",
	baseUrl: 'http://localhost:8000/'
}