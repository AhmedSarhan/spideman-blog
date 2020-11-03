<template>
  <div class="admin-auth-page">
    <div class="container">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            class="form-control"
            type="email"
            id="email"
            name="email"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            class="form-control"
            type="password"
            id="password"
            name="password"
            v-model="password"
          />
        </div>
        <button class="btn btn-primary" type="submit">
          {{ isLogin ? "Login" : "Sign up" }}
        </button>
        <button
          class="btn btn-warning"
          type="button"
          @click="isLogin = !isLogin"
        >
          Switch to {{ isLogin ? "Sign up" : "Login" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("authenticateUser", {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/admin");
        });
    },
  },
};
</script>

<style scoped>
.admin-auth-page {
  align-items: center;
  align-content: center;
  width: 300px;
  margin: auto;
  margin-top: 100px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
}
</style>