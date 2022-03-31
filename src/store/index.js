import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    notes: [],
    user: {},
    isLoggedIn: null
  },
  getters: {
  },
  mutations: {
    setNotesToStore(state, payload) {
      state.notes = payload
      console.log(state.notes)
    },
    setUser(state, payload) {
      state.user = payload
    },
    toggleLogin(state, payload) {
      if (payload === false) { state.user = {} }
      state.isLoggedIn = payload
    },
    getUserFromStorage(state) {
      state.user = JSON.parse(localStorage.getItem('user'))
    }
  },
  actions: {
    GET_ALL_NOTES({commit}) {
      axios.get('http://localhost:3001/notes/')
          .then(response => commit('setNotesToStore', response.data))
    }
  },
  modules: {
  }
})
