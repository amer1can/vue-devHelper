<template>
  <v-card
      class="mx-auto my-3"
      max-width="300"
      variant="outlined"
  >
    <v-card-header>
      <v-card-title>Register</v-card-title>
    </v-card-header>

    <v-card-text>
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >
        <v-text-field type="text"
                      name="name"
                      v-model="name"
                      :rules="nameRules"
                      :counter="20"
                      required
                      label="Name" />
        <v-text-field type="text"
                      name="email"
                      v-model="email"
                      :rules="emailRules"
                      required
                      label="Email" />
        <v-text-field name="password"
                      type="password"
                      v-model="password"
                      :rules="passRules"
                      required
                      label="Password" />
        <v-text-field name="confirm-password"
                      v-model="confirmPass"
                      type="password"
                      required
                      label="Confirm password" />
        <v-checkbox label="Register as admin" v-model="is_admin" />
        <v-btn
            rounded
            :disabled="!valid"
            text
            @click.prevent="registerUser"
        >
          Register
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'
import {mapMutations} from 'vuex'

export default {
  name: "UserRegister",
  data: () => ({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
    is_admin: false,
    valid: true,
    nameRules: [
      v => !!v || 'Name is required',
    ],
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+/.test(v) || 'Email must be a valid'
    ],
    passRules: [
      v => !!v || 'Password is required',
    ]
  }),
  methods: {
    ...mapMutations([
      'toggleLogin'
    ]),
    validate () {
      this.$refs.form.validate()
    },
    registerUser() {
      if(this.password === this.confirmPass && this.password.length > 0) {
        let url = '//localhost:3001/register'
        if(this.is_admin === true) url = '//localhost:3001/register-admin'
        axios.post(url, {
          name: this.name,
          email: this.email,
          password: this.password,
          is_admin: this.is_admin,
        })
            .then(response => {
              localStorage.setItem('user', JSON.stringify(response.data.user))
              localStorage.setItem('jwt', response.data.token)
              this.$store.commit('toggleLogin',true)
              this.$store.commit('setUser', response.data.user)

              if(localStorage.getItem('jwt') != null) {
                this.$emit('loggedIn')
                if(this.$route.params.nextUrl != null) {
                  console.log('check this: ',this.$router.push(this.$route.params.nextUrl))
                } else {
                  this.$router.push('/admin')
                }
              }
            })
            .catch(err => {
              this.$store.commit('toggleLogin',false)
              console.error(err)
            })
      } else {
        return alert('Passwords do not match')
      }
    }
  }
}
</script>

<style scoped>

</style>
