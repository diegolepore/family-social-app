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
    }
  },
  actions: {
    GET_POSTS({commit, rootGetters}) {
      const posts = []
      const { email, following } = rootGetters['auth/GET_AUTH_ITEM']('user')

      db.collection('posts').get()
        .then((res) => {
          res.forEach((doc) => {
            if( following.includes(doc.data().user.uid) ) {
              console.log(doc.data())
              const data = doc.data()
              data.id = doc.id
              posts.push(data)
            }
          })

          commit('SET_POSTS', posts)
        })
        .catch((err) => {
          console.error(err)
        })
    },

    GET_POST({commit}, postId) {
      db.collection('posts').doc(postId).get()
        .then((item) => {
          console.log(item.id, item.data())
          let post = item.data()
          post.id = item.id
          commit('SET_POST', post)
        }).catch((err) => {
          console.error(err)
        })
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
        console.log('Post successfully added!', res)
        router.push({name: 'Inicio'})
      })
      .catch((err) => {
        console.error(err)
      })
    },

    DELETE_POST({commit}, postId) {
      db.collection('posts').doc(postId).delete()
        .then((res) => {
          console.log('Post successfully deleted!', res)
          commit('REMOVE_POST', postId)
        })
        .catch((err) => {
          console.error(err)
        })
    },

    EDIT_POST({commit}, post) {
      db.collection('posts').doc(post.id).update(post)
      .then((res) => {
        console.log('Post successfully edited!', res)
        router.push({name: 'Inicio'})
      })
      .catch((err) => {
        console.error(err)
      })
    }


  },
  getters: {

  }
}