<template>
  <v-app>
    <AppSnackbar ref="snack" />
    <v-app-bar app>
      <v-app-bar-nav-icon
          @click="leftDrawer = !leftDrawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title>
        <router-link to="/" class="mx-2">devHelper</router-link>
        <v-btn
            @click="this.$root.AppSnackbar.show({text: 'saliam!'})"
        >snack</v-btn>
        <v-btn
            @click="this.$toast.show('Hellous')"
        >snack2</v-btn>

      </v-app-bar-title>

      <router-link v-if="!isLoggedIn" to="/register" class="mx-2">Регистрация</router-link>
      <router-link v-if="!isLoggedIn" to="/login" class="mx-2">Войти</router-link>

      <v-btn icon
             v-if="isLoggedIn"
             @click="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
        app
        v-model="leftDrawer"
    >
      <v-list-item class="flex-column">
          <v-list-item-title class="text-h6 align-self-start">
            Welcome!
          </v-list-item-title>
          <v-list-item-subtitle class="align-self-start">
            Have a nice day!
          </v-list-item-subtitle>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :prepend-icon="item.icon"
            :value="item.title"
        >
            <router-link :to="item.path">{{ item.title }}</router-link>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-navigation-drawer
        v-model="rightDrawer"
        position="right"
    >
      <template v-slot:prepend>
        <div  class="d-flex align-center justify-space-between">
          <v-list-item
              two-line
              prepend-avatar="https://randomuser.me/api/portraits/men/75.jpg"
              :title="user.name"
              subtitle="Logged in"
          ></v-list-item>
          <v-list-item>
            <v-btn
                @click="userLogout"
                v-if="isLoggedIn"
                class="px-2"
            >
              <span class="logout">Выйти</span>
            </v-btn>
          </v-list-item>
        </div>


      </template>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <router-link to="/">
          <v-list-item prepend-icon="mdi-home-city" title="Главная">
          </v-list-item>
        </router-link>

        <router-link to="/admin/notes">
          <v-list-item prepend-icon="mdi-account" title="Записи"></v-list-item>
        </router-link>

        <router-link to="/admin/users">
          <v-list-item prepend-icon="mdi-account-group-outline" title="Пользователи"></v-list-item>
        </router-link>

      </v-list>
    </v-navigation-drawer>

    <v-main style="height: 100%">
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import AppSnackbar from "@/components/AppSnackbar";

export default {
  name: 'App',
  components: {AppSnackbar},
  data: () => ({
    items: [
      { title: 'Главная', icon: 'mdi-view-dashboard', path: '/' },
      { title: 'Избранное', icon: 'mdi-image', path: '/favorites' },
      { title: 'Инфо', icon: 'mdi-help-box', path: '/about' },
    ],
    leftDrawer: false,
    rightDrawer: false,
    snackbar: false,
    snackbarText: ''
  }),
  computed: {
    ...mapState([
        'user',
        'isLoggedIn'
    ]),
  },
  async beforeMount() {
    await this.GET_ALL_NOTES()
      .then(res => this.setNotesToStore(res.data))

    if(!localStorage.getItem('user')) {
      this.$store.commit('toggleLogin',false)
    } else {
      const jwt = localStorage.getItem('jwt')
      this.$store.dispatch('GET_CURRENT_USER', jwt) //проблема какая-то
      this.$store.commit('toggleLogin',true)
    }
  },
  mounted() {
    this.$root.AppSnackbar = this.$refs.snack
  },
  methods: {
    ...mapMutations([
        'toggleLogin',
        'setNotesToStore',
    ]),
    ...mapActions([
        'GET_ALL_NOTES'
    ]),
    userLogout() {
      localStorage.removeItem('jwt')
      localStorage.removeItem('user')
      this.toggleLogin(false)
      this.rightDrawer = false
      this.$router.push('/')
    },
  }
}
</script>

<style>
html {
  background: rgb(18,18,18)
}
a {
  color: burlywood;
  text-decoration: none
}
.logout {
  font-size: .6rem;
}
</style>
