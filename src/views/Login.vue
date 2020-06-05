<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login()">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="pass" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      pass: ""
    };
  },
  methods: {
    ...mapActions("auth", ["LOG_IN"]),
    login() {
      const userPayload = {
        email: this.email,
        pass: this.pass
      };
      this.LOG_IN(userPayload);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>