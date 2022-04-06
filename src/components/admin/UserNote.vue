<template>
  <div class="admin-users mx-auto my-8 d-flex justify-space-between">
    <v-card-header class="d-flex">
      <span class="px-2 bg-white rounded-circle d-inline-block">{{ user.id }}</span>

      <v-divider vertical class="mx-2"></v-divider>

      <v-card-header-text class="mx-3">
        <v-card-title>{{ user.name }}</v-card-title>
      </v-card-header-text>

      <v-divider vertical class="mx-2"></v-divider>

      <v-card-title>
        <span class="align-self-start">{{ user.email }}</span>
      </v-card-title>

    </v-card-header>
    <v-card-actions>
      <v-divider vertical class="mx-1"></v-divider>
      <v-btn
          color="deep-purple-lighten-2"
          icon="mdi-circle-edit-outline"
          @click="editUser(user.id)"
      >
        Редактировать
      </v-btn>
      <v-btn
          color="deep-purple-lighten-2"
          icon="mdi-delete"
          @click="deleteUser(user.id)"
      >
        Удалить
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "UserNote",
  props: {
    user: {
      type: Object,
      default: () => {},
    }
  },
  methods: {
    editUser(id) {
      console.log('edit: ', id)
    },
    deleteUser(id) {
      console.log('delete: ', id)
    }
  },
}
</script>

<style scoped>
.admin-users {
  max-width: 1200px;
  border: 1px solid grey;
  border-radius: 20px;
  background-color: #262626;
}
</style>
