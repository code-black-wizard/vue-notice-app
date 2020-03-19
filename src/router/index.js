import Vue from 'vue'
import VueRouter from 'vue-router'
import Notices from '../views/Notices.vue'
import Notice from '../views/Notice.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Notices',
    component: Notices
  },
  {
    path: '/notice/:id',
    name: 'Notice',
    component: Notice,
    props: true
    // route level code-splitting
    // this generates a separate chunk (notice.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "notice" */ '../views/Notice.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
