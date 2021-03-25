import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import store from '../store'

const httpClient = axios.create({
  baseURL: 'https://localhost:5001/api/', // process.env.VUE_APP_BASE_URL,
  timeout: 1000, // indicates, 1000ms ie. 1 second
  headers: {
    'Content-Type': 'application/json'
    // anything you want to add to the headers
  },
  showLoader: true
})

const getAuthToken = () => JSON.parse(localStorage.getItem('user')).token

const requestInterceptor = (config) => {
  config.headers.Authorization = 'Bearer ' + getAuthToken()
  if (config.showLoader) {
    store.dispatch('pending')
  }
  return config
}

httpClient.interceptors.request.use(requestInterceptor)

// interceptor to catch errors
const errorInterceptor = error => {
  // check if loader is shown
  if (error.config.showLoader) {
    store.dispatch('done')
  }

  // check if it's a server error
  if (!error.response) {
    Vue.notify('Network/Server error')
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
  if (response.config.showLoader) {
    store.dispatch('done')
  }

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
