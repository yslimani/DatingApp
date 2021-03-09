<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <div class="container">
      <b-navbar-brand href="#">Dating App</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Matches</b-nav-item>
          <b-nav-item href="#">Lists</b-nav-item>
          <b-nav-item href="#">Messages</b-nav-item>
          <b-nav-item href="#" v-if="loggedIn" @click="logout">Logout</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form v-if="!loggedIn" @submit.prevent="login">
            <b-form-input size="sm" class="mr-sm-2" v-model="model.username" placeholder="Username"></b-form-input>
            <b-form-input size="sm" class="mr-sm-2"  type="password" v-model="model.password" placeholder="Password"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Login</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right v-if="loggedIn">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>Welcome user</em>
            </template>
            <b-dropdown-item href="#">Edit Profile</b-dropdown-item>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      model: {}
    }
  },
  methods: {
    ...mapActions({ handleLogin: 'account/login', handleLogout: 'account/logout' }),
    login () {
      this.handleLogin(this.model)
    },
    logout () {
      this.handleLogout()
    }
  },
  computed: {
    ...mapGetters({ loggedIn: 'account/loggedIn' })
  }
}
</script>

<style>
.dropdown-toggle, .dropdown-item {
  cursor: pointer;
}
</style>
