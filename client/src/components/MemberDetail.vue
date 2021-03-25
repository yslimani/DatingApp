<template>
  <div class="row" v-if="member">
    <div class="col-4">
      <div class="card">
        <img
          :src="member.photoUrl || './assets/user.png'"
          :alt="member.knownAs"
          class="card-img-top img-thumbnail"
        />
        <div class="card-body">
          <div>
            <strong>Location:</strong>
            <p>{{ member.city }}, {{ member.country }}</p>
          </div>
          <div>
            <strong>Age:</strong>
            <p>{{ member.age }}</p>
          </div>
          <div>
            <strong>Last Active:</strong>
            <p>{{ member.lastActive }}</p>
          </div>
          <div>
            <strong>Member since:</strong>
            <p>{{ member.created }}</p>
          </div>
        </div>
        <div class="card-footer">
          <div class="btn-group d-flex">
            <b-button variant="primary">Like</b-button>
            <b-button variant="success">Message</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-8">
      <b-tabs content-class="mt-3" active-nav-item-class="active-nav">
        <b-tab :title="'About ' + member.knownAs" active>
          <h4>Description</h4>
          <p>{{ member.introduction }}</p>
          <h4>Looking for</h4>
          <p>{{ member.lookingFor }}</p>
        </b-tab>
        <b-tab title="Interests">
          <h4>Interests</h4>
          <p>{{ member.interests }}</p>
        </b-tab>
        <b-tab title="Photos">
          <lingallery
            v-if="member.photos"
            :iid.sync="currentId"
            :width="width"
            :height="height"
            :items="galleryImages"
            style="display: inline-block; margin-bottom: 20px"
          />
        </b-tab>
        <b-tab title="Gallery"> </b-tab>
        <b-tab title="Messages" disabled><p>Messages will go here</p></b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
// import { mapActions } from 'vuex'
// import Lingallery from 'lingallery'

export default {
  components: {
    // Lingallery
  },
  data () {
    return {
      width: 500,
      height: 500,
      currentId: null,
      items: [{
        src: 'https://picsum.photos/600/400/?image=0',
        thumbnail: 'https://picsum.photos/64/64/?image=0'
      },
      {
        src: 'https://picsum.photos/600/400/?image=10',
        thumbnail: 'https://picsum.photos/64/64/?image=10'
      }]
    }
  },
  methods: {
    // ...mapActions(['GetMember']),
    loadMember () {
      this.$store.dispatch('GetMember', this.$route.params.username)
    }
  },
  computed: {
    member () {
      return this.$store.getters.member
    },
    galleryImages () {
      const imageUrls = []
      for (var photo of this.member.photos) {
        imageUrls.push({ id: photo?.id, src: photo?.url, thumbnail: photo?.url })
      }
      return imageUrls
    }
  },
  created () {
    this.loadMember()
  }
}
</script>
<style scoped>
.img-thumbnail {
  margin: 25px;
  width: 85%;
  height: 85%;
}

.card-body {
  padding: 0 25px;
}

.card-footer {
  padding: 10px 15px;
  background-color: #fff;
  border-top: none;
}
</style>
