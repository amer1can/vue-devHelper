<template>
  <v-card
      :loading="loading"
      class="mx-5 my-8 d-flex flex-column"
      width="45%"
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
          @click="toggleFavorites"
          size="x-small"
          :icon="markFavorite ? 'mdi-star-settings' : 'mdi-star-settings-outline'"
      >
      </v-btn>
    </v-card-header>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>{{ showShortTitle }}</v-card-title>
    <v-card-text class="text-left flex-grow-1">
      <div>{{ showShortText }}</div>
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

      </div>
      <v-btn
          color="deep-purple-lighten-2"
          text
          @click="read"
      >
        Read next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "NoteCard",
  props: {
    note: {
      type: Object,
      default: () => {}
    },
    markFavorite: {
      type: Boolean,
      default: () => false
    },
    markLike: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    loading: false,
    showTags: false,
  }),
  computed: {
    showShortTitle() {
      return this.note.title.length > 50 ? this.note.title.slice(0, 50) + '...' : this.note.title
    },
    showShortText() {
      return this.note.text.slice(0, 200) + '...'
    },
  },
  mounted() {
  },
  methods: {
    ...mapActions([
        'INC_VIEWS',
        'ADD_TO_FAVORITES',
        'REMOVE_FROM_FAVORITES',
        'ADD_LIKE',
        'REMOVE_LIKE'
    ]),
    read() {
      this.INC_VIEWS(this.note.id)
      this.$router.push({
        name: 'note',
        query: {
          id: this.note.id
        }
      })
    },
    toggleFavorites() {
      if(!this.markFavorite) {
        this.ADD_TO_FAVORITES(this.note.id)
        console.log('toggle add_to')
      } else {
        this.REMOVE_FROM_FAVORITES(this.note.id)
        console.log('toggle remove_to')
      }
    },
    toggleLikes() {
      if(!this.markLike) {
        this.ADD_LIKE(this.note.id)
        console.log('add_like')
      } else {
        this.REMOVE_LIKE(this.note.id)
        console.log('remove_like')
      }
    }
  },
}
</script>

<style scoped>

</style>
