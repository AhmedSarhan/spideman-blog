<template>
  <div v-if="loading" class="loading-page">
    <div class="loading"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>
<style scoped>
.loading-page {
  position: fixed;
  height: 10px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  text-align: center;
  font-size: 3rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.loading {
  display: inline-block;
  position: absolute;
  height: 10px;
  width: 100%;
  background: -webkit-linear-gradient(
    to right,
    #c33764,
    #1d2671
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #c33764,
    #1d2671
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border: 4px solid linear-gradient(to right, #c33764, #1d2671);
  animation-name: loader-animation;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
@keyframes move {
  0% {
    width: 0%;
    -webkit-transform: translateX(0%);
    left: 0%;
  }
  49% {
    width: 50%;
    -webkit-transform: translateX(30%);
    left: 50%;
  }
  75% {
    width: 75%;
    -webkit-transform: translateX(0%);
    left: 75%;
  }
  100% {
    width: 100%;
    -webkit-transform: translateX(0%);
    left: 100%;
  }
}
</style>
