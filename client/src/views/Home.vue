<template>
  <div class="container mt-5">
    <div class="text-center" v-if="!registerMode">
      <h1>Find your match</h1>
      <p class="lead">Come on in to view your matches...all you need to do is sign up</p>
      <div class="text-center">
        <b-button size="lg" variant="primary" class="mr-2" @click="registerToggle">Register</b-button>
        <b-button size="lg" variant="info">Learn More</b-button>
      </div>
    </div>
    <div class="container" v-else>
      <div class="row justify-content-center">
        <div class="col-4">
          <register @cancelRegister="cancelRegisterMode($event)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Register from '@/components/Register'

export default {
  name: 'Home',
  components: {
    Register
  },
  data () {
    return {
      title: 'The Dating App',
      registerMode: false
    }
  },
  methods: {
    registerToggle () {
      this.registerMode = !this.registerMode
    },
    cancelRegisterMode (bool) {
      this.registerMode = bool
    }
  },
  created () {}
}
</script>
