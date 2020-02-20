const clientId = 2
const clientSecret = 'kEVTPt2AQsyQf23p8RRYFiknAUO8yyPbNGmmurMJ'
export const AUTH_CONFIG = {
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
	baseUrl: "http://localhost:8000/"
}