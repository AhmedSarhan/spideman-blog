<template>
  <div class="admin-post-page">
    <section class="update-form">
      <div class="container">
        <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  middleware: ["check-auth", "auth"],
  asyncData(context) {
    return axios
      .get(
        "https://nuxt-blog-4711b.firebaseio.com/posts/" +
          context.params.postId +
          ".json"
      )
      .then((res) => {
        return {
          loadedPost: { ...res.data, id: context.params.postId },
        };
      })
      .catch((e) => context.error(e));
  },
  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch("editPost", editedPost).then(() => {
        this.$router.push("/admin/");
      });
    },
  },
  data() {
    return {
      myPost: {},
    };
  },
  created() {
    this.myPost = { ...this.loadedPost };
  },
  head() {
    return {
      title: this.myPost.title,
    };
  },
};
</script>

<style>
</style>