<template>
  <div class="admin-page">
    <section class="new-post">
      <div class="btns">
        <button
          class="btn btn-primary"
          @click="$router.push('/admin/new-post')"
        >
          Create Post
        </button>
        <button class="btn btn-danger" @click="onLogout">Log out</button>
      </div>
    </section>
    <hr />
    <section class="existing-posts">
      <h1 class="text-center">Existing Posts</h1>
      <PostsList isAdmin :posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
export default {
  middleware: ["check-auth", "auth"],
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/admin/auth");
    },
  },
};
</script>

<style scoped>
.new-post .btns {
  display: table !important;
  margin: 20px auto;
}
.new-post .btns .btn {
  margin: 20px;
}
</style>