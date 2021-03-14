import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueCase from 'vue-case'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../node_modules/bootswatch/dist/united/bootstrap.min.css'

import VeeValidate from 'vee-validate'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'

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

Vue.use(VueCase)

axios.defaults.baseURL = 'https://localhost:5001/api/'

Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.use(Notifications, { velocity })

Vue.component('font-awesome-icon', FontAwesomeIcon)

require('@/store/subscriber')

store.dispatch('account/attempt', JSON.parse(localStorage.getItem('user')))

new Vue({
  router,
  store,
  components: {
    Notifications
  },
  render: h => h(App)
}).$mount('#app')
