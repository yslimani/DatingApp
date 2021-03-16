<template>
  <div class="container">
    <b-button variant="outline-primary" class="mr-3" @click="get500Error"
      >Test 500 Error</b-button
    >
    <b-button variant="outline-primary" class="mr-3" @click="get400Error"
      >Test 400 Error</b-button
    >
    <b-button variant="outline-primary" class="mr-3" @click="get401Error"
      >Test 401 Error</b-button
    >
    <b-button variant="outline-primary" class="mr-3" @click="get404Error"
      >Test 404 Error</b-button
    >
    <b-button
      variant="outline-primary"
      class="mr-3"
      @click="get400ValidationError"
    >
      Test 400 Validation Error
    </b-button>
    <div class="row mt-5" v-if="validationErrors.length > 0">
      <ul class="text-danger">
        <li v-for="(error, index) in validationErrors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import httpClient from '@/store/httpClient'

export default {
  data () {
    return {
      validationErrors: []
    }
  },
  methods: {
    get500Error () {
      httpClient.get('buggy/server-error', { errorHandle: false }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error.response)
      })
    },
    get400Error () {
      httpClient.get('buggy/bad-request').then(response => {
        console.warn(response)
      }).catch(error => {
        console.log(error.response)
      })
    },
    get401Error () {
      httpClient.get('buggy/auth').then(response => {
        console.warn(response)
      }).catch(error => {
        console.log(error.response)
      })
    },
    get404Error () {
      httpClient.get('buggy/not-found').then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error.response)
      })
    },
    get400ValidationError () {
      httpClient.post('account/register', {}).then(response => {
        console.warn(response)
      }).catch(error => {
        // console.log(error.response)
        this.validationErrors = error
      })
    }
  }
}
</script>
