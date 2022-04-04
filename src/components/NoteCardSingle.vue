<template>
  <v-card
      v-if="note"
      class="mx-auto my-8 d-flex flex-column"
      max-width="1200px"
  >
    <v-card-header>
      <v-img
          height="50"
          width="50"
          src="../assets/logo.png"
          contain
          class="flex-grow-0"
      ></v-img>
      <v-card-header-text class="mx-3">
        <v-card-title>{{ note.section }}</v-card-title>
      </v-card-header-text>
      <v-btn
          color="deep-purple-lighten-2"
          text
          @click="back"
      >
        Back
      </v-btn>
    </v-card-header>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>{{ note.title }}</v-card-title>
    <v-card-text class="text-left flex-grow-1">
      <div>{{ note.text }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
          size="x-small"
          color="orange-lighten-2"
          variant="text"
          @click="showTags = !showTags"
      >
        Show tags
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
          size="x-small"
          :icon="showTags ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="showTags = !showTags"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showTags" class="mx-4">
        <v-chip size="x-small" class="my-1 mx-1">Vue</v-chip>
        <v-chip size="x-small" class="my-1 mx-1">Vuex</v-chip>
        <v-chip size="x-small" class="my-1 mx-1">Vue-router</v-chip>
        <v-chip size="x-small" class="my-1 mx-1">Node JS</v-chip>
      </div>
    </v-expand-transition>

    <v-divider class="my-3 mx-4" ></v-divider>

    <v-card-actions class="justify-space-between">
      <div class="mx-2">
        <div class="likes d-inline">
          <span class="text-body-2 mx-1">{{ note.likes }}</span>
          <v-btn
              size="x-small"
              icon="mdi-heart"
              :color="markLike ? 'red' : 'white'"
              @click="toggleLikes"
          ></v-btn>
        </div>
        <div class="views d-inline">
          <span class="text-body-2 mx-1">{{ note.views }}</span>
          <v-icon
              size="x-small"
              icon="mdi-eye"
              color="primary"
              class="mx-2"
          ></v-icon>
        </div>
        <v-btn
            @click="toggleFavorites"
            size="x-small"
            :icon="markFavorite ? 'mdi-star-settings' : 'mdi-star-settings-outline'"
        >
        </v-btn>
      </div>

    </v-card-actions>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "NoteCArdSingle",
  data: () => ({
    markFavorite: false,
    markLike: false,
    showTags: false,
  }),
  mounted() {
    console.log(this.$route.query.id)
  },
  computed: {
    ...mapState([
        'notes'
    ]),
    note() {
      return this.notes.find(note => note.id == this.$route.query.id)
    }
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    toggleFavorites() {
      console.log('toggle favorites')
    },
    toggleLikes() {
      console.log('toggle likes')
    }
  }
}
</script>

<style scoped>

</style>
