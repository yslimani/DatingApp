<template>
  <div class="card mb-4">
    <div class="card-img-wrapper">
      <img
        :src="member.photoUrl || './assets/user.png'"
        :alt="member.knownAs"
        class="card-img-top"
      />
      <ul class="list-inline member-icons animate text-center">
        <li class="list-inline-item">
          <!-- <button
            class="btn btn-primary"
            :to="{ name: 'MemberDetail', params: { username: 'lisa' } }"
          >
            <fa-icon :icon="['fa', 'user']" />
          </button> -->
          <b-button
            variant="primary"
            :to="{
              name: 'MemberDetail',
              params: { username: member.username },
            }"
            ><fa-icon :icon="['fa', 'user']"
          /></b-button>
        </li>
        <li class="list-inline-item">
          <b-button variant="primary"
            ><fa-icon :icon="['fa', 'heart']"
          /></b-button>
        </li>
        <li class="list-inline-item">
          <b-button variant="primary"
            ><fa-icon :icon="['fa', 'envelope']"
          /></b-button>
        </li>
      </ul>
    </div>
    <div class="card-body p-1">
      <h6 class="card-title text-center mb-1">
        <fa-icon :icon="['fas', 'user']" class="mr-2" />{{ member.knownAs }}
      </h6>
      <p class="card-text text-muted text-center">{{ member.city }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    member: Object
  }
}
</script>
<style scoped>
.card:hover img {
  transform: scale(1.2, 1.2);
  transition-duration: 500ms;
  transition-timing-function: ease-out;
  opacity: 0.7;
}

.card img {
  transform: scale(1, 1);
  transition-duration: 500ms;
  transition-timing-function: ease-out;
}

.card-img-wrapper {
  overflow: hidden;
  position: relative;
}

.member-icons {
  position: absolute;
  bottom: -30%;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
  opacity: 0;
}

.card-img-wrapper:hover .member-icons {
  bottom: 0;
  opacity: 1;
}

.animate {
  transition: all 0.3s ease-in-out;
}
</style>
