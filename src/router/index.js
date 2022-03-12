import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import HelloWorld from '../components/HelloWorld'
import Login from '../views/Login'
Vue.use(VueRouter)

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [
  {
    path: '*',
    redirect: 'Login'
  },
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log('Required!')
    await store.dispatch('checkAuth')
    if (!store.state.isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
