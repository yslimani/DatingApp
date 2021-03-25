import store from '@/store'

store.subscribe((mutation) => {
  switch (mutation.type) {
    case 'setCurrentUser':
      if (mutation.payload) {
        // console.log(mutation.payload)
        localStorage.setItem('user', JSON.stringify(mutation.payload))
      } else {
        localStorage.removeItem('user')
      }
      break
  }
})
