import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('Views/login/Login');
const ForgotPassword = () => import('Views/login/ForgotPassword');
const Dashboard = () => import('Views/dashboard/Dashboard')

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Login,
			meta: {
				title: 'message.login',
				breadcrumb: null
			}
		},
		{
			path: '/forgot-password',
			component: ForgotPassword,
			meta: {
				title: 'message.forgotPassword',
				breadcrumb: null
			}
		},
		{
			path: '/dashboard',
			component: Dashboard,
			meta: {
				requiresAuth: true,
				title: 'message.ecommerce',
				breadcrumb: null
			}
		},
		{ 
			path: '*',
			redirect: '/'
		}
	]
})
