import router from '../../router'
import { db } from '../../plugins/firebase'

export default {
  namespaced: true,
  state: {
    notFollowingUsers: [],
    usersFollowing: [],
    allUsers: []
  },
  mutations: {
    SET_NOT_FOLLOWING_USERS(state, payload) {
      state.notFollowingUsers = payload
    },

    SET_USERS_FOLLOWING(state, payload) {
      state.usersFollowing = payload
    },

    SET_ALL_USERS(state, payload) {
      state.allUsers = payload
    }
  },
  actions: {
    GET_USERS({commit, rootState}, payload) {
      const currentUserUid = rootState.auth.user.uid

      db.collection('users').orderBy("name").limit(50).get().then((res) => {
        let allUsers = []
        let usersFollowing = []
        let notFollowingUsers = []
        res.forEach((doc) => {
          if(currentUserUid != doc.data().uid ) {
            if (payload == 'not-following-users') {
              if(!doc.data().followers.includes(currentUserUid)) {
                notFollowingUsers.push(doc.data())
              }
            } else if (payload == 'users-following') {
              if(doc.data().followers.includes(currentUserUid)) {
                usersFollowing.push(doc.data())
              }
            } else if (payload == 'all-users'){
              allUsers.push(doc.data())
            }
          }
        })

        if (payload == 'not-following-users') {
          commit('SET_NOT_FOLLOWING_USERS', notFollowingUsers)
        } else if (payload == 'users-following') {
          commit('SET_USERS_FOLLOWING', usersFollowing)
        } else if (payload == 'all-users') {
          commit('SET_ALL_USERS', allUsers)
        }
      }).catch((err) => {
        console.error(err)
      })
    },

    FOLLOW_USER({dispatch, rootState}, payload) {
      const { uid, following, email } = rootState.auth.user

      
        db.collection('users').doc(uid).update({
          following: [ ...following, payload.uid ],
          followingsLength: payload.followingsLength + 1
        }).then(() => {
          db.collection('users').doc(payload.uid).update({
            followers: [ ...payload.followers, uid ],
            followersLength: payload.followersLength + 1
          }).then(() => {
            dispatch('GET_USERS', 'users-following')
            dispatch('GET_USERS', 'not-following-users')
          })
          .catch((err) => {
            console.error(err)
          })
        })
        .catch((err) => {
          console.error(err)
        })


        // await dispatch('auth/GET_USER', { ...rootState.auth, isAuthProcess: false }, { root: true })

        // await dispatch('GET_USERS', 'users')
        // await dispatch('GET_USERS', 'users-following')
        
    
    }
  },
  getters: {}
}