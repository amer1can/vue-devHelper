import { createStore } from 'vuex'
import axios from 'axios'

const host = 'http://localhost:3001'

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
    },
    setUser(state, payload) {
      state.user = payload
    },
    incViews(state, id) {
      let changeNote = state.notes.find(n => n.id === id)
      changeNote.views++
    },
    updateFavorites(state, payload) {
      state.user.favorites = payload
      console.log('favorites: ',state.user.favorites)
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
      axios.get(host + '/notes/')
          .then(response => commit('setNotesToStore', response.data))
    },
    INC_VIEWS({commit}, id) {
      axios.patch(host + '/notes/updateViews/' + id)
          .then(() => {
            commit('incViews', id)
          })
          .catch(err => console.log('INC_VIEWS err:', err))
    },
    ADD_TO_FAVORITES({commit, state}, noteId) {
      if (state.user) {
        let data
        if(state.user.favorites) {
          let userFavorites = state.user.favorites.toString().split(',')
          userFavorites.push(noteId)
          data = userFavorites.join(',')
        } else {
          data = noteId
        }

        axios.patch(host + '/updateFavorites/' + state.user.id, {data})
            .then(() => {
              commit('updateFavorites', data)
              console.log('add')
            })
            .catch(err => console.log('ADD_TO_FAVORITES err:', err))
      }
    },
    REMOVE_FROM_FAVORITES({commit, state}, noteId) {
      let userFavorites = state.user.favorites.toString().split(',')
      const index = userFavorites.findIndex(n => n == noteId)
      if(index === -1) return
      else {
        userFavorites.splice(index, 1)
      }
      const data = userFavorites.join(',')

      axios.patch(host + '/updateFavorites/' + state.user.id, {data})
          .then(() => {
            commit('updateFavorites', data)
            console.log('remove')
          })
          .catch(err => console.log('REMOVE_FROM_FAVORITES err:', err))
    }
  },
  modules: {
  }
})
