<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
         currentTime: new Date().getTime()
    };
  },
  methods: {
    pageTimeout() {
      let currentTime = this.currentTime;
      let lastTime = new Date().getTime();
      let timeOut = 15 * 60 * 1000;
      if (lastTime - currentTime > timeOut) {
        localStorage.clear();
        this.currentTime = new Date().getTime();
        this.$router.push("/index");
      } else {
        this.currentTime = new Date().getTime();
      }
    }
  }
};
</script>

<style>
</style>