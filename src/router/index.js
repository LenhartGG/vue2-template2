import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/maptest',
    name: 'MapTest',
    component: () => import(/* webpackChunkName: "about" */ '../views/MapTest.vue')
  },
  {
    path: '/progress',
    name: 'progress',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProgressTest.vue')
  },
  {
    path: '/treelist',
    name: 'treelist',
    component: () => import(/* webpackChunkName: "about" */ '../views/TreeList.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
