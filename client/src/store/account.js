import axios from 'axios'

export default ({
  namespaced: true,
  state: {
    currentUser: null
  },
  getters: {
    loggedIn (state) {
      return !!state.currentUser
    }
  },
  mutations: {
    setCurrentUser (state, user) {
      state.currentUser = user
    }
  },
  actions: {
    async login ({ dispatch }, model) {
      const response = await axios.post('account/login/', model)
      dispatch('attempt', response.data)
    },
    async register ({ dispatch }, model) {
      const response = await axios.post('account/register/', model)
      dispatch('attempt', response.data)
    },
    attempt ({ commit }, user) {
      commit('setCurrentUser', user)
    },
    logout ({ commit }) {
      commit('setCurrentUser', null)
    }
  },
  modules: {
  }
})
