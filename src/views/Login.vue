<template>
  <div class="w-full max-w-screen-sm">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Sign in</h1>
    </div>
    <form @submit.prevent="login()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <input class="border rounded py-2 px-3 w-full" type="email" v-model="email" placeholder="Email" />
        <!-- <p class="text-red-500 text-xs italic">Campo obligatorio</p> -->
      </div>
      <div class="mb-6">
        <input class="border rounded py-2 px-3 w-full" type="password" v-model="pass" placeholder="Password" />
        <!-- <p class="text-red-500 text-xs italic">Campo obligatorio</p> -->
      </div>
      <div class="flex items-center justify-between w-full">
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Sign In
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-auto" href="#">
          Forgot Password?
        </a>
      </div>
    </form>
    <p class="text-red-500 text-xs italic">{{ GET_AUTH_ITEM('error') }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
  },
  computed: {
    ...mapGetters("auth", ["GET_AUTH_ITEM"]),
  }
};
</script>

<style lang="scss" scoped>
</style>