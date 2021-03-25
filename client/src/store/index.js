import Vue from 'vue'
import Vuex from 'vuex'
// import account from './modules/account'
import auth from './modules/auth'
import loader from './modules/loader'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // account,
    auth,
    loader
  }
})
