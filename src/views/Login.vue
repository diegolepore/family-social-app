<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Sign in</h1>
    </div>
    <form @submit.prevent="login()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <input class="border rounded py-2 px-3" type="email" v-model="email" placeholder="Email" />
        <p class="text-red-500 text-xs italic">Campo obligatorio</p>
      </div>
      <div class="mb-6">
        <input class="border rounded py-2 px-3" type="password" v-model="pass" placeholder="Password" />
        <p class="text-red-500 text-xs italic">Campo obligatorio</p>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Sign In
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Forgot Password?
        </a>
      </div>
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