<template>
  <div class="note-edit mx-auto">
<!--    <h1 class="text-center">{{ this.$route.query.id ? `Редактирование записи #${this.$route.query.id}` : 'Создание новой записи' }}</h1>-->
    <h1 class="text-center">{{ id ? `Редактирование записи #${id}` : 'Создание новой записи' }}</h1>
    <v-form
        ref="form"
        v-model="notValid"
        lazy-validation
    >
      <v-text-field
          v-model="title"
          :counter="100"
          :rules="titleRules"
          label="Заголовок"
          required
      ></v-text-field>

      <v-select
          v-model="select"
          :items="section"
          :rules="[v => !!v || 'Выберите подходящий раздел']"
          label="Раздел"
          required
      ></v-select>

      <v-textarea
          v-model="text"
          :rules="[v => !!v || 'Введите текст']"
          label="Текст"
      >

      </v-textarea>

      <v-text-field
          v-model="tags"
          label="Тэги"
      ></v-text-field>

      <v-btn
          :disabled="!notValid"
          color="success"
          class="mr-4"
          @click="validateAndSubmit"
      >
        {{ id ? 'Изменить' : 'Создать' }}
      </v-btn>

      <v-btn
          сolor="danger"
          class="mr-4"
          @click="cancelEdit"
      >
        Отмена
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "NoteEdit",
  data: () =>({
    notValid: true,
    title: '',
    select: null,
    section: [
        'Frontend',
        'Backend'
    ],
    text: '',
    tags: '',
    titleRules: [
      v => !!v || 'Введите заголовок',
      v => (v && v.length <= 100) || 'Заголовок не больше 100 символов',
    ],
    id: null,
    note: null
  }),
  async mounted() {
    this.id = this.$route.query.id
    if(this.id) {
      this.note = await this.GET_NOTE(this.id) //обязательно async/await чтобы дождаться ответа!
      this.title = this.note.title
      this.text = this.note.text
      this.select = this.note.section
      this.tags = this.note.tags
    }
  },
  methods: {
    ...mapActions([
        'GET_NOTE',
        'CREATE_NOTE',
        'UPDATE_NOTE'
    ]),
    validateAndSubmit() {
      //проверяем все обязательные поля
      this.$refs.form.validate()
        .then(res => {
          //если ответ промиса true => отправляем данные
          if (res.valid) {
            this.notValid = false
            const data = {
              title: this.title,
              section: this.select,
              text: this.text,
              tags: this.tags
            }
            if(!this.id) {
              this.CREATE_NOTE(data)
            } else {
              this.UPDATE_NOTE({data, id: this.id})
            }
          } else {
            //если ответ false => не даем отправить форму
            this.notValid = true
          }
        })
      .catch(err => {
        console.err('catch valid err:', err)
      })
    },
    cancelEdit() {
      this.$router.push('/admin/notes')
    }
  }
}
</script>

<style scoped>

.note-edit {
  max-width: 1200px;
}
</style>
