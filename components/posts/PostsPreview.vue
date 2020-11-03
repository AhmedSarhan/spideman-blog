<template>
  <div class="col-md-4">
    <article class="post-preview">
      <div
        class="post-thumbnail"
        :style="{
          backgroundImage: 'url(' + thumbnail + ' )',
          marginBottom: '20px',
        }"
      ></div>
      <div class="post-content">
        <nuxt-link :to="postLink">
          <h1 class="text-center">{{ title }}</h1>
        </nuxt-link>
        <p class="text-center">{{ preview }}</p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  computed: {
    postLink() {
      return this.isAdmin ? "/admin/" + this.id : "/posts/" + this.id;
    },
  },
};
</script>

<style scoped>
.post-preview {
  border: 1px solid #f4f4f4;
  background: #f4f4f4;
  border-radius: 5px;
  -webkit-box-shadow: -1px 10px 5px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 10px 5px -6px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 10px 5px -6px rgba(0, 0, 0, 0.75);
  margin-bottom: 40px;
}
.post-preview:hover {
  background: #cccccc;
}
.post-preview .post-thumbnail {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 300px;
}
</style>