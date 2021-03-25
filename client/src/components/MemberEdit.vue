<template>
  <div class="row" v-if="member">
    <div class="col-4">
      <h1>Your Profile</h1>
    </div>
    <div class="col-8">
      <div class="alert alert-info" v-if="formDirty">
        <strong>Information:</strong> You have made changes. Any unsaved changes
        will be lost
      </div>
    </div>
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
          <b-button
            form="editForm"
            type="submit"
            :disabled="!formDirty"
            variant="success"
            block
            >Save Changes</b-button
          >
        </div>
      </div>
    </div>
    <div class="col-8">
      <b-tabs content-class="mt-3" active-nav-item-class="active-nav">
        <b-tab :title="'About ' + member.knownAs" active v-if="member">
          <ValidationObserver v-slot="{ dirty }" ref="form">
            <form @submit.prevent="updateMember" id="editForm">
              <ValidationProvider
                name="Introduction"
                rules="required"
                v-slot="{ errors }"
              >
                <b-form-group
                  label="Description"
                  label-for="description"
                  label-size="lg"
                  label-class="font-weight-bold pt-0 pb-0"
                >
                  <b-form-textarea
                    v-model="member.introduction"
                    name="introduction"
                    placeholder="Member Description"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                name="LookingFor"
                rules="required"
                v-slot="{ errors }"
              >
                <b-form-group
                  label="Looking for"
                  label-for="looking-for"
                  label-size="lg"
                  label-class="font-weight-bold pt-0 pb-0"
                >
                  <b-form-textarea
                    v-model="member.lookingFor"
                    name="lookingFor"
                    placeholder="Member LookingFor"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                name="Interests"
                rules="required"
                v-slot="{ errors }"
              >
                <b-form-group
                  label="Interests"
                  label-for="interests"
                  label-size="lg"
                  label-class="font-weight-bold pt-0 pb-0"
                >
                  <b-form-textarea
                    v-model="member.interests"
                    name="interests"
                    placeholder="Member Interests"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
              <b-form-group
                label="Location Details:"
                label-size="lg"
                label-class="font-weight-bold pt-0 pb-0"
                class="mb-2"
              >
              </b-form-group>
              <b-row class="ml-1">
                <b-col align-self="end" sm="0">
                  <label for="city">City:</label>
                </b-col>
                <ValidationProvider
                  name="City"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <b-col>
                    <b-form-input
                      v-model="member.city"
                      name="city"
                      type="text"
                    ></b-form-input>
                  </b-col>
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <b-col align-self="end" sm="0">
                  <label for="city">Country:</label>
                </b-col>
                <ValidationProvider
                  name="Country"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <b-col>
                    <b-form-input
                      v-model="member.country"
                      name="country"
                      type="text"
                    ></b-form-input>
                  </b-col>
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
              </b-row>
            </form>
            <span v-if="dirty"></span>
          </ValidationObserver>
        </b-tab>
        <b-tab title="Edit Photos">
          <p>Photo will go here</p>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  refs: ['form'],
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['GetMember']),
    loadMember () {
      this.GetMember(this.user.username)
    },
    updateMember () {
      this.$store.dispatch('updateMember', this.member)
      this.$notify({ group: 'global', type: 'success', text: 'Profile updated successfully' })
      this.$refs.form.reset(this.member)
    },
    onSubmit () {
      console.log(this.$refs.form.fields)
    },
    confirmLeave () {
      return window.confirm('Do you really want to leave? you have unsaved changes!')
    },

    confirmStayInDirtyForm () {
      return this.formDirty && !this.confirmLeave()
    },

    beforeWindowUnload (e) {
      if (this.formDirty) {
        // Cancel the event
        e.preventDefault()
        // Chrome requires returnValue to be set
        e.returnValue = ''
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    member () {
      return this.$store.getters.member
    },
    formDirty () {
      return this.$refs.form && this.$refs.form.flags.dirty
    }
  },
  beforeRouteLeave (to, from, next) {
    // If the form is dirty and the user did not confirm leave,
    // prevent losing unsaved changes by canceling navigation
    if (this.confirmStayInDirtyForm()) {
      next(false)
    } else {
      // Navigate to next view
      next()
    }
  },
  created () {
    this.loadMember()
    window.addEventListener('beforeunload', this.beforeWindowUnload)
  },
  beforeDestroy () {
    window.removeEventListener('beforeunload', this.beforeWindowUnload)
  }
}
</script>
