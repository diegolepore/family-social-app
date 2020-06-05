import router from '../router'
import { db, auth } from '../plugins/firebase'

export default {
  namespaced: true,
  state: {
    user: null,
    error: null
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },

    SET_ERROR(state, payload) {
      state.error = payload
    },

    RESET_USER_DATA(state) {
      state.user = {}
      state.error = ''
    }
  },
  actions: {

    CREATE_USER({commit}, payload) {
      auth.createUserWithEmailAndPassword(payload.email, payload.pass)
        .then((res) => {
          console.log(res)
          const newUser = {
            email: res.user.email,
            uid: res.user.uid
          }

          commit('SET_USER', newUser)
          router.push({name: 'Inicio'})

          // db.collection(res.user.email).add({
          //   name: "Todo de ejemplo"
          // }).then(() => {
          //   commit('SET_USER', newUser)
          //   router.push({name: 'Inicio'})
          // }).catch((err) => {
          //   console.log(err)
          // })
        })
        .catch((err) => {
          console.error(err)
          commit('SET_ERROR', err)
        })
    },

    LOG_IN({commit}, payload) {
      auth.signInWithEmailAndPassword(payload.email, payload.pass)
        .then((res) => {
          console.log(res)
          const newUser = {
            email: res.user.email,
            uid: res.user.uid
          }
          commit('SET_USER', newUser)
          router.push({name: 'Inicio'}) // Change this
        })
        .catch((err) => {
          console.error(err)
          commit('SET_ERROR', err)
        })
    },

    LOG_OUT({commit}) {
      auth.signOut()
        .then(() => {
          commit('RESET_USER_DATA')
          router.push({name: 'Login'})
        })
    }

  },
  getters: {

    IS_USER_ACTIVE(state) {
      if(state.user == null) {
        return false
      } else {
        return true
      }
    },

    GET_AUTH_ITEM(state) {
      return (key) =>  state[key]
    }

  }
}