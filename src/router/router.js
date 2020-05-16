import Vue from 'vue'
import VueRouter from 'vue-router'
import StartScreen from '@/pages/StartScreen.vue'

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      name: 'start-screen',
      component: StartScreen
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router
