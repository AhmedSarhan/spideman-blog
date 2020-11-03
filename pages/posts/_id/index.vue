<template>
  <div class="single-post-page">
    <div class="container">
      <div class="post">
        <div
          class="post-thumbnail"
          :style="{
            backgroundImage: 'url(' + loadedPost.thumbnail + ' )',
            marginBottom: '20px',
          }"
        ></div>
        <h1>{{ loadedPost.title }}</h1>
        <h3>by {{ loadedPost.author }}</h3>
        <div class="post-details">
          <div>last upated on {{ loadedPost.updatedDate }}</div>
          <div>{{ loadedPost.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  asyncData(context) {
    if (context.payload) {
      return {
        loadedPost: context.payload.postData,
      };
    }
    return axios
      .get(
        "https://nuxt-blog-4711b.firebaseio.com/posts/" +
          context.params.id +
          ".json"
      )
      .then((res) => {
        return {
          loadedPost: res.data,
        };
      })
      .catch((e) => context.error(e));
  },
  data() {
    return {
      myPost: {},
    };
  },
  created() {
    this.myPost = { ...this.loadedPost };
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 2000);
    });
  },
  head() {
    return {
      title: this.myPost.title,
    };
  },
};
</script>

<style scoped>
.post-thumbnail {
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 300px;
}
</style>