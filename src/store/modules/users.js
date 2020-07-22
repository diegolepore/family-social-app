import router from '../../router'
import { db } from '../../plugins/firebase'

export default {
  namespaced: true,
  state: {
    users: []
  },
  mutations: {
    SET_USER(state, payload) {
      state.users = payload
    }
  },
  actions: {
    GET_USERS({commit}, payload) {
      db.collection('users').orderBy("name").limit(3).get().then((res) => {
        let users = []
        res.forEach((doc) => {
          users.push(doc.data())
        })
        commit('SET_USER', users)
      }).catch((err) => {
        console.error(err)
      })
    }
  },
  getters: {}
}