import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Lists from '@/components/Lists'
import MemberList from '@/components/MemberList'
import MemberDetail from '@/components/MemberDetail'
import Messages from '@/components/Messages'
import Errors from '@/components/errors/Errors'
import NotFound from '@/components/errors/NotFound'
import ServerError from '@/components/errors/ServerError'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/members',
    name: 'MemberList',
    component: MemberList,
    beforeRouteEnter: (to, from, next) => {
      const loggedIn = store.getters['account/loggedIn']
      if (loggedIn) {
        next()
      } else {
        next(vm => {
          console.log(vm)
        })
      }
    }
  },
  {
    path: '/members/:id',
    name: 'MemberDetail',
    component: MemberDetail
  },
  {
    path: '/lists',
    name: 'Lists',
    component: Lists
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/errors',
    name: 'Errors',
    component: Errors
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/server-error',
    name: 'ServerError',
    component: ServerError
  },
  {
    path: '*',
    redirect: '/not-found'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
