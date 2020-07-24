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
    GET_USERS({commit, rootState}, payload) {
      const currentUserUid = rootState.auth.user.uid
      db.collection('users').orderBy("name").limit(10).get().then((res) => {
        let users = []
        res.forEach((doc) => {
          if(currentUserUid != doc.data().uid ) {
            users.push(doc.data())
          }
        })
        commit('SET_USER', users)
      }).catch((err) => {
        console.error(err)
      })
    },

    async FOLLOW_USER({dispatch, rootState}, payload) {
      const { uid, followingNum, email } = rootState.auth.user

      try {
        await db.collection('users').doc(uid).update({
          followingNum: followingNum + 1
        })
        await db.collection('users').doc(payload.uid).update({
          followersNum: payload.followersNum + 1
        })

        await dispatch('auth/GET_USER', rootState.auth, { root: true })
        await db.collection('following').doc(uid).set({ email: payload.email, uid: payload.uid })
        await db.collection('followers').doc(payload.uid).set({ email, uid })
        
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {}
}