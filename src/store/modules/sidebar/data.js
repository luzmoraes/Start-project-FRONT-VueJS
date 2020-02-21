// Sidebar Routers
export const menus = {
	'message.menu': [
		{
			action: 'zmdi-view-dashboard',
			title: 'message.dashboard',
			active: false,
			items: null,
			path: '/dashboard',
			exact: true,
			label:'Old'
		}
	],
	'message.users': [
		{
			action: 'zmdi-accounts',
			title: 'message.users',
			active: false,
			label: 'old',
			items: [
				{ title: 'message.list', path: '/users', exact: true, label: 'Old', icon: 'zmdi-filter-list' },
				{ title: 'message.add', path: '/users/register', exact: true, label: 'Old', icon: 'zmdi-plus' }
			]
		}
	],
	'message.clients': [
		{
			action: 'zmdi-store',
			title: 'message.clients',
			active: false,
			label: 'old',
			items: [
				{ title: 'message.list', path: '/clients', exact: true, label: 'Old', icon: 'zmdi-filter-list' },
				{ title: 'message.add', path: '/clients/register', exact: true, label: 'Old', icon: 'zmdi-plus' }
			]
		}
	],
	'message.suppliers': [
		{
			action: 'zmdi-truck',
			title: 'message.suppliers',
			active: false,
			label: 'old',
			items: [
				{ title: 'message.list', path: '/suppliers', exact: true, label: 'Old', icon: 'zmdi-filter-list' },
				{ title: 'message.add', path: '/suppliers/register', exact: true, label: 'Old', icon: 'zmdi-plus' }
			]
		}
	]
}
