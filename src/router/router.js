import Vue from 'vue'
import VueRouter from 'vue-router'
import StartScreen from '@/pages/StartScreen.vue'
import PartySetup from '@/pages/PartySetup.vue'
import SelectPlaylist from '@/pages/SelectPlaylist.vue'
import HostPartyHome from '@/pages/HostPartyHome.vue'

import MyPlaylists from '@/components/views/MyPlaylists.vue'
import CategoryList from '@/components/views/CategoryList.vue'

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
      path: '/select-playlist',
      name: 'SelectPlaylist',
      component: SelectPlaylist,
      children: [
         {
            path: 'myplaylists',
            name: 'MyPlaylists',
            component: MyPlaylists
         },
         {
            path: 'browse-categories',
            name: 'BrowseCategories',
            component: CategoryList
         }
      ]
   },
   {
      path: '/host-party-home',
      name: 'HostPartyHome',
      component: HostPartyHome
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router
