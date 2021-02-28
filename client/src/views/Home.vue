<template>
  <div class="home">
    <h1>Dating App</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.id }} - {{ user.userName }}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      title: 'The Dating App',
      users: []
    }
  },
  methods: {
    getUsers () {
      this.$http.get('https://localhost:5001/api/users').then(response => {
        this.users = response.body
      }, error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getUsers()
  }
}
</script>
