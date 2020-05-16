<template>
   <div id="app">
      <router-view />
   </div>
</template>

<style lang="sass">
@import url('https://rsms.me/inter/inter.css');

#app
  font-family: 'Inter', sans-serif
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50

.fullscreen
  width: 100vw
  min-width: 100vw
  height: 100vh
  min-height: 100vh
</style>
