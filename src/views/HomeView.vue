<template>
  <div>
    <h1 class="text-center">Главная</h1>
    <div class="notes-wrapper" v-if="notes">
      <NoteCard v-for="note in notes"
                :key="note.id"
                :note="note"
                :markFavorite="userFavoritesIndexes ? userFavoritesIndexes.includes((note.id).toString()) : false"
                :markLike="userLikesIndexes ? userLikesIndexes.includes((note.id).toString()) : false"
      />
    </div>
    <div v-else><h1 class="text-center">Статей нет</h1></div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import NoteCard from "@/components/NoteCard";

export default {
  name: "HomeView",
  components: {
    NoteCard
  },
  layout: "default",
  computed: {
    ...mapState([
        'notes',
        'user'
      ]),
    ...mapGetters([
        'userLikesIndexes',
        'userFavoritesIndexes'
    ]),
  },
  beforeMount() {

  }
}
</script>

<style>
.notes-wrapper {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
