import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '@/components/Users'
import RegisterView from '@/components/Register'
import LoginView from '@/components/LoginView'
import ForgotView from '@/components/Forgot'
import RecoverView from '@/components/Recover'
import SettingsView from '@/components/Settings'
import NotificationsView from '@/components/Notifications'
import MessengerView from '@/components/Messenger'
import SearchView from '@/components/Search'
import UserProfile from '@/components/UserProfile'
import DiscoverView from '@/components/Discover'
import NotFound from '@/components/NotFound'

const routes = [
  {
    path: '/',
    name: 'Users',
    component: UsersView
  },
  {
    path: '/register',
    name: '',
    component: RegisterView
  },
  {
    path: '/login',
    name: '',
    component: LoginView
  },
  {
    path: '/forgot',
    name: '',
    component: ForgotView
  },
  {
    path: '/recover',
    name: '',
    component: RecoverView
  },
  {
    path: '/settings',
    name: '',
    component: SettingsView
  },
  {
    path: '/notifications',
    name: '',
    component: NotificationsView
  },
  {
    path: '/chat',
    name: '',
    component: MessengerView
  },
  {
    path: '/search',
    name: '',
    component: SearchView,
    props: route => ({
      data: {
        gender: route.query.gender,
        location: route.query.location,
        min: route.query.min,
        max: route.query.max
      }
    })
  },
  {
    name: 'userprofile',
    path: '/user/:id',
    component: UserProfile
  },
  {
    name: 'discover',
    path: '/discover',
    component: DiscoverView
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
