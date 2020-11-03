<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label for="Authname">Author Name</label>
      <input
        class="form-control"
        type="text"
        id="Authname"
        name="Authname"
        v-model="editedPost.author"
      />
    </div>
    <div class="form-group">
      <label for="title">Title</label>
      <input
        class="form-control"
        type="text"
        id="title"
        name="title"
        v-model="editedPost.title"
      />
    </div>
    <div class="form-group">
      <label for="thumbnail">Thumbnail</label>
      <input
        class="form-control"
        type="text"
        id="thumbnail"
        name="thumbnail"
        v-model="editedPost.thumbnail"
      />
    </div>
    <div class="form-group">
      <label for="content">Content</label>
      <textarea
        class="form-control"
        name="content"
        id="content"
        rows="7"
        v-model="editedPost.content"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="content">Post Preview</label>
      <textarea
        class="form-control"
        name="content"
        id="content"
        rows="3"
        v-model="editedPost.preview"
      ></textarea>
    </div>
    <div class="form-group">
      <input class="btn btn-primary" type="submit" value="save" />
      <button class="btn btn-danger" @click.prevent="onCancel">Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            author: "",
            title: "",
            thumbnail: "",
            content: "",
            preview: "",
          },
    };
  },
  methods: {
    submit() {
      this.$emit("submit", this.editedPost);
    },
    onCancel() {
      this.$router.push("/admin");
    },
  },
};
</script>

<style>
</style>