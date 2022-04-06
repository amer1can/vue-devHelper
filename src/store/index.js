import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'

const host = 'http://localhost:3001'

export default createStore({
  state: {
    notes: [],
    user: {},
    isLoggedIn: null,
  },
  getters: {
    userFavoritesList(state) {
      if(state.user.favorites) {
        const fIndexes = state.user.favorites.toString().split(',')
        return state.notes.filter(el => fIndexes.includes(el.id.toString()))
      }
    },
    userFavoritesIndexes(state) {
      if(state.user.favorites) {
        return state.user.favorites.toString().split(',')
      }
    },
    userLikesIndexes(state) {
      if(state.user.likes) {
        return state.user.likes.toString().split(',')
      }
    }
  },
  mutations: {
    setNotesToStore(state, payload) {
      state.notes = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
    addCreatedNoteToStore(state, payload) {
      state.notes.push(payload)
    },
    deleteNoteFromStore(state, id) {
      const index = state.notes.findIndex(n => n.id == id)
      if(index !== -1) {
        state.notes.splice(index, 1)
      } else {
        console.log('Запись не найдена')
      }
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
    },
    // showSnackbar(state, payload) {
    //   state.snackbar = true
    //   state.snackbarText = payload
    // },
  },
  actions: {
    GET_CURRENT_USER({commit}, jwt){
      axios.get(host + '/me', {
        headers: {'x-access-token': jwt }
      })
          .then(response => {
            // if (response.data.status == 200) {
              commit('setUser', response.data.user)
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
    GET_ALL_NOTES() {
      return axios.get(host + '/notes/')
    },
    GET_ALL_USERS() {
      return axios.get(host + '/all')
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

      axios.patch(host + '/updateLikes/' + state.user.id, {data})
          .then(() => { commit('updateLikes', data) })
          .catch(err => console.error('REMOVE_LIKE err',err))
      axios.patch(host + '/notes/decLikes/' + likeId)
          .then(() => commit('decLikes', likeId))
    },
    CREATE_NOTE({dispatch, commit}, data) {
      //создаем новую запись, сразу добавить в стейт не получится,
      //потому что api-бд добавляет автоматический ID
      axios.post(host + '/notes/', {
        title: data.title,
        section: data.section,
        text: data.text,
        tags: data.tags
      })
          .then(response => {
            if(response.status == 200) {
              //получаем обновленный список записей и обновляем стейт,
              // чтобы при переходе были видны все записи
              dispatch('GET_ALL_NOTES').then(res => commit('setNotesToStore', res.data))
              router.push('/admin/notes') //переходим на список записей после создания новой
            } else {
              console.log('Note add error from store!',response.data.status)
            }
          })
    },
    UPDATE_NOTE({dispatch, commit}, data) {
      axios.patch(host + '/notes/' + data.id, {
        title: data.data.title,
        section: data.data.section,
        text: data.data.text,
        tags: data.data.tags
      })
          .then(response => {
            if(response.status == 200) {
              dispatch('GET_ALL_NOTES').then(res => commit('setNotesToStore', res.data))
              router.push('/admin/notes') //переходим на список записей после создания новой
            } else {
              console.err('error note update, ', response.status)
            }
          })
    },
    DELETE_NOTE({commit}, id) {
      axios.delete(host + '/notes/' + id)
          .then(response => {
            if(response.status == 200) {
              commit('deleteNoteFromStore', id)
            }
            else {
              console.log('Ошибка при удалении записи', response.status)
            }
          })
    },
    GET_NOTE(_,id) {
     return axios.get(host + '/notes/' + id)
          .then(res => res.data)
    }
  },
  modules: {
  }
})
