import router from '../../router'
import { db } from '../../plugins/firebase'

export default {
  namespaced: true,
  state: {
    posts: [],
    post: {}
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts
    },

    SET_POST(state, post) {
      state.post = post
    },

    REMOVE_POST(state, postId) {
      state.posts = state.posts.filter((post) => post.id !== postId)
    },

    SET_LIKE(state, { id, uid }) {
      state.post = state.posts.find((post) => post.id === id)
      state.posts[state.posts.indexOf(state.post)].likes.push(uid)
    },

    REMOVE_LIKE(state, { id, uid }) {
      state.post = state.posts.find((post) => post.id === id)
      const likes = state.posts[state.posts.indexOf(state.post)].likes
      const index = likes.indexOf(uid)

      likes.splice(index, 1)
    },
  },
  actions: {
    async GET_POSTS({commit, rootGetters}) {
      const posts = []
      const { following, uid } = rootGetters['auth/GET_AUTH_ITEM']('user')

      try {
        const res = await db.collection('posts').get()     
        res.forEach((doc) => {
          if( following.includes(doc.data().user.uid) || doc.data().user.uid === uid ) {
            const data = doc.data()
            data.id = doc.id
            posts.push(data)
          }
        })

        commit('SET_POSTS', posts)   
      } catch (error) {
        console.error(error)
      }
    },

    async GET_POST({commit}, postId) {
      try {
        const res = await db.collection('posts').doc(postId).get()
        let post = res.data()
        post.id = res.id
        commit('SET_POST', post)
      } catch (error) {
        console.error(error)
      }
    },

    ADD_POST({commit, rootGetters}, post) {
      const { uid, photo, name, lastname } = rootGetters['auth/GET_AUTH_ITEM']('user')
      const formattedPost = {
        ...post,
        user: {
          name,
          lastname,
          photo,
          uid
        }
      }

      db.collection('posts').add(formattedPost)
      .then((res) => {
        router.push({name: 'Inicio'})
      })
      .catch((err) => {
        console.error(err)
      })
    },

    DELETE_POST({commit}, postId) {
      db.collection('posts').doc(postId).delete()
        .then((res) => {
          commit('REMOVE_POST', postId)
        })
        .catch((err) => {
          console.error(err)
        })
    },

    EDIT_POST({commit}, post) {
      db.collection('posts').doc(post.id).update(post)
      .then((res) => {
        router.push({name: 'Inicio'})
      })
      .catch((err) => {
        console.error(err)
      })
    },

    LIKE_POST({commit, state, rootState}, postId) {

      const { uid, likedPosts } = rootState.auth.user
      const selectedPost = state.posts.find((post) => post.id === postId)
      const { id, likes } = selectedPost

      if(!likedPosts.includes(id)) {
        db.collection('users').doc(uid).update({
          likedPosts: [...likedPosts, id]
        }).then(() => {
          db.collection('posts').doc(postId).update({
            likes: [...likes, uid],
          }).then((res) => {
            commit('auth/SET_LIKED_POST', id, { root: true })
            commit('SET_LIKE', { id, uid })
          })
          .catch((err) => {
            console.error(err)
          })
        })
        .catch((err) => {
          console.error(err)
        })
      } else {

        let likedPostsFiltered = likedPosts.filter((post) => post !== id)
        let likesFiltered = likes.filter((like) => like !== uid)

        db.collection('users').doc(uid).update({
          likedPosts: [...likedPostsFiltered]
        }).then(() => {
          db.collection('posts').doc(postId).update({
            likes: [...likesFiltered],
          }).then(() => {
            commit('auth/REMOVE_LIKED_POST', id, { root: true })
            commit('REMOVE_LIKE', { id, uid })
          })      
          .catch((err) => {
            console.error(err)
          })
        })
        .catch((err) => {
          console.error(err)
        })
      }
    }
  },
  getters: {

  }
}