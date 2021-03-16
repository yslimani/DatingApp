import axios from 'axios'

// const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: 'https://localhost:5001/api/'// process.env.VUE_APP_URL_API,
  // headers: {
  //     Authorization: `Bearer ${token}`
  // }
})

axiosInstance.interceptors.response.use(response => {
  console.log(response)
  // Any status code within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, error => {
  console.log(error)
  // Any status codes outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

// Add a request interceptor
// let loader
axiosInstance.interceptors.request.use(request => {
  // Showing Vue loader before every request
  // loader =
  this.$loading.show({
    // Optional parameters
    container: this.fullPage ? null : this.$refs.formContainer,
    canCancel: false,
    onCancel: this.onCancel
  })

  // const token = localStorage.getItem("token");
  // if (token) {
  //   config.headers.common["AUTHORIZER"] = token; // set Auth token
  // }
  console.log(request)
  return request
}, error => {
  console.log(error)
  // Any status codes outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default axiosInstance
