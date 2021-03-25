<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary" class="mb-4">
      <div class="container">
        <b-navbar-brand to="/">Dating App</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <template v-if="loggedIn">
              <b-nav-item to="/members" active-class="active"
                >Matches</b-nav-item
              >
              <b-nav-item to="/lists" active-class="active">Lists</b-nav-item>
              <b-nav-item to="/messages" active-class="active"
                >Messages</b-nav-item
              >
            </template>
            <b-nav-item to="/errors" active-class="active">Errors</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form v-if="!loggedIn" @submit.prevent="submit">
              <b-form-input
                size="sm"
                class="mr-sm-2"
                v-model="form.username"
                placeholder="Username"
              ></b-form-input>
              <b-form-input
                size="sm"
                class="mr-sm-2"
                type="password"
                v-model="form.password"
                placeholder="Password"
              ></b-form-input>
              <b-button
                size="sm"
                class="my-2 my-sm-0"
                type="submit"
                variant="success"
                >Login</b-button
              >
            </b-nav-form>

            <b-nav-item-dropdown right v-if="loggedIn">
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>Welcome {{ user.username | titleCase }}</em>
              </template>
              <b-dropdown-item to="/member/edit">Edit Profile</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item href="#" @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {}
    }
  },
  methods: {
    ...mapActions(['login']),
    async submit () {
      // const User = new FormData()
      // User.append('username', this.form.username)
      // User.append('password', this.form.password)

      try {
        await this.login(this.form)
        this.$router.push('/members')
        // this.showError = false
      } catch (error) {
        // this.showError = true
      }

      // this.handleLogin(this.model).then(() => {
      //   this.$router.replace('/members')
      // }).catch(() => { })
      // .catch(error => {
      //   this.$notify({ group: 'auth', title: '<b>Authorization</b>', type: 'error', text: error.response.data })
      // })
    },
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/')
    }
  },
  computed: {
    // ...mapGetters({ loggedIn: 'loggedIn', user: 'auth/user' }),
    loggedIn () {
      return this.$store.getters.loggedIn
    },
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style>
.dropdown-toggle,
.dropdown-item {
  cursor: pointer;
}
</style>
