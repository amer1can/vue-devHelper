<template>
  <div class="text-center">
    <h1>Избранное</h1>
    <div v-if="userFavoritesList">
      <NoteCard
          v-for="note in userFavoritesList"
          :key="note.id"
          :note="note"
          :markFavorite=true
          :markLike="userLikesIndexes ? userLikesIndexes.includes((note.id).toString()) : false"
      />
    </div>
    <div v-else>
      <div>Ничего не добавлено</div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import NoteCard from "@/components/NoteCard";

export default {
  name: "UserFavorites",
  components: {
    NoteCard
  },
  computed: {
    ...mapGetters([
        "userFavoritesList",
        "userLikesIndexes"
    ]),
  }
}
</script>

<style scoped>

</style>
