import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Register from '@/views/Register'
import Login from '@/views/Login'
import NotFound from '@/views/404.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/index',
  }, {
    path: '/index',
    name: 'index',
    component: Index
  }, {
    path: '/register',
    name: 'register',
    component: Register
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '*',
    name: '404',
    component: NotFound
  }]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('token') ? true : false
  if (to.path === '/login' || to.path === '/register' || isLogin) {
    next()
  } else {
    next('/login')
  }
})

export default router