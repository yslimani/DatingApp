<template>
  <div>
    <b-form @submit.prevent="register" auto-completion="off">
      <b-form-group>
        <b-form-input
          v-model="model.username"
          type="text"
          placeholder="Username"
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input
          id="input-2"
          type="password"
          v-model="model.password"
          placeholder="Password"
        ></b-form-input>
      </b-form-group>

    <div class="text-center mt-2">
      <b-button-group>
        <b-button type="submit" variant="success" class="mr-2 text-center">Register</b-button>
        <b-button variant="light" @click="cancel" class="text-center">Cancel</b-button>
      </b-button-group>
    </div>
  </b-form>
  <b-card class="mt-3" header="Form Data Result">
    <pre class="m-0">{{ model }}</pre>
  </b-card>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {},
  data () {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({ handleRegister: 'account/register' }),
    register () {
      this.handleRegister(this.model).then(() => {
        this.cancel()
      }).catch(error => {
        console.log(error.response.data)
      })
    },
    cancel () {
      this.$emit('cancelRegister', false)
    }
  }
}
</script>
