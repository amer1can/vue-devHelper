<template>
  <v-card
      :loading="loading"
      class="mx-5 my-8"
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
    </v-card-header>



    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>{{ showShortTitle }}</v-card-title>
    <v-card-text class="text-left">
      <div>{{ showShortText }}</div>
<!--      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>-->
    </v-card-text>

    <v-card-actions>
      <v-btn
          size="x-small"
          color="orange-lighten-2"
          variant="text"
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

    <v-card-actions class="justify-end">
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
export default {
  name: "NoteCard",
  props: {
    note: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    loading: false,
    showTags: false
  }),
  computed: {
    showShortTitle() {
      return this.note.title.length > 50 ? this.note.title.slice(0, 50) + '...' : this.note.title
    },
    showShortText() {
      return this.note.text.slice(0, 200) + '...'
    }
  },
  methods: {
    read () {
      // console.log(this.note.text.slice(0, 10))
    },
  },
}
</script>

<style scoped>

</style>
