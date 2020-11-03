<template>
  <div class="posts-list">
    <div class="container">
      <div class="row">
        <PostsPreview
          v-for="post in posts"
          :key="post.id"
          :is-admin="isAdmin"
          :id="post.id"
          :thumbnail="post.thumbnail"
          :title="post.title"
          :content="post.content"
          :preview="post.preview"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PostsPreview from "@/components/posts/PostsPreview";
export default {
  components: {
    PostsPreview,
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>