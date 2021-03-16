import Vue from 'vue'
import router from '@/router'
import axios from 'axios'

const httpClient = axios.create({
  baseURL: 'https://localhost:5001/api/', // process.env.VUE_APP_BASE_URL,
  timeout: 1000, // indicates, 1000ms ie. 1 second
  headers: {
    'Content-Type': 'application/json'
    // anything you want to add to the headers
  }
})

const getAuthToken = () => localStorage.getItem('token')

const authInterceptor = (config) => {
  config.headers.Authorization = getAuthToken()
  return config
}

httpClient.interceptors.request.use(authInterceptor)

// interceptor to catch errors
const errorInterceptor = error => {
  // check if it's a server error
  if (!error.response) {
    this.$notify.warn('Network/Server error')
    return Promise.reject(error)
  }
  // console.log(error.response)
  // all the error responses
  switch (error.response.status) {
    case 400:
      if (error.response.data.errors) {
        const modalStateErrors = []
        for (const key in error.response.data.errors) {
          if (error.response.data.errors[key]) {
            modalStateErrors.push(error.response.data.errors[key])
          }
        }
        return Promise.reject(modalStateErrors.flat())
      } else {
        Vue.notify({ group: 'auth', type: 'error', title: error.response.status, text: 'Bad Request' })
      }
      break

    case 401:
      Vue.notify({ group: 'auth', type: 'error', title: error.response.status, text: 'Unauthorized' })
      break

    case 404:
      router.push('/not-found')
      break

    case 500:
      router.push({ name: 'ServerError', params: { error: error.response.data } })
      break

    default:
      Vue.notify({
        group: 'auth',
        type: 'error',
        text: 'Something unexepted went wrong!'
      })
      break
  }
  return Promise.reject(error)
}

// Interceptor for responses
const responseInterceptor = response => {
  switch (response.status) {
    case 200:
      // yay!
      break
    // any other cases
    default:
    // default case
  }

  return response
}

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor)

export default httpClient
