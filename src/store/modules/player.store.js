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
      async getDevices() {
         await PlayerApi.getUserDevices().then(res => {
            this.user_devices = []
            res.data.devices.forEach(device => {
               this.user_devices.push(device)
            })
            if (!this.active_device) {
               const older_device = this.user_devices[this.user_devices.length - 1]
               this.active_device = older_device.id
               this.setDevice(older_device.id)
            }
         })
      }
   },
   getters: {}
}
