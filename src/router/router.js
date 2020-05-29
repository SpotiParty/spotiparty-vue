import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store.js'
import StartScreen from '@/pages/StartScreen.vue'
import PartySetup from '@/pages/PartySetup.vue'
import SelectPlaylist from '@/pages/SelectPlaylist.vue'
import HostPartyHome from '@/pages/HostPartyHome.vue'

import PlaylistList from '@/components/views/PlaylistList.vue'
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
      meta: { requireAuth: true },
      children: [
         {
            path: 'myplaylists',
            name: 'MyPlaylists',
            component: PlaylistList,
            meta: { requireAuth: true },
            props: route => ({
               playlist_list: null,
               ...route.params
            })
         },
         {
            path: 'browse-categories',
            name: 'BrowseCategories',
            component: CategoryList,
            meta: { requireAuth: true }
         }
         // {
         //    path: ':category_id/playlists',
         //    name: 'CategoryPlaylists'
         // }
      ]
   },
   {
      path: '/host-party-home',
      name: 'HostPartyHome',
      component: HostPartyHome,
      meta: { requireAuth: true }
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

router.beforeEach((to, from, next) => {
   const logged_in = store.getters['party/logged_in']
   if (to.matched.some(record => record.meta.requireAuth) && !logged_in) {
      next('/')
   }
   next()
})

export default router
