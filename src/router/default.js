import Full from 'Container/Full'

// dashboard components
const Dashboard = () => import('Views/dashboard/dashboard');

// users views
const UserProfile = () => import('Views/users/UserProfile');
const UsersList = () => import('Views/users/UsersList');

export default {
   path: '/',
   component: Full,
   redirect: '/dashboard',
   children: [
      {
         path: '/dashboard',
         component: Dashboard,
         meta: {
            requiresAuth: true,
            title: 'message.dashboard',
            breadcrumb: null
         }
      },
      // users
      {
         path: '/users/user-profile',
         component: UserProfile,
         meta: {
            requiresAuth: true,
            title: 'message.userProfile',
            breadcrumb:  [
              {
                breadcrumbInactive: 'Usuários /'
              },
              {
                breadcrumbActive: 'Minha Conta',
              }
            ]
         }
      },
      {
         path: '/users',
         component: UsersList,
         meta: {
            requiresAuth: true,
            title: 'message.usersList',
            breadcrumb: [
              {
                breadcrumbInactive: 'Usuários /'
              },
              {
                breadcrumbActive: 'Lista de Usuários'
              }
            ]
         }
      }
   ]
}
