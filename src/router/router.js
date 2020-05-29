import Vue from 'vue'
import VueRouter from 'vue-router'
import StartScreen from '@/pages/StartScreen.vue'
import PartySetup from '@/pages/PartySetup.vue'
import JoinParty from '@/pages/JoinParty.vue'
import GuestPartyHome from '@/pages/GuestPartyHome.vue'

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      name: 'StartScreen',
      component: StartScreen
   },
   {
      path: '/party-setup',
      name: 'PartySetup',
      component: PartySetup
   },
   {
      path: '/join-party',
      name: 'JoinPartyHome',
      component: JoinParty
   },
   {
      path: '/guest-party-home',
      name: 'GuestPartyHome',
      component: GuestPartyHome
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router
