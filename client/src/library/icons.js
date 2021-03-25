import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faSpinner, faHeart, faEnvelope } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faSpinner, faHeart, faEnvelope)

Vue.component('fa-icon', FontAwesomeIcon)
