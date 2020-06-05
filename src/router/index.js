import Vue from 'vue'
import VueRouter from 'vue-router'

import { auth } from '../plugins/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: () => import(/* webpackChunkName: "inicio" */ '../views/Inicio.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-post:id',
    name: 'EditPost',
    component: () => import(/* webpackChunkName: "edit-post" */ '../views/EditPost.vue'),
  },
  {
    path: '/add-post',
    name: 'AddPost',
    component: () => import(/* webpackChunkName: "add-post" */ '../views/AddPost.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    const user = auth.currentUser
    console.log(user)
    if(!user) {
      next({name: 'Login'})
    } else{
      next()
    }
  } else {
    next()
  }
})

export default router
