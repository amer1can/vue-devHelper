<template>
  <div>
    <h1 class="text-center">Home</h1>
    <div class="notes-wrapper" v-if="notes">
      <NoteCard v-for="note in notes"
                :key="note.id"
                :note="note"
                :markFavorite="userFavorites ? userFavorites.includes((note.id).toString()) : false"
                :markLike="userLikes ? userLikes.includes((note.id).toString()) : false"
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
        'notes',
        'user'
      ]),
    userFavorites() {
      if(this.user.favorites === null) { return false }
      else {
        return this.user.favorites.toString().split(',')
      }
    },
    userLikes() {
      if(this.user.likes === null) return false
      else {
        return this.user.likes.toString().split(',')
      }
    },
  },
  mounted() {
    // console.log(this.userFavorites.includes('1'))
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
