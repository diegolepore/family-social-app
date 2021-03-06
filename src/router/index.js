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
    path: '/edit-post/:id',
    name: 'EditPost',
    component: () => import(/* webpackChunkName: "edit-post" */ '../views/EditPost.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/add-post',
    name: 'AddPost',
    component: () => import(/* webpackChunkName: "add-post" */ '../views/AddPost.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user-profile',
    name: 'UserProfile',
    component: () => import(/* webpackChunkName: "user-profile" */ '../views/UserProfile.vue'),
    meta: { requiresAuth: true }
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
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: () => import(/* webpackChunkName: "postDetail" */ '../views/PostDetail.vue'),
    meta: { requiresAuth: true }
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
