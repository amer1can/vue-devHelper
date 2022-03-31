<template>
  <div class="text-center">
    <h1>{{ user.name }}'s dashboard</h1>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "UserDashboard",
  computed: {
    ...mapState([
        'user'
    ])
  }
}
</script>

<style scoped>

</style>
