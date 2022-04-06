<template>
  <div class="admin-note mx-auto my-8 d-flex justify-space-between">
    <v-card-header class="d-flex">
      <span class="note-id bg-white rounded-circle d-inline-block">{{ note.id }}</span>

      <v-divider vertical class="mx-2"></v-divider>

      <v-img
          height="30"
          width="30"
          src="../../assets/logo.png"
          contain
          class="flex-grow-0"
      />

      <v-card-header-text class="mx-3">
        <v-card-title>{{ note.section }}</v-card-title>
      </v-card-header-text>

      <v-divider vertical class="mx-2"></v-divider>

      <v-card-title class="flex-column">
        <span class="align-self-start">{{ note.title }}</span>
        <span class="align-self-start text-caption font-italic">{{ note.created_at }}</span>
      </v-card-title>

    </v-card-header>
    <v-card-actions>
      <v-divider vertical class="mx-1"></v-divider>
      <v-btn
          color="deep-purple-lighten-2"
          icon="mdi-circle-edit-outline"
          @click="editNote(note.id)"
      >
        Редактировать
      </v-btn>
      <v-btn
          color="deep-purple-lighten-2"
          icon="mdi-delete"
          @click="deleteNote(note.id)"
      >
        Удалить
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "AdminNote",
  props: {
    note: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions([
        'DELETE_NOTE'
    ]),
    editNote(id) {
      this.$router.push({
        name: 'note-edit',
        query: {
          id: id
        }
      })
    },
    deleteNote(id) {
      this.DELETE_NOTE(id)
    }
  }
}
</script>

<style scoped>
.admin-note {
  font-size: 0.8rem;
  max-width: 1200px;
  background-color: #3e3e3e;
  border-radius: 20px;
}
.note-id {
  width: 20px;
  height: 20px;
  background-color: grey;
  text-align: center;
  line-height: 20px;
  font-weight: 600;
}
</style>
