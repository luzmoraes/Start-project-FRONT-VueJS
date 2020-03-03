import Vue from 'vue'
import Router from 'vue-router'

//routes
import defaultRoutes from './default';

// authentication components
const SignUpOne = () => import('Views/authentication/SignUpOne');
const LoginOne = () => import('Views/authentication/LoginOne');
const LockScreen = () => import('Views/authentication/LockScreen');
const ForgotPassword = () => import('Views/authentication/ForgotPassword');
const ResetPassword = () => import('Views/authentication/ResetPassword');

// const Auth0CallBack = () => import('Components/Auth0Callback/Auth0Callback');

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		defaultRoutes,
		{
			path: '/authentication/sign-up',
			component: SignUpOne,
			meta: {
				title: 'message.signUp',
				breadcrumb: null
			}
		},
		{
			path: '/authentication/login',
			component: LoginOne,
			meta: {
				title: 'message.login',
				breadcrumb: null
			}
		},
		{
			path: '/authentication/lock-screen',
			component: LockScreen,
			meta: {
				title: 'Lock Screen',
				breadcrumb: null
			}
		},
		{
			path: '/authentication/forgot-password',
			component: ForgotPassword,
			meta: {
				title: 'message.forgotPassword',
				breadcrumb: null
			}
		},
		{
			path: '/authentication/reset-password/:token',
			component: ResetPassword,
			meta: {
				title: 'message.resetPassword',
				breadcrumb: null
			}
		}
	]
})
