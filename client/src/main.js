import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './library/icons.js'
import './library/lingallery.js'
import VueCase from 'vue-case'
import VueSwal from 'vue-swal'

import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm'
import { ValidationObserver } from 'vee-validate'
import { ReactiveRefs } from 'vue-reactive-refs'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../node_modules/bootswatch/dist/united/bootstrap.min.css'

import Notifications from 'vue-notification'
import velocity from 'velocity-animate'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueCase)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.use(ReactiveRefs)

axios.defaults.baseURL = 'https://localhost:5001/api/'

Vue.config.productionTip = false

Vue.use(Notifications, { velocity })
Vue.use(VueSwal)

require('@/store/subscriber')

store.commit('setCurrentUser', JSON.parse(localStorage.getItem('user')))

new Vue({
  router,
  store,
  components: {
    Notifications
  },
  render: h => h(App)
}).$mount('#app')
