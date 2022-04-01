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
      const changeNote = state.notes.find(n => n.id === id)
      changeNote.views++
    },
    incLikes(state, id) {
      const changeNote = state.notes.find(n => n.id === id)
      changeNote.likes++
    },
    decLikes(state, id) {
      const changeNote = state.notes.find(n => n.id === id)
      changeNote.likes--
    },
    updateFavorites(state, payload) {
      state.user.favorites = payload
    },
    updateLikes(state, payload) {
      state.user.likes = payload
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
    GET_CURRENT_USER({commit}, jwt){
      console.log(commit)
      axios.get(host + '/me', {
        headers: {'x-access-token': jwt }
      })
          .then(response => {
            console.log(response)
            // if (response.data.status == 200) {
              console.log('SETTING USER INFO!')
              // localStorage.setItem('user', JSON.stringify(response.data.user))
              // localStorage.setItem('jwt', response.data.token)
              // this.$store.commit('toggleLogin',true)
              // this.$store.commit('setUser', response.data.user)
            // }
            // else {
            //   console.log('NONE!!!')
            // }
          })
          .catch(err => console.log(err))
    },
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
            .then(() => { commit('updateFavorites', data) })
            .catch(err => console.error('ADD_TO_FAVORITES err:', err))
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
          .then(() => { commit('updateFavorites', data) })
          .catch(err => console.error('REMOVE_FROM_FAVORITES err:', err))
    },
    ADD_LIKE({commit, state}, likeId) {
      let data
      if(state.user.likes) {
          let userLikes = state.user.likes.toString().split(',')
        userLikes.push(likeId)
        data = userLikes.join(',')
      } else {
        data = likeId
      }

      axios.patch(host + '/updateLikes/' + state.user.id, {data})
          .then(() => commit('updateLikes', data))
          .catch(err => console.error('ADD_LIKE err:', err))
      axios.patch(host + '/notes/incLikes/' + likeId)
          .then(() => commit('incLikes', likeId))

    },
    REMOVE_LIKE({commit, state}, likeId) {
      let userLikes = state.user.likes.toString().split(',')
      const index = userLikes.findIndex(id => id == likeId)
      if(index === -1) return
      else {
        userLikes.splice(index, 1)
      }
      const data = userLikes.join(',')

      axios.patch(host + '/updateLikes/' + likeId, {data})
          .then(() => { commit('updateLikes', data) })
          .catch(err => console.error('REMOVE_LIKE err',err))
      axios.patch(host + '/notes/decLikes/' + likeId)
          .then(() => commit('decLikes', likeId))
    }
  },
  modules: {
  }
})
