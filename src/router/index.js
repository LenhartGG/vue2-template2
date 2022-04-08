import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      roles: ['admin', 'user']
    },
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      roles: ['admin', 'user']
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/progress',
    name: 'progress',
    meta: {
      roles: ['admin', 'user']
    },
    component: () => import('../views/ProgressTest.vue')
  },
  {
    path: '/treelist',
    name: 'treelist',
    meta: {
      roles: ['admin', 'user']
    },
    component: () => import('../views/TreeList.vue')
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      roles: ['admin']
    },
    component: () => import('../views/test.vue')
  },
  {
    path: '/403',
    name: '403',
    meta: {
      roles: ['admin', 'user']
    },
    component: () => import('../views/Forbidden403.vue')
  },
  {
    path: '*',
    name: '404',
    meta: {
      roles: ['admin', 'user']
    },
    component: () => import('../views/NotFound404.vue')
  },
]

const router = new VueRouter({
  routes
})

//假设有两种角色：admin 和 user
//从后台获取的用户角色
const role = 'user'
//当进入一个页面是会触发导航守卫 router.beforeEach 事件
router.beforeEach((to, from, next) => {
  if (to.meta.roles.includes(role)) {
    next() //放行
  } else {
    next({ path: "/403" }) //跳到404页面
  }
})

export default router
