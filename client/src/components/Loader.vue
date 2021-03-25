<template>
  <div class="card vld-parent mb-3">
    <loading
      :active.sync="isLoading"
      :can-cancel="canCancel"
      :is-full-page="fullPage"
      :height="height"
      :width="width"
      :color="color"
      :loader="loader"
      :background-color="bgColor"
    >
      <h3 v-if="useSlot">Loading ...</h3>
    </loading>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  props: {
    isLoading: Boolean
  },
  data () {
    return {
      fullPage: true,
      canCancel: false,
      useSlot: false,
      loader: 'dots',
      color: '#ff9564',
      bgColor: '#ffffff',
      height: 64,
      width: 64,
      timeout: 10000 // ms
    }
  },
  components: {
    Loading
  }
}
</script>
