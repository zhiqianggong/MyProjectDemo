<template>
  <div id="app">
    <router-view></router-view><!-- 使用路由 -->
    <Calendar></Calendar>
  </div>
</template>

<script>
import Calendar from "../calendar/calendar.vue"
import Function from "../myselfFunction/function.vue"
export default {
  name: 'app',
  components: {
    Calendar,
    Function
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
