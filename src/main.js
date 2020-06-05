import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import { auth } from './plugins/firebase'

auth.onAuthStateChanged((user)=> {
  if (user) {
    console.log(user)
    store.commit('auth/SET_USER', {email: user.email, uid: user.uid})
  } else {
    console.log(user)
    store.commit('auth/SET_USER', null)
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
