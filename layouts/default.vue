<template>
  <div>
    <TheHeader />
    <Nuxt />
  </div>
</template>
<script>
import TheHeader from "~/components/TheHeader";
export default {
  component: {
    TheHeader,
  },
};
</script>
<style>
html {
  font-family: "Open Sans", sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
