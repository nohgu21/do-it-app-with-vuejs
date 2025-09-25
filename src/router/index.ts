// router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import TodoListPage from '../components/todolistpage.vue' // Your main page with all components
import TodoDetail from '../components/tododetail.vue' // Your todo detail component

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: TodoListPage
  },
  {
    path: '/todos/:id',
    name: 'TodoDetail',
    component: TodoDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router