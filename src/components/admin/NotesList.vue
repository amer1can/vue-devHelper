<template>
  <div v-if="notes" class="mx-auto">
    <AdminNote
        v-for="note in notes"
        :key="note.id"
        :note="note"
    />
  </div>
</template>

<script>
import AdminNote from "@/components/admin/AdminNote";

export default {
  name: "NotesList",
  components: {AdminNote},
  props : {
    notes: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style scoped>

</style>
