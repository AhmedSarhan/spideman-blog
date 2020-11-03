<template>
  <div class="admin-new-posts-page">
    <section class="new-post-form">
      <div class="container">
        <AdminPostForm @submit="onSubmited" />
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  middleware: ["check-auth", "auth"],
  methods: {
    onSubmited(postData) {
      this.$store.dispatch("addPost", postData).then(() => {
        this.$router.push("/admin/");
      });
    },
  },
};
</script>

<style>
</style>