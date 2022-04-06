<template>
  <div class="text-center">
    <h1>Управление пользователями</h1>
    <div v-if="usersList" class="mt-2">
      <UserNote
          v-for="user in usersList"
          :key="user.id"
          :user="user"
      />
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import UserNote from "@/components/admin/UserNote";
export default {
  name: "AdminUsers",
  components: {UserNote},
  data: () => ({
    usersList: null
  }),
  async beforeMount(){
    this.usersList = await this.GET_ALL_USERS().then(res => res.data)
    console.log(this.usersList)
  },
  methods: {
    ...mapActions([
        'GET_ALL_USERS'
    ])
  }
}
</script>

<style scoped>

</style>
