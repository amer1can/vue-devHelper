<template>
  <div>
    <h1 class="text-center">Home</h1>
    <div class="notes-wrapper" v-if="notes">
      <NoteCard v-for="note in notes"
                :key="note.id"
                :note="note"
      />
    </div>
    <div v-else><h1 class="text-center">No notes found (</h1></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import NoteCard from "@/components/NoteCard";

export default {
  name: "HomeView",
  components: {
    NoteCard
  },
  layout: "default",
  computed: {
    ...mapState([
        'notes'
    ])
  }
}
</script>

<style>
.notes-wrapper {
  margin: 0px auto;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
