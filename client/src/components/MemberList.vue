  <template>
  <div class="row">
    <div class="col-2" v-for="member in members" :key="member.id">
      <MemberCard :member="member" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import MemberCard from '@/components/MemberCard'

export default {
  components: {
    MemberCard
  },
  methods: {
    ...mapActions({ loadMembers: 'GetMembers' })
  },
  computed: {
    ...mapGetters({ members: 'members', user: 'user' })
  },
  created: function () {
    // a function to call getmembers action
    this.loadMembers()
  }
}
</script>
