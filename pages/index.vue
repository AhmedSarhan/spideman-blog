<template>
  <div class="home-page">
    <section class="intro">
      <div class="container">
        <h3 class="text-center">Who Doesn't love SpiderMan</h3>
      </div>
    </section>
    <section class="featured-posts">
      <PostsList :posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    },
  },
};
</script>

<style scoped>
.intro {
  margin-top: 40px;
  margin-bottom: 50px;
  background-image: url("~assets/images/marvel.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding-top: 200px;
  height: 400px;
  width: 100%;
}
.intro h3 {
  background: #f4f4f4;
  -webkit-box-shadow: -1px 10px 5px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 10px 5px -6px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 10px 5px -6px rgba(0, 0, 0, 0.75);
  font-size: 35px;
  font-weight: 700;
  width: 100%;
  padding: 10px 20px;
}
</style>
