import PlayerApi from '@/api/modules/player.api.js'

export default {
   namespaced: true,
   state: {
      user_devices: [],
      active_devices: null,
      timer: null
   },
   mutations: {
      SET_USER_DEVICES(state, user_devices) {
         state.user_devices = user_devices
      },
      SET_ACTIVE_DEVICES(state, active_devices) {
         state.active_devices = active_devices
      },
      SET_TIMER(state, timer) {
         state.timer = timer
      }
   },
   actions: {
      async getDevices({ state, commit, dispatch }) {
         await PlayerApi.getUserDevices().then(async response => {
            const user_devices = []
            response.data.devices.forEach(device => {
               user_devices.push(device)
            })
            commit('SET_USER_DEVICES', user_devices)
            if (state.active_device != null) {
               //seleziona un dispositivo disponibile, se l'ultimo usando nella riproduzione non lo è più
               const older_device = state.user_devices[state.user_devices.length - 1]
               commit('SET_ACTIVE_DEVICES', older_device.id)
               await dispatch('setActiveDevice', older_device.id)
            }
         })
      },
      async getState({ dispatch }) {
         await PlayerApi.getState().then(async response => {
            if (response.data.state) {
               await dispatch('party/partyPlay', null, { root: true })
            } else {
               await dispatch('party/partyPause', null, { root: true })
            }
         })
      },
      async pause({ dispatch }) {
         await dispatch('party/partyPause', null, { root: true })
         await PlayerApi.pause()
      },
      async play({ state, rootState, dispatch, commit }) {
         if (rootState.party.currently_playing == null) {
            const track = await dispatch('party/nextTrack', null, { root: true })
            await PlayerApi.play(rootState.party.party_playlist.uri, track.uri, state.active_device)
            const timer = setTimeout(async () => {
               await dispatch('automaticNext')
            }, track.duration_ms)
            commit('SET_TIMER', timer)
            console.log(`Playing next track after ${track.duration_ms} ms`)
            await PlayerApi.deactivateShuffle()
            await dispatch('party/partyPlay', null, { root: true })
         } else {
            await PlayerApi.resume()
            await dispatch('party/partyPlay', null, { root: true })
         }
      },
      async automaticNext({ rootState, state, dispatch, commit }) {
         const track = await dispatch('party/nextTrack', null, { root: true })
         console.log(`next track: ${track.name}`)
         await PlayerApi.play(rootState.party.party_playlist.uri, track.uri, state.active_device)
         const timer = setTimeout(async () => {
            await dispatch('automaticNext')
         }, track.duration_ms)
         commit('SET_TIMER', timer)
         console.log(`Playing next track after ${track.duration_ms} ms`)
      },
      async next({ rootState, state, dispatch, commit }) {
         clearTimeout(state.timer)
         const track = await dispatch('party/nextTrack', null, { root: true })
         console.log(`next track: ${track.name}`)
         await PlayerApi.play(rootState.party.party_playlist.uri, track.uri, state.active_device)
         const timer = setTimeout(async () => {
            await dispatch('automaticNext')
         }, track.duration_ms)
         commit('SET_TIMER', timer)
         console.log(`Playing next track after ${track.duration_ms} ms`)
      },
      async setActiveDevice({ commit }, device_id) {
         commit('SET_ACTIVE_DEVICES', device_id)
         await PlayerApi.switchDevice(device_id)
      }
   },
   getters: {}
}
