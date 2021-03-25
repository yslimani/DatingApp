import httpClient from '../httpClient'

const state = {
  currentUser: {},
  members: [],
  member: {}
}

const getters = {
  loggedIn: (state) => !!state.currentUser,
  user: (state) => state.currentUser,
  members: (state) => state.members,
  member: (state) => state.member
}

const actions = {
  async Register ({ dispatch }, form) {
    await httpClient.post('account/register', form)
    const UserForm = new FormData()
    UserForm.append('username', form.username)
    UserForm.append('password', form.password)
    await dispatch('login', UserForm)
  },

  async login ({ commit }, user) {
    const response = await httpClient.post('account/login/', user)
    await commit('setCurrentUser', response.data)
  },

  // async CreatePost ({ dispatch }, post) {
  //   await httpClient.post('post', post)
  //   return await dispatch('GetPosts')
  // },

  async GetMembers ({ commit, state }) {
    if (state.members.length === 0) {
      const response = await httpClient.get('users')
      commit('setMembers', response.data)
    }
  },

  async GetMember ({ commit, state }, username) {
    const member = state.members.find(x => x.username === username)
    if (member !== undefined) {
      commit('setMember', member)
      return
    }
    const response = await httpClient.get('users/' + username)
    commit('setMember', response.data)
  },

  async updateMember ({ commit }, member) {
    await httpClient.put('users', member)
    commit('setMember', member)
  },

  async logout ({ commit }) {
    const user = null
    commit('logout', user)
  }
}

const mutations = {
  setCurrentUser (state, user) {
    state.currentUser = user
  },

  setMembers (state, members) {
    state.members = members
  },

  setMember (state, member) {
    // const index = state.members.indexOf(member)
    // state.members[index] = member
    state.member = member
  },

  logout (state, user) {
    state.currentUser = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
