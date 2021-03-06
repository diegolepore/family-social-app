import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import posts from './modules/posts'
import users from './modules/users'
import comments from './modules/comments'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    posts,
    users,
    comments,
  }
})