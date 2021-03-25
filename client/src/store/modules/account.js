import httpClient from '../httpClient'

const getters = {
  loggedIn: (state) => !!state.currentUser,
  user: (state) => state.currentUser,
  token: (state) => state.currentUser.token
}

export default ({
  namespaced: true,
  state: {
    currentUser: null
  },
  getters,
  // getters: {
  //   loggedIn (state) {
  //     return !!state.currentUser
  //   },
  //   user (state) {
  //     return state.currentUser
  //   },
  //   token (state) {
  //     return state.currentUser.token
  //   },
  //   isAuthenticated: (state) => !!state.currentUser
  // },
  mutations: {
    setCurrentUser (state, user) {
      state.currentUser = user
    }
  },
  actions: {
    async login ({ dispatch }, model) {
      const response = await httpClient.post('account/login/', model)
      dispatch('attempt', response.data)
    },
    async register ({ dispatch }, model) {
      const response = await httpClient.post('account/register/', model)
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
