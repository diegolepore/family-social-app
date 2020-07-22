import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import { auth } from './plugins/firebase'
import "@/assets/styles/main.css";

auth.onAuthStateChanged((user)=> {
  if (user) {
    store.dispatch('auth/GET_USER', { user })
  } else {
    store.commit('auth/SET_USER', null)
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
