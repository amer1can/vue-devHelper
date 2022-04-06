<template>
  <v-snackbar
      v-model="snackbar"
      color="blue-grey"
      bottom
      right
  >{{ snackbarText }}
    <template v-slot:actions>
      <v-btn
          color="indigo"
          variant="text"
          @click="snackbar = false"
      >
        Закрыть
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "AppSnackbar",
  // props: {
  //   snack: {
  //     type: Boolean,
  //     default: () => false
  //   },
  //   snackText: {
  //     type: String,
  //     default: () => ''
  //   }
  // },
  data: () => ({
    snackbar: false,
    snackbarText: ''
  }),
  methods: {
    show(data) {
      this.snackbarText = data.text || 'none text'
      this.snackbar = true
    }
  }
}
</script>

<style scoped>

</style>
