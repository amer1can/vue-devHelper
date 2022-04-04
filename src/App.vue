<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon
          @click="leftDrawer = !leftDrawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title>
        <router-link to="/" class="mx-2">devHelper</router-link>
      </v-app-bar-title>

      <router-link v-if="!isLoggedIn" to="/register" class="mx-2">Register</router-link>
      <router-link v-if="!isLoggedIn" to="/login" class="mx-2">Login</router-link>

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
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Welcome!
          </v-list-item-title>
          <v-list-item-subtitle>
            Have a nice day!
          </v-list-item-subtitle>
        </v-list-item-content>
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
            <v-btn icon
                   @click="userLogout"
                   v-if="isLoggedIn"
            >
              <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
          </v-list-item>
        </div>


      </template>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
        <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
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

export default {
  name: 'App',
  data: () => ({
    items: [
      { title: 'Home page', icon: 'mdi-view-dashboard', path: '/' },
      { title: 'Favorites', icon: 'mdi-image', path: '/favorites' },
      { title: 'About', icon: 'mdi-help-box', path: '/about' },
    ],
    leftDrawer: false,
    rightDrawer: false,
  }),
  computed: {
    ...mapState([
        'user',
        'isLoggedIn'
    ]),
  },
  async mounted() {
    this.GET_ALL_NOTES()
    if(!localStorage.getItem('user')) {
      this.$store.commit('toggleLogin',false)
    } else {
      const jwt = localStorage.getItem('jwt')
      // console.log("USER!, ", user)
      // this.$store.commit('getUserFromStorage')
      await this.$store.dispatch('GET_CURRENT_USER', jwt)
      this.$store.commit('toggleLogin',true)
    }
  },
  methods: {
    ...mapMutations([
        'toggleLogin'
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
    }
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
</style>
