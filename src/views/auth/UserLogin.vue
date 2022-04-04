<template>
  <v-card
      class="mx-auto my-3"
      max-width="300"
      variant="outlined"
  >
    <v-card-header>
      <v-card-title>Login</v-card-title>
    </v-card-header>

    <v-card-text>
      <v-form>
        <v-text-field type="text"
                      name="email"
                      v-model="email"
                      placeholder="Email"
                      :rules="emailRulesLogin"
                      required
                      @click="error=null" />
        <v-text-field name="password"
                      type="password"
                      v-model="password"
                      :rules="passRulesLogin"
                      required
                      @click="error=null"
                      @keypress.enter="loginUser"
                      placeholder="Password"/>
        <div class="err">
          <label v-if="error" class="err d-block text-red">{{ error }}</label>
        </div>
        <v-btn
            rounded
            text
            @click.prevent="loginUser"
        >
          Login
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapMutations} from 'vuex'
import axios from "axios";

export default {
  name: "UserLogin",
  data: () => ({
    email: '',
    password: '',
    error: null,
    emailRulesLogin: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be a valid'
    ],
    passRulesLogin: [
        v => !!v || 'Password is required',
    ],
  }),
  methods: {
    ...mapMutations([
        'toggleLogin'
    ]),
    loginUser() {
      if(this.password.length > 0) {
        axios.post('//localhost:3001/login', {
          email: this.email,
          password: this.password
        })
            .then(response => {
              const is_admin = response.data.user.is_admin
              localStorage.setItem('user', JSON.stringify(response.data.user))
              localStorage.setItem('jwt', response.data.token)
              this.$store.commit('toggleLogin',true)
              this.$store.commit('setUser', response.data.user)

              if (localStorage.getItem('jwt') != null){
                if(this.$route.params.nextUrl != null){
                  // this.$router.push(this.$route.params.nextUrl)
                }
                else {
                  if(is_admin == 1){
                    this.$router.push('admin')
                  }
                  else {
                    this.$router.push('home')
                  }
                }
              }

            })
            .catch(err => {
              this.$store.commit('toggleLogin',false)
              console.error(err.response)
            })
      }
    }
  }
}
</script>

<style scoped>
.err {
  height: 20px;
}
</style>
