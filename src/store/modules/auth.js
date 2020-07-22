import router from '../../router'
import { db, auth } from '../../plugins/firebase'

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

    GET_USER({commit}, res) {
      const { uid } = res.user
      db.collection('users').doc(uid).get()
        .then((res) => {
          const user = { ...res.data() }
          commit('SET_USER', user)
          router.push({name: 'Inicio'}) 
        })
        .catch((err) => {
          console.error(err)
          commit('SET_ERROR', err)
        })
    },

    CREATE_USER({commit, dispatch}, payload) {
      auth.createUserWithEmailAndPassword(payload.email, payload.pass)
        .then((res) => {
          db.collection('users').doc(res.user.uid).set({ ...payload, uid: res.user.uid }).then(() => {
            dispatch('GET_USER', res)
          }).catch((err) => {
            commit('SET_ERROR', err)
          })
        })
        .catch((err) => {
          console.error(err)
          commit('SET_ERROR', err)
        })
    },

    LOG_IN({commit, dispatch}, payload) {
      auth.signInWithEmailAndPassword(payload.email, payload.pass)
        .then((res) => {
          dispatch('GET_USER', res)
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