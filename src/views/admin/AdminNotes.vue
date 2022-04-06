<template>
  <div class="admin-notes mx-auto">
    <h1 class="text-center">Управление записями</h1>
    <v-btn
        color="deep-purple-lighten-2"
        text
        @click="createNote"
    >
      Создать запись
    </v-btn>
    <NotesList
        v-if="notes"
        :notes="notes"
    />
  </div>
</template>

<script>
import NotesList from "@/components/admin/NotesList";
import {mapActions, mapState} from 'vuex'
export default {
  name: "AdminNotes",
  data: () => ({
    // notes: null
  }),
  components: {NotesList},
  computed: {
    ...mapState([
        'notes'
    ])
  },
  async beforeMount() {
    // await this.GET_ALL_NOTES()
    //   .then(res => this.notes = res.data)
  },
  methods: {
    ...mapActions([
        'GET_ALL_NOTES'
    ]),
    createNote() {
      this.$router.push('/admin/note/create')
    }
  }
}
</script>

<style scoped>
.admin-notes {
  max-width: 1200px;
}
</style>
