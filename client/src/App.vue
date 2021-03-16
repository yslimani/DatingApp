<template>
  <div id="app">
    <navbar />
    <router-view/>
    <notifications group="auth"
                   position="bottom right"
                   animation-type="velocity"
                   :speed="500" />
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
// import axios from 'axios'
export default {
  components: {
    Navbar
  },
  created () {
    // let loader
    // axios.interceptors.request.use(request => {
    //   loader = this.$loading.show({
    //     container: this.fullPage ? null : this.$refs.formContainer,
    //     canCancel: false,
    //     onCancel: this.onCancel
    //   })
    //   // console.log(request)
    //   return request
    // }, error => {
    //   // console.log(error)
    //   // Any status codes outside the range of 2xx cause this function to trigger
    //   // Do something with response error
    //   return Promise.reject(error)
    // })

    // // Add a response interceptor
    // axios.interceptors.response.use(response => {
    //   // Do something with response data
    //   loader.hide() // hiding loader on when receive response
    //   return response
    // }, error => {
    //   // check for errorHandle config
    //   console.log(error.response)
    //   if (Object.prototype.hasOwnProperty.call(error.response.config, 'errorHandle') && error.response.config.errorHandle === false) {
    //     loader.hide() // hiding loader on error
    //     return Promise.reject(error)
    //   }
    //   console.log(error.response.status)
    //   if (error.response.status) {
    //     loader.hide() // hiding loader on error
    //     switch (error.response.status) {
    //       case '500': console.log(400); break
    //     }
    //   }
    // })
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

/* #nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
