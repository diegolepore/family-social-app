import router from '../../router'
import { db } from '../../plugins/firebase'

export default {
  namespaced: true,
  state: {
    comments: []
  },

  mutations: {
    SET_COMMENTS(state, payload) {
      state.comments = payload
    }
  },

  actions: {
    async ADD_COMMENT({dispatch, rootState}, payload) {
      const { uid, name, lastname, photo } = rootState.auth.user
      const { comments } = rootState.posts.post
      const { postId } = payload
      const commentData = {
        ...payload,
        author: {
          uid, 
          name, 
          lastname, 
          photo
        }
      }

      try {
        const res = await db.collection('comments').add(commentData)
        const { id } = res

        await db.collection('posts').doc(postId).update({
          comments: [...comments, id]
        })

        dispatch('GET_COMMENTS', postId)

      } catch (error) {
        console.error(error)
      }
    },

    async GET_COMMENTS({commit}, postId) {
      const commentsArr = []
      try {
        const res = await db.collection('comments').where('postId', '==', postId).orderBy('timestamp','desc').get()
        res.docs.forEach(doc => {
          console.log(doc.data())
          commentsArr.push(doc.data())
        });
        commit('SET_COMMENTS', commentsArr)

      } catch (error) {
        console.log(error)
      }
    }
  },

  getters: {
    value: state => {
      return state.value;
    }
  },
};