/**
 * App Config File
 */
export default {
	appLogo: '/static/img/logo.png',                                   // App Logo,
	brand: 'Start Project',                                        			        // Brand Name
	copyrightText: 'Vuely © 2019 All Rights Reserved.',                     // Copyright Text
	enableUserTour: process.env.NODE_ENV === 'production' ? true : false,   // Enable User Tour
	weatherApiId: 'b1b15e88fa797225412429c1c50c122a1',						// weather API Id
	weatherApiKey: '69b72ed255ce5efad910bd946685883a',						// weather APi key
	authInfo: {
		grant_type: "password",
		client_id: 2,
		client_secret: "kEVTPt2AQsyQf23p8RRYFiknAUO8yyPbNGmmurMJ",
		username: "",
		password: "",
		scope: ""
	},
	userKey: "_currentUser",
	tokenKey: "_currentToken",
	refreshTokenKey: "_refreshToken",
	baseUrl: "http://localhost:8000/"
}
