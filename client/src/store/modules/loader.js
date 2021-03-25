const state = {
  loading: false,
  requestsPending: 0
}

const getters = {
  loading: (state) => state.loading
}

const actions = {
  show ({ commit }) {
    commit('show')
  },
  hide ({ commit }) {
    commit('hide')
  },
  pending ({ commit }) {
    commit('pending')
  },
  done ({ commit }) {
    commit('done')
  }
}

const mutations = {
  show (state) {
    state.loading = true
  },
  hide (state) {
    setTimeout(() => {
      state.loading = false
    }, 1000)
  },
  pending (state) {
    if (state.requestsPending === 0) {
      this.commit('show')
    }

    state.requestsPending++
  },
  done (state) {
    if (state.requestsPending >= 1) {
      state.requestsPending--
    }

    if (state.requestsPending <= 0) {
      this.commit('hide')
    }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
