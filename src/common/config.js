const clientId = 2
const clientSecret = 'U1qttc28fwAeIxC0yRAspHKdBaR0RP1c8V4Vhoz1'
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