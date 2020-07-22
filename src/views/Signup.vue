<template>
  <div>    
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Sign up</h1>
    </div>
    <form @submit.prevent="signUp()" class="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <input class="px-3 py-2 border rounded" type="email" placeholder="Email" v-model="email" />
      </div>
      <div class="mb-4">
        <input class="px-3 py-2 border rounded" type="password" placeholder="Password" v-model="pass" />
      </div>
      <div class="mb-4">
        <input class="px-3 py-2 border rounded" type="password" placeholder="Repeat password" v-model="passConfirm" />
      </div>
      <button :disabled="!isValid" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign up</button>
    </form>
    <p>{{ GET_AUTH_ITEM('error') }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      pass: "",
      passConfirm: ""
    };
  },
  methods: {
    ...mapActions("auth", ["CREATE_USER"]),
    signUp() {
      const newUserPayload = {
        email: this.email,
        pass: this.pass
      };

      this.CREATE_USER(newUserPayload);
    }
  },
  computed: {
    ...mapGetters("auth", ["GET_AUTH_ITEM"]),
    isValid() {
      return (
        this.pass === this.passConfirm &&
        this.pass.trim() != "" &&
        this.pass.length >= 6
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>