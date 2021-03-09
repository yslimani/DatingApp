import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VeeValidate from 'vee-validate'

import VueResource from 'vue-resource'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueResource)
axios.defaults.baseURL = 'https://localhost:5001/api/'

Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.component('font-awesome-icon', FontAwesomeIcon)

require('@/store/subscriber')

store.dispatch('account/attempt', JSON.parse(localStorage.getItem('user')))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
